import express from 'express';

// we use debug with a custom context as described in Part 1
// import debug from 'debug';

import userDBDao from '../dao/userDB.dao';

import { catchError } from '../../common/utils/catch.util';
import userDBService from '../services/userDB.service';

// const log: debug.IDebugger = debug('app:users-controller');
class UsersController {

    createNewUser = async (req: express.Request, res: express.Response) => {
        try{
            await userDBService.insertUserData(req.body);
            res.status(201).json({"success": true, code: 201, data: {message:"User added successfully"}});
        }
        catch(error: unknown) {
            res.status(500).json({"success": false, code: 500, data: {message: "Something went wrong"}});
        }
    }

    getUsers = async (_req: express.Request, res: express.Response) => {
        try{
            const data = await userDBService.getUsers();
            res.status(200).json({"success": false, code: 200, data: {message:"", data: data}});
        }
        catch(err: unknown) {
            res.status(500).json({"success": false, code: 500, data: {message: catchError(err)}});
        }      
    }

    checkUserExistance = async (req: express.Request, res: express.Response) => {
        try {
            const emailId = req.body.EMAILID;
            const doesUserExist = await userDBService.checkWhetherUserExists(emailId);
            if (doesUserExist) {
                return res.status(200).json({"success": true, code: 200, data: {message: "User already exists", data: true}});
            }
            else {
                console.log("data is null");
                return res.status(200).json({"success": false, code: 404, data: {message: "No such user found", data: false}});
            }
        }
        catch(error: unknown) {
            res.status(500).json({"success": false, code: 500, data: {message: catchError(error)}});
        }  
    }

    getUser = async (req: express.Request, res: express.Response) => {
        try{
            const emailId = req.body.EMAILID;
            const data = await userDBDao.getUserByUsername(emailId);
            if (data) {
                res.status(200).json({"success": true, code: 200, data: {message: "User found successfully", data: data}});
            }
            else {
                res.status(400).json({"success": false, code: 404, data: {message: "No such user found"}});
            }
        }
        catch(err: unknown) {
            res.status(500).json({"success": false, code: 500, data: {message: catchError(err)}});
        } 
    }

    checkExistingPill = async (req: express.Request, res: express.Response) => {
		try{
			const data = await userDBDao.checkPill(req.body);
			const status = data? 200: 401;
			const message = data? "User authenticated" : "Authentication failed";
			res.status(status).json({"success": false, code: status, data: {message: message, data: data}});
		}
		catch(e: unknown) {
			res.status(500).json({"success": false, code: 500, data: {message: await catchError(e)}});
		}
	}
}

export default new UsersController();