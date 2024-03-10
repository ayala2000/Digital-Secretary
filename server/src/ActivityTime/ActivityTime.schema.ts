import * as mongoose from 'mongoose';

export const ActivityTimeSchema = new mongoose.Schema({
    day: Number,
    openingHours: <String[]>[],
    closingHours: <String[]>[],
});