import { CommonRoutesConfig } from "../../common/common.routes.config";
import AuthController from '../controllers/auth.controller';
import authValidationMiddleware from "../middleware/auth.validation.middleware";
import express from 'express';


export class AuthRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UserRoutes');
    }
    configureRoutes() {

        this.app.route('/createNewAuth')
            .post(
                // validate({ body: AuthSchema.createNewAuth }),
                authValidationMiddleware.checkAuthSchema,
                AuthController.createAuth
            );

        this.app.route('/authenticateUser')
            .post(
                authValidationMiddleware.checkAuthSchema,
                AuthController.checkExistingPill
            )
        return this.app;
    }
}