// we import express to add types to the request/response objects from our controller functions
import express from 'express';

// we use debug with a custom context as described in Part 1
// import debug from 'debug';

// import userDBService from '../services/userDB.service';
import userDBDao from '../dao/userDB.dao';

import { catchError } from '../../common/utils/catch.util';
import userDBService from '../services/userDB.service';

// const log: debug.IDebugger = debug('app:users-controller');
class UsersController {

    createNewUser = async (req: express.Request, res: express.Response) => {
        try{
            // console.log(req.body, "request")
            const data = await userDBService.insertUserData(req.body);
            if (data) {
                res.status(201).json({"success": true, code: 201, data: {message:"User added successfully"}});
            }
            else {
                res.status(500).json({"success": false, code: 500, data: {message: "Something went wrong"}});
            }
            console.log("data", data);
        }
        catch(err: unknown) {
            res.status(500).json({"success": false, code: 500, data: {message: catchError(err)}});
        }
    }

    getUsers = async (_req: express.Request, res: express.Response) => {
        try{
            const data = await userDBService.getUsers();
            console.log("data", data);
            res.status(200).json({"success": false, code: 200, data: {message:"", data: data}});
        }
        catch(err: unknown) {
            res.status(500).json({"success": false, code: 500, data: {message: catchError(err)}});
        }      
    }

    checkUserExistance = async (req: express.Request, res: express.Response) => {
        try {
            const emailId = req.body.EMAILID;
            console.log(emailId, "emailId")
            const data = await userDBDao.getUserByUsername(emailId);
            console.log("UserDBController:checkUserExistance:: ", data)
            if (data !== null) {
                console.log("data is not null");
                return res.status(200).json({"success": true, code: 200, data: {message: "User already exists", data: true}});
            }
            else {
                console.log("data is null");
                return res.status(200).json({"success": false, code: 404, data: {message: "No such user found", data: false}});
            }
        }
        catch(err: unknown) {
            res.status(500).json({"success": false, code: 500, data: {message: catchError(err), data: false}});
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
}

export default new UsersController();