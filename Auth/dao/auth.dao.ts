/* eslint-disable no-async-promise-executor */
import { CreateAuthDto } from "../dto/create.auth.dto";
import debug from "debug";
import mySqlService from "../../common/services/sql.services";
import {AuthModel} from "../models/auth.models";
import { catchError } from "../../common/helpers/catch.helper";

const log: debug.IDebugger = debug("app:in-memory-dao");

class AuthDao {
	// authTable: Array<CreateAuthDto> = [];  

	constructor() {        
		this.getSequelizeDao();
        
        
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public sequelize: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public User: any;

	async getSequelizeDao(): Promise<void> {
		this.sequelize = await mySqlService.getSequelize();
		// log(this.sequelize, "DaoSequelize");
		this.sequelize.addModels([AuthModel]); 
		// log(this.User);
		this.sequelize.sync().then(() => {
			log("Auth table created successfully!");
		}).catch(async (error: unknown) => {
			console.error("Unable to create table : ", await catchError(error));
		});
	}

	async insertAuth(authModel: CreateAuthDto) {
		try {
			let data: boolean = false;
			AuthModel.create(authModel).then((res: unknown) => {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				return new Promise((resolve, _reject) => {
					log(res);
					data = true;
					resolve(data);
				});
			})
				.catch((error: unknown) => {
					return new Promise(async (_resolve, reject) => {
						log(await catchError(error));
						data = true;
						reject(data);
					});
				});
		}
		catch(error: unknown) {
			return new Promise(async (_resolve, reject) => {
				console.log(await catchError(error));
				return reject(false);
			});
		}
        
	}

	async checkPill(authModel: CreateAuthDto): Promise<unknown> {
		try {
			await AuthModel.findOne({ where: { USERNAMEHASH: authModel.USERNAMEHASH, AUTHPILL: authModel.AUTHPILL} })
				.then((data) => {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					return new Promise((resolve, _reject) => {
						if (data) {
							return resolve(true);
						}
						else {
							return resolve(false);
						}
					});
				})
				.catch((error: unknown) => {
					return new Promise(async (_resolve, reject) => {
						console.log(await catchError(error));
						return reject(false);
					});
				});
		}
		catch(error: unknown) {
			return new Promise(async (_resolve, reject) => {
				console.log(await catchError(error));
				return reject(false);
			});
		}
        
	}  

}

export default new AuthDao();