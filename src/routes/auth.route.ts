import { NextFunction, Request, Response, Router } from 'express';
import AuthController from "../controller/auth.controller"
import authValidator from '../middleware/validator/auth.validator';
import validate from '../middleware/validator/validator';
import isRightToken from "../middleware/isRightToken"

const AuthRouter = Router();
AuthRouter.post('/registration', validate(authValidator.register), AuthController.registration);
AuthRouter.post('/login', validate(authValidator.login), AuthController.login);
AuthRouter.get('/getProfileInfo', isRightToken(), AuthController.getProfileInfo);
AuthRouter.patch('/changeUserInfo', isRightToken(), validate(authValidator.changeInfo), AuthController.changeUserInfo);

export default AuthRouter;
