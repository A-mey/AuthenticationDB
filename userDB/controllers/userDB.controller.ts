// we import express to add types to the request/response objects from our controller functions
import express from 'express';

// we use debug with a custom context as described in Part 1
import debug from 'debug';

// import userDBService from '../services/userDB.service';
import userDBDao from '../dao/userDB.dao';

const log: debug.IDebugger = debug('app:users-controller');
class UsersController {

    async createNewUser(req: express.Request, res: express.Response) {
        try{
            console.log(req.body, "request")
            // let data = await userDBService.insertUserData(req.body);
            // res.status(200).send(data);
            userDBDao.createUser(req.body).then((data) => {
                // return new Promise((resolve)=> {
                    res.status(201).json({"success": true, code: 201, data: {message:"User added successfully"}});
                // })
            }).catch((err: any) => {
                res.status(500).json({"success": false, code: 500, data: {message:err.message}});
            })
        }
        catch(err: any) {
            res.status(500).json({"success": false, code: 500, data: {message:err.message}});
        }
    }

    async getUsers(req: express.Request, res: express.Response) {
        try{
            userDBDao.getUsers().then((data) => {
                // return new Promise((resolve)=> {
                    log("got", data)
    
                    res.status(200).json({"success": false, code: 200, data: {message:"", data: data}});
                // })
            }).catch((err: any) => {
                res.status(500).json({"success": false, code: 500, data: {message:err.message}});
            })
        }
        catch(err: any) {
            res.status(500).json({"success": false, code: 500, data: {message:err.message}});
        }      
    }

    async checkUserExistance(req: express.Request, res: express.Response) {
        try {
            let emailId = req.body.EMAILID;
            console.log(emailId, "emailId")
            userDBDao.findUserByUsername(emailId).then((data) => {
                let status = data == false? 404: 200
                let message = data == false? "No such user exists": "User already exists"
                res.status(status).json({"success": true, code: status, data: {message: message}});
            }).catch((err: any) => {
                res.status(500).json({"success": false, code: 500, data: {message:err.message}});
            })
        }
        catch(err: any) {
            res.status(500).json({"success": false, code: 500, data: {message:err.message}});
        }  
    }

    async getUser(req: express.Request, res: express.Response) {
        try{
            let emailId = req.body.EMAILID;
            userDBDao.getUserByUsername(emailId).then((data) => {
                if (data) {
                    res.status(200).json({"success": true, code: 200, data: {message: "", data: data}});
                }
                else {
                    res.status(400).json({"success": false, code: 400, data: {message: "Something went wrong"}});
                }
            }).catch((err: any) => {
                res.status(500).json({"success": false, code: 500, data: {message:err.message}});
            })
        }
        catch(err: any) {
            res.status(500).json({"success": false, code: 500, data: {message:err.message}});
        } 
    }
    


}

export default new UsersController();