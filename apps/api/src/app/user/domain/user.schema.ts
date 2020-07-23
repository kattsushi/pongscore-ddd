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
