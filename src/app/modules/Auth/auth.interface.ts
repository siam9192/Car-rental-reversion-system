export type TSignIn = {
    email:string;
    password:string
}

export type TJwtPayload = {
    email:string;
    role:"admin" | "user"
}