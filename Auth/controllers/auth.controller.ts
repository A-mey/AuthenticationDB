// we import express to add types to the request/response objects from our controller functions
import express from 'express';

// we use debug with a custom context as described in Part 1
import debug from 'debug';

import authService from '../services/auth.services';
import authDao from '../dao/auth.dao';
// import authDao from '../dao/userDB.dao';

const log: debug.IDebugger = debug('app:users-controller');
class AuthController {

    async createAuth(req: express.Request, res: express.Response) {
        try{
            authDao.insertAuth(req.body).then((data) => {
                console.log(data, "AuthController:createAuth")
                res.status(201).json({"success": true, code: 201, data: {message: "successful"}});
            }).catch((err) => {
                res.status(500).json({"success": false, code: 500, data: {message: err.message}});
            })
        }
        catch(e: any) {
            res.status(500).json({"success": false, code: 500, data: {message: e.message}});
        }
    }

    async checkExistingPill(req: express.Request, res: express.Response) {
        try{
            let data = await authDao.checkPill(req.body);
            let status = data == false? 401: 200;
            let message = data == false? "Authentication failed": "User authenticated"
            res.status(status).json({"success": false, code: 200, data: {message: message}});
        }
        catch(e: any) {
            res.status(500).json({"success": false, code: 500, data: {message: e.message}});
        }
    }

}

export default new AuthController();