import { CommonRoutesConfig } from "../../common/common.routes.config";
import UserDBController from '../controllers/user.controller';
import userDBValidationMiddleware from "../middleware/user.validation.middleware";
import express from 'express';
import IdMiddleware from "../middleware/id.middleware"


export class UserRoutes extends CommonRoutesConfig {
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

        this.app.route("/authenticateUser")
			.post(
				UserDBController.checkExistingPill
			);
        return this.app;
    }
}