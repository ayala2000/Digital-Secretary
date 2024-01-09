
import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
  name: String,
  title: String,
  content: String,
});
//export const UserSchema = SchemaFactory.createForClass(User);