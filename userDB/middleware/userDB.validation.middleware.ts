import { NextFunction, Response, Request } from "express";
import { errorMessageObject } from "../../common/types/errorMsgObject.types";
import UserDBValidationSchema from "../schema/userDB.validation.schema";

class LoginValidationMiddleware {
    async checkInsertUserSchema(req: Request, res: Response, next: NextFunction) {
        const errorRes: errorMessageObject = UserDBValidationSchema.validateRequest(req.body, "insertUser")
        if (errorRes.isValid) {
            console.log('Data is valid');
            next();
          } else {
            res.status(400).send(errorRes.errorMsg);
        }
    }

    // async checkgetUsersSchema(req: Request, res: Response, next: NextFunction) {
    //     const errorRes: errorMessageObject = UserDBValidationSchema.validateRequest(req.body, "getUsers")
    //     if (errorRes.isValid) {
    //         console.log('Data is valid');
    //         next();
    //       } else {
    //         res.status(400).send(errorRes.errorMsg);
    //     }
    // }

    async checkUserSchema(req: Request, res: Response, next: NextFunction) {
        const errorRes: errorMessageObject = UserDBValidationSchema.validateRequest(req.body, "checkUser")
        if (errorRes.isValid) {
            console.log('Data is valid');
            next();
          } else {
            res.status(400).send(errorRes.errorMsg);
        }
    }
}

export default new LoginValidationMiddleware()