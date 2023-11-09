
import { Schema } from 'mongoose';
//import { TurnType} from '../typesOfTurn/turnType.interface';
import * as mongoose from 'mongoose';

export const TurnTypeSchema = new mongoose.Schema({
  typeOfTurn:String,
  duration:Number,
  ManagerTurn:String,//{ type: Schema.Types.ObjectId, ref: 'ActivityTime' }
});