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

    getUsers = async (): Promise<UserModel[] | string> => {
        let users: UserModel[] = [];
        try {
            users = await UserModel.findAll();
            console.log("users", users);
        }
        catch(error: unknown) {
            console.log(catchError(error));
        }
        return users;
        
    }

    createUser = async (createUser: CreateUserDto): Promise<UserModel | undefined> => {
        let createdUser: UserModel | undefined;
        try {
            createdUser = await this.sequelize?.transaction(async (t) => {
                const newUser = await UserModel.create(createUser.USER, { transaction: t });
                await AuthModel.create(createUser.AUTH, { transaction: t });
                return newUser;
              });
            console.log(createdUser, "response");
        }
        catch(error: unknown) {
            console.log(catchError(error));
        }
        return createdUser;
    }

    getUserByUsername = async (emailId: string): Promise<UserModel | null> => {
        let user: UserModel | null = null;
        try {
            user = await UserModel.findOne({ where: { EMAILID: emailId} });
        }
        catch(error: unknown) {
            console.log(catchError(error));
        }
        return user;
    }
}

export default new UsersDao();