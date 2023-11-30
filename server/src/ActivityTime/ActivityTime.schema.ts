import * as mongoose from 'mongoose';

export const ActivityTimeSchema = new mongoose.Schema({
    //   ManagerTurn: String,
    day: Number,
    openingHours: <String[]>[],
    closingHours: <String[]>[],
});