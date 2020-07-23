import * as mongoose from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';
import { saltRounds } from '../auth/constants';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * User Schema
 */
@Schema()
export class User extends Document {
  @Prop()
  first_name!: string;
  @Prop()
  last_name!: string;
  @Prop()
  email!: string;
  @Prop()
  phone!: string;
  @Prop()
  password!: string;
  @Prop()
  address!: string;
  @Prop()
  description!: string;
  @Prop()
  created_at!: Date;
  @Prop()
  roles!: string[]; //Array<String>(),
  @Prop({ email: { valid: { type: Boolean, default: false }}})
  auth!: {
    email: {
      valid: boolean
    },
    facebook: {
      userid: string,
    },
    gmail: {
      userid: string,
    },
  };
  @Prop()
  settings!: any;
  @Prop()
  photos!: {
    profilePic: any, //{ type:  mongoose.Schema.Types.ObjectId , ref: 'PhotoSchema'}
    gallery: any[], //[{type:  mongoose.Schema.Types.ObjectId , ref: 'PhotoSchema'}]
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

// export const UserSchema = new mongoose.Schema({
// });

// NOTE: Arrow functions are not used here as we do not want to use lexical scope for 'this'
// UserSchema.pre('save', function (next) {
//   const user: any = this;

//   // Make sure not to rehash the password if it is already hashed
//   if (!user.isModified('password')) return next();

//   // Generate a salt and use it to hash the user's password
//   genSalt(saltRounds, (err, salt) => {
//     if (err) return next(err);

//     hash(user.password, salt, (errHash: any, hashed: string) => {
//       if (err) return next(err);
//       user.password = hashed;
//       next();
//     });
//   });
// });

// UserSchema.methods.checkPassword = function (attempt: any, callback: Function) {
//   const user = this;
//   return compare(attempt, user.password);
// };
