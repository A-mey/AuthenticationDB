import { CommonRoutesConfig } from "../../common/common.routes.config";
import UserDBController from '../controllers/userDB.controller';
import userDBValidationMiddleware from "../middleware/userDB.validation.middleware";
import express from 'express';
import IdMiddleware from "../middleware/id.middleware"


export class LoginRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UserRoutes');
    }
    configureRoutes() {

        this.app.use(userDBValidationMiddleware.checkSchema);

        this.app.use(IdMiddleware.createRequestId);

        this.app.route('/insertUser')
            .post(
                UserDBController.createNewUser
            );

        this.app.route('/getUsers')
            .get(
                UserDBController.getUsers
            );
        
        this.app.route('/checkUser')
            .post(
                UserDBController.checkUserExistance
            );

        this.app.route('/getUserByUsername')
            .post(
                UserDBController.getUser
            );
        return this.app;
    }
}