import * as mongoose from 'mongoose';

export const ActivityTimeSchema = new mongoose.Schema({
 //   ManagerTurn: String,
    daysOfWeek: <Number[]>[],
    startHoure: <String[]>[],
    endHoure: <String[]>[],
});