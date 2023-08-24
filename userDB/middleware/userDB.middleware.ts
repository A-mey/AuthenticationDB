import { NextFunction, ErrorRequestHandler, Request, Response } from 'express';
import userService from '../services/userDB.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');
class LoginMiddleware {
    checkExistingUser(req: Request, res: Response, next: NextFunction) {

    }
}

export default new LoginMiddleware();