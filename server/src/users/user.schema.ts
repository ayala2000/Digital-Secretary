
import * as mongoose from 'mongoose';
import { Role } from 'src/roles/role.enum';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});
//export const UserSchema = SchemaFactory.createForClass(User);