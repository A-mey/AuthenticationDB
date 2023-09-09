// we import express to add types to the request/response objects from our controller functions
import express from "express";

// we use debug with a custom context as described in Part 1
// import debug from "debug";

// import authService from "../services/auth.services";
import authDao from "../dao/auth.dao";
import { catchError } from "../../common/helpers/catch.helper";
// import authDao from '../dao/userDB.dao';

// const log: debug.IDebugger = debug("app:users-controller");
class AuthController {

	async createAuth(req: express.Request, res: express.Response) {
		try{
			// authDao.insertAuth(req.body).then((data) => {
			// 	console.log(data, "AuthController:createAuth");
			// 	res.status(201).json({"success": true, code: 201, data: {message: "successful"}});
			// }).catch((err) => {
			// 	res.status(500).json({"success": false, code: 500, data: {message: err.message}});
			// });
			const data = await authDao.insertAuth(req.body);
			console.log(data);
			if (data){
				res.status(201).json({"success": true, code: 201, data: {message: "successful"}});
			}
			else {
				res.status(201).json({"success": false, code: 400, data: {message: "Something went wrong"}});
			}
		}
		catch(e: unknown) {
			res.status(500).json({"success": false, code: 500, data: {message: await catchError(e)}});
		}
	}

	async checkExistingPill(req: express.Request, res: express.Response) {
		try{
			const data = await authDao.checkPill(req.body);
			const status = data? 401: 200;
			const message = data? "Authentication failed": "User authenticated";
			res.status(status).json({"success": false, code: status, data: {message: message}});
		}
		catch(e: unknown) {
			res.status(500).json({"success": false, code: 500, data: {message: await catchError(e)}});
		}
	}

}

export default new AuthController();