import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ConsentRegistry extends Document {
  @Prop()
  name!: string;

  @Prop({ type: String })
  email!: string;

  @Prop({ type: [Array] })
  registrationForm!: any[];

  @Prop({ type: String })
  checkboxText!: string;

  @Prop({ type: Date })
  date!: Date;

  @Prop({ type: String })
  privacyPolicy!: string;

  @Prop({ type: String })
  cookiePolicy!: string;

  @Prop({ type: String })
  acceptedPolicy!: string;
}
export const ConsentRegistrySchema = SchemaFactory.createForClass(ConsentRegistry);
