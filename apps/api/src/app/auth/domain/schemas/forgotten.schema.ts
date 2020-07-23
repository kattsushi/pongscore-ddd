import { Prop, Schema,SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class ForgottenPassword extends Document {
  @Prop({ type: String })
  email!: string;
  @Prop({ type: String })
  newPasswordToken!: string;
  @Prop({ type: Date })
  timestamp!: Date;
}

export const ForgottenPasswordSchema =  SchemaFactory.createForClass(ForgottenPassword);
