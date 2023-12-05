import express from 'express';

// we use debug with a custom context as described in Part 1
// import debug from 'debug';

// import { catchError } from '../../common/utils/catch.util';
import { UserService } from '../services/user.service';
import responseTemplateConstants from '../../common/constants/response.template.constants';

// const log: debug.IDebugger = debug('app:users-controller');
class UserController {

    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    createNewUser = async (req: express.Request, res: express.Response) => {
        try{
            await this.userService.insertUserData(req.body);
            const response = responseTemplateConstants.USER_ADDED;
            res.status(response.code).json(response);
        }
        catch(error: unknown) {
            const response = responseTemplateConstants.DEFAULT_ERROR;
            res.status(response.code).json(response);
        }
    }

    getUsers = async (_req: express.Request, res: express.Response) => {
        try{
            const usersList = await this.userService.getUsers();
            const response = responseTemplateConstants.USERS_FETCHED;
            response.data.data = usersList;
            res.status(response.code).json(response);
        }
        catch(error: unknown) {
            const response = responseTemplateConstants.DEFAULT_ERROR;
            res.status(response.code).json(response);
        }      
    }

    checkUserExistance = async (req: express.Request, res: express.Response) => {
        try {
            const emailId = req.body.EMAILID;
            const doesUserExist = await this.userService.checkWhetherUserExists(emailId);
            const response = doesUserExist? responseTemplateConstants.USER_EXISTS : responseTemplateConstants.USER_DOES_NOT_EXIST;
            res.status(response.code).json(response);
        }
        catch(error: unknown) {
            const response = responseTemplateConstants.DEFAULT_ERROR;
            res.status(response.code).json(response);
        }  
    }

    getUser = async (req: express.Request, res: express.Response) => {
        try{
            const emailId = req.body.EMAILID;
            const userData = await this.userService.getUserDetails(emailId);
            const response = userData? responseTemplateConstants.USER_EXISTS : responseTemplateConstants.USER_DOES_NOT_EXIST;
            res.status(response.code).json(response);
        }
        catch(error: unknown) {
            const response = responseTemplateConstants.DEFAULT_ERROR;
            res.status(response.code).json(response);
        } 
    }

    checkExistingPill = async (req: express.Request, res: express.Response) => {
		try{
			const authPill = await this.userService.fetchPill(req.body);
            const response = authPill? responseTemplateConstants.PILL_EXISTS : responseTemplateConstants.PILL_DOES_NOT_EXIST;
            res.status(response.code).json(response);
		}
		catch(error: unknown) {
			const response = responseTemplateConstants.DEFAULT_ERROR;
            res.status(response.code).json(response);
		}
	}
}

export default new UserController(new UserService);