import {TurnType } from "src/typesOfTurn/turnType.interface";

export interface Turn {
    email: string;
    name: string;
    date: Date;
    time:String;
    typeOfTurn: String;
}