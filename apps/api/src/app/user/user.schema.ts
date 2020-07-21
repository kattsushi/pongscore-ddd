import * as mongoose from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';
/**
 * User Schema
 */
export const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  password: String,
  address: String,
  description: String,
  created_at: { type: Date, default: Date.now },
  roles: Array<String>(),
  auth: {
    email: {
      valid: { type: Boolean, default: false },
    },
    facebook: {
      userid: String,
    },
    gmail: {
      userid: String,
    },
  },
  settings: {},
  photos: {
    profilePic: {}, //{ type:  mongoose.Schema.Types.ObjectId , ref: 'PhotoSchema'}
    gallery: [], //[{type:  mongoose.Schema.Types.ObjectId , ref: 'PhotoSchema'}]
  },
});

// NOTE: Arrow functions are not used here as we do not want to use lexical scope for 'this'
UserSchema.pre('save', function (next) {
  const user: any = this;

  // Make sure not to rehash the password if it is already hashed
  if (!user.isModified('password')) return next();

  // Generate a salt and use it to hash the user's password
  genSalt(10, (err, salt) => {
    if (err) return next(err);

    hash(user.password, salt, (errHash: any, hashed: string) => {
      if (err) return next(err);
      user.password = hashed;
      next();
    });
  });
});

UserSchema.methods.checkPassword = function (attempt: any, callback: Function) {
  const user = this;
  return compare(attempt, user.password);
};
