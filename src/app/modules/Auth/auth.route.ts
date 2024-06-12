import { Router } from "express";
import { UserControllers } from "../User/user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "../User/user.validation";

const router = Router()

router.post("/signup",validateRequest(UserValidations.createUserValidationSchema),UserControllers.createUser)


export const AuthRouter = router