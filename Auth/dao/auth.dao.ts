/* eslint-disable no-async-promise-executor */
import { CreateAuthDto } from "../dto/create.auth.dto";
import debug from "debug";
import SequelizeService from "../../common/services/sequelize/sequelize.service";
import {AuthModel} from "../models/auth.models";
import { catchError } from "../../common/helpers/catch.helper";
import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";

const log: debug.IDebugger = debug("app:in-memory-dao");

class AuthDao {
	// authTable: Array<CreateAuthDto> = [];  

	constructor() {        
		this.getSequelizeDao();
        
        
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public sequelize: Sequelize | undefined;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public User: any;

	async getSequelizeDao(): Promise<void> {
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

	async insertAuth(authModel: CreateAuthDto) : Promise<AuthModel | null> {
		let newAuth: AuthModel | null = null;
		try {
			// let data: boolean = false;
			// AuthModel.create(authModel).then((res: unknown) => {
			// 	// eslint-disable-next-line @typescript-eslint/no-unused-vars
			// 	return new Promise((resolve) => {
			// 		log(res);
			// 		data = true;
			// 		resolve(data);
			// 	});
			// })
			// 	.catch((error: unknown) => {
			// 		return new Promise(async (reject) => {
			// 			log(await catchError(error));
			// 			data = true;
			// 			reject(data);
			// 		});
			// 	});
			newAuth = await AuthModel.create(authModel);
			console.log(newAuth);
		}
		catch(error: unknown) {
			// return new Promise(async (reject) => {
			// 	console.log(await catchError(error));
			// 	return reject(false);
			// });
			console.log(catchError(error));
		}
		return newAuth;
        
	}

	async checkPill(authModel: CreateAuthDto): Promise<unknown> {
		let auth: AuthModel | null = null;
		try {
			// await AuthModel.findOne({ where: { USERNAMEHASH: authModel.USERNAMEHASH, AUTHPILL: authModel.AUTHPILL} })
			// 	.then((data) => {
			// 		// eslint-disable-next-line @typescript-eslint/no-unused-vars
			// 		return new Promise((resolve) => {
			// 			if (data) {
			// 				return resolve(true);
			// 			}
			// 			else {
			// 				return resolve(false);
			// 			}
			// 		});
			// 	})
			// 	.catch((error: unknown) => {
			// 		return new Promise(async (reject) => {
			// 			console.log(await catchError(error));
			// 			return reject(false);
			// 		});
			// 	});
			// auth = await AuthModel.findOne({ where: { USERNAMEHASH: authModel.USERNAMEHASH, AUTHPILL: authModel.AUTHPILL} });
			auth = await AuthModel.findOne({ where: { USERNAMEHASH: authModel.USERNAMEHASH, AUTHPILL: { [Op.startsWith]: authModel.AUTHPILL }} });
			console.log(auth);
		}
		catch(error: unknown) {
			// return new Promise(async (reject) => {
			// 	console.log(await catchError(error));
			// 	return reject(false);
			// });
			console.log(catchError(error));
		}
		return auth;
        
	}  

}

export default new AuthDao();