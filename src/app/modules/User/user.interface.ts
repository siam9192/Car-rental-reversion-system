import { Model } from "mongoose";

export type TUser = {
    name:string;
    email:string;
    password:string;
    role:"user" | "admin";
    phone:string,
    address:string;
}


export interface TUserStaticMethods extends Model<TUser> {
    isUserExists(userId:string): TUser | null
}