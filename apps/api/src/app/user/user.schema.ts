import * as mongoose from 'mongoose';
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
    created_at: { type: Date, default: Date.now }
});
