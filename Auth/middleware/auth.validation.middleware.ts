import { NextFunction, Response, Request } from "express";
import { errorMessageObject } from "../../common/types/errorMsgObject.types";
import AuthValidationSchema from "../schema/auth.validation.schema";

class AuthValidationMiddleware {
    async checkAuthSchema(req: Request, res: Response, next: NextFunction) {
        const errorRes: errorMessageObject = AuthValidationSchema.validateRequest(req.body, "auth")
        if (errorRes.isValid) {
            console.log('Data is valid');
            next();
          } else {
            res.status(400).send(errorRes.errorMsg);
        }
    }
}

export default new AuthValidationMiddleware()