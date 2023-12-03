import { CreateUserDto } from '../dto/create.user.dto';
// import { PatchUserDto } from '../dto/patch.user.dto';
// import { PutUserDto } from '../dto/put.user.dto';
import debug from 'debug';
import SequelizeService from '../../common/services/sequelize/sequelize.service'
import {UserModel} from '../models/users.models'
import { Sequelize } from 'sequelize-typescript';
import {AuthModel} from "../../Auth/models/auth.models"

import { catchError } from '../../common/utils/catch.util';
import { TitleModel } from '../models/title/title.models';
import { GenderModel } from '../models/gender/gender.models';

import { CheckAuthDto } from '../dto/check.auth.dto';

import { Op } from "sequelize";

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {    

    constructor() {
        // let sequelize = mySqlService.getSequelize();
        // sequelize.sync().then(() => {
        //     console.log('User table created successfully!');
        //     }).catch((error: any) => {
        //     console.error('Unable to create table : ', error);
        //     });
        
        this.getSequelizeDao();
        
        
    }

    public sequelize: Sequelize | undefined;
    // public User: any;

    getSequelizeDao = async (): Promise<void> => {
        this.sequelize = await SequelizeService.getSequelize();
        // log(this.sequelize, "DaoSequelize");
        this.sequelize?.addModels([TitleModel]);
		this.sequelize?.addModels([GenderModel]);
        this.sequelize?.addModels([UserModel]);
		this.sequelize?.addModels([AuthModel]);
		
        // log(this.User);
        this.sequelize?.sync().then(() => {
            log('User table created successfully!');
            }).catch((error: unknown) => {
                console.error('Unable to create table : ', catchError(error));
            });
    }

    getUsers = async (): Promise<UserModel[]> => {
        try {
            const users = await UserModel.findAll();
            return users;
        }
        catch(error: unknown) {
            throw new Error(await catchError(error))
        }
    }

    createUser = async (createUser: CreateUserDto): Promise<void> => {
        try {
            await this.sequelize?.transaction(async (t) => {
                await UserModel.create(createUser.USER, { transaction: t });
                await AuthModel.create(createUser.AUTH, { transaction: t });
              });
        }
        catch(error: unknown) {
            throw new Error(await catchError(error));
        }
    }

    getUserByUsername = async (emailId: string): Promise<UserModel | null> => {
        try {
            const user = await UserModel.findOne({ where: { EMAILID: emailId} });
            return user
        }
        catch(error: unknown) {
            throw new Error(await catchError(error));
        }
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

export default new UsersDao();