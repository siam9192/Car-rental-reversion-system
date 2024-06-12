import { Router } from "express";
import { UserControllers } from "../User/user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "../User/user.validation";
import { AuthValidations } from "./auth.validations";
import { AuthControllers } from "./auth.controller";

const router = Router()

router.post("/signup",validateRequest(UserValidations.createUserValidationSchema),UserControllers.createUser)
router.post("/signin",validateRequest(AuthValidations.signInValidationSchema),AuthControllers.signIn)

export const AuthRouter = router