
import AppError from "../../Errors/AppError"
import { User } from "../User/user.model"
import { TJwtPayload, TSignIn } from "./auth.interface"
import { CreateAccessToken, MatchPassword } from "./auth.utils"
import config from "../../config"


const signIn = async (payload:TSignIn)=>{
const user:any = await User.findOne({email:payload.email}).select("+password")


// Checking is the user exists in the database
if(!user){
    throw new AppError(400,"User not found")
}

const {password:userPassword} = user




// Matching the password of user
const matchUserPassword = await MatchPassword(payload.password,userPassword)

if(!matchUserPassword){
    throw new AppError(400,"Incorrect email or password")
}

const jwtPayload:TJwtPayload = {
    email:user.email,
    role:user.role
}


// Creating access token
const accessToken = CreateAccessToken(jwtPayload,config.jwt_access_secret as string,config.jwt_access_token_expire_time as string)

const userData  = await User.findOne({email:payload.email})
return {
user:userData,
accessToken
}

}




export const AuthServices = {
    signIn
}