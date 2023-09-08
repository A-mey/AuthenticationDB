import { CommonRoutesConfig } from "../../common/common.routes.config";
import UserDBController from '../controllers/userDB.controller';
import userDBValidationMiddleware from "../middleware/userDB.validation.middleware";
import express from 'express';


export class LoginRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UserRoutes');
    }
    configureRoutes() {

        this.app.route('/insertUser')
            .post(
                userDBValidationMiddleware.checkSchema,
                UserDBController.createNewUser
            );

        this.app.route('/getUsers')
            .get(
                UserDBController.getUsers
            );
        
        this.app.route('/checkUser')
            .post(
                userDBValidationMiddleware.checkSchema,
                UserDBController.checkUserExistance
            );

        this.app.route('/getUserByUsername')
            .post(
                userDBValidationMiddleware.checkSchema,
                UserDBController.getUser
            );
        return this.app;
    }
}