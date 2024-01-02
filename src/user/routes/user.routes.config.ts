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

        this.app.route('/users/user')
            .put(
                UserDBController.createNewUser
            );

        this.app.route('/users')
            .get(
                UserDBController.getUsers
            );
        
        this.app.route('users/existance')
            .post(
                UserDBController.checkUserExistance
            );

        this.app.route('/users/by-username')
            .post(
                UserDBController.getUser
            );

        this.app.route("/user/authentication")
			.post(
				UserDBController.checkExistingPill
			);
        return this.app;
    }
}