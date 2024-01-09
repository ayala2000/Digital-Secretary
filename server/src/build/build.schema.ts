import * as mongoose from 'mongoose';

export const BuildSchema = new mongoose.Schema({
    //   ManagerTurn: String,
    webName: String,
    myText: String,
    phone:String,
    adress:String
});