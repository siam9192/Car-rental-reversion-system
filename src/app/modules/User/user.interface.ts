import { Model } from "mongoose";
export type TUserRole = "user" | "admin";
export type TUser = {
    name:string;
    email:string;
    password:string;
    role:TUserRole;
    phone:string,
    address:string;
}


export interface TUserStaticMethods extends Model<TUser> {
    isUserExists(userId:string): Promise<TUser>
}