/* eslint-disable no-async-promise-executor */
import { CreateAuthDto } from "../dto/create.auth.dto";
import debug from "debug";
import SequelizeService from "../../common/services/sequelize/sequelize.service";
import {AuthModel} from "../models/auth.models";
import { catchError } from "../../common/utils/catch.util";
import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";
import { CheckAuthDto } from "../dto/check.auth.dto";

const log: debug.IDebugger = debug("app:in-memory-dao");

class AuthDao {
	// DO NOT UNCOMMENT
		// authDao.insertAuth(req.body).then((data) => {
		// 	console.log(data, "AuthController:createAuth");
		// 	res.status(201).json({"success": true, code: 201, data: {message: "successful"}});
		// }).catch((err) => {
		// 	res.status(500).json({"success": false, code: 500, data: {message: err.message}});
		// });
	// authTable: Array<CreateAuthDto> = [];  

	constructor() {        
		this.getSequelizeDao();
        
        
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public sequelize: Sequelize | undefined;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public User: any;

	getSequelizeDao = async (): Promise<void> => {
		this.sequelize = await SequelizeService.getSequelize();
		// log(this.sequelize, "DaoSequelize");
		this.sequelize?.addModels([AuthModel]); 
		// log(this.User);
		this.sequelize?.sync().then(() => {
			log("Auth table created successfully!");
		}).catch(async (error: unknown) => {
			console.error("Unable to create table : ", await catchError(error));
		});
	}

	insertAuth = async (authModel: CreateAuthDto) : Promise<AuthModel | null> => {
		let newAuth: AuthModel | null = null;
		try {
			newAuth = await AuthModel.create(authModel);
			console.log(newAuth);
		}
		catch(error: unknown) {
			console.log(catchError(error));
		}
		return newAuth;
	}

	checkPill = async (checkAuthModel: CheckAuthDto): Promise<unknown> => {
		let auth: AuthModel | null = null;
		try {
			auth = await AuthModel.findOne(
				{ 
					attributes: ['AUTHPILL'],
					where: { USERNAMEHASH: checkAuthModel.USERNAMEHASH, AUTHPILL: { [Op.startsWith]: checkAuthModel.USERAUTH }} 
				});
			console.log(auth?.AUTHPILL);
		}
		catch(error: unknown) {
			console.log(catchError(error));
		}
		return auth;
        
	}  

}

export default new AuthDao();