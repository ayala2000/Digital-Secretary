
import { TurnTypeSchema } from 'src/typesOfTurn/turnType.schema';
//import { TurnType} from '../typesOfTurn/turnType.interface';
import * as mongoose from 'mongoose';

export const TurnSchema = new mongoose.Schema({
  email: String,
  name: String,
  date: String,
  time:String,
  typeOfTurn: String
});