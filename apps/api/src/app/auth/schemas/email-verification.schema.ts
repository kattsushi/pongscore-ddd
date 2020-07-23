import { Prop, Schema,SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class EmailVerification extends Document {
  @Prop({ type: String })
  email!: string;
  @Prop({ type: String })
  emailToken!: string;
  @Prop({ type: Date })
  timestamp!: Date;
}

export const EmailVerificationSchema = SchemaFactory.createForClass(EmailVerification);

