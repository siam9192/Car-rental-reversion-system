import { Model } from "mongoose";

export type TCar = {
    name:string;
    description:string;
    color:string;
    isElectric:boolean;
    status?:"available" | "unavailable",
    features:Array<string>;
    pricePerHour:number;
    isDeleted?:boolean
}

export interface TCarStaticMethods extends Model<TCar> {
    isCarExists (carId:string):TCar | null;
} 