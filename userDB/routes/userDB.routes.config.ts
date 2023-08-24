import { CommonRoutesConfig } from "../../common/common.routes.config";
import UserDBController from '../controllers/userDB.controller';
// import LoginMiddleware from '../middleware/userDB.middleware';
// import { Validator } from "express-json-validator-middleware";
// import userDBSchema from '../middleware/userDB.schema.middleware'
// const { validate } = new Validator({});
import UserDBValidationSchema from "../schema/userDB.validation.schema";
import userDBValidationMiddleware from "../middleware/userDB.validation.middleware";
import express from 'express';


export class LoginRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UserRoutes');
    }
    configureRoutes() {

        this.app.route('/insertUser')
            .post(
                userDBValidationMiddleware.checkInsertUserSchema,
                UserDBController.createNewUser
            );

        this.app.route('/getUsers')
            .get(
                // userDBValidationMiddleware.checkgetUsersSchema,
                UserDBController.getUsers
            );
        
        this.app.route('/checkUser')
            .post(
                userDBValidationMiddleware.checkUserSchema,
                UserDBController.checkUserExistance
            );

        this.app.route('/getUserByUsername')
            .post(
                userDBValidationMiddleware.checkUserSchema,
                UserDBController.getUser
            );
        return this.app;
    }
}