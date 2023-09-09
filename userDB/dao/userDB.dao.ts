import { CreateUserDto } from '../dto/create.user.dto';
// import { PatchUserDto } from '../dto/patch.user.dto';
// import { PutUserDto } from '../dto/put.user.dto';
import debug from 'debug';
import SequelizeService from '../../common/services/sequelize/sequelize.service'
import {UserModel} from '../models/users.models'
import { Sequelize } from 'sequelize-typescript';
import {AuthModel} from "../../Auth/models/auth.models"

// import  DataTypes  from 'Sequelize';
// import { poolPromise } from '../../common/services/DAL/sql.service';
// import { sipSQL } from '../../common/services/DAL/sql.service.sip'

import { catchError } from '../../common/helpers/catch.helper';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
    // users: Array<CreateUserDto> = [];
    // private Users = UserModel.getUser().Model;
    

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

    async getSequelizeDao(): Promise<void> {
        this.sequelize = await SequelizeService.getSequelize();
        log(this.sequelize, "DaoSequelize");
        this.sequelize?.addModels([UserModel]); 
		this.sequelize?.addModels([AuthModel]); 
        // log(this.User);
        this.sequelize?.sync().then(() => {
            log('User table created successfully!');
            }).catch((error: unknown) => {
            console.error('Unable to create table : ', catchError(error));
            });
    }

    async getUsers(): Promise<UserModel[] | string> {
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

    // async createUser(user: CreateUserDto): Promise<UserModel | null> {
    //     let createdUser: UserModel | null = null;
    //     try {
    //         createdUser = await UserModel.create(user);
    //         console.log(createdUser, "response");
    //     }
    //     catch(error: unknown) {
    //         console.log(catchError(error));
    //     }
    //     return createdUser;
    // }

    async createUser2(createUser: CreateUserDto): Promise<UserModel | undefined> {
        let createdUser: UserModel | undefined;
        try {
            createdUser = await this.sequelize?.transaction(async (t) => {
                const newUser = await UserModel.create(createUser.USER, { transaction: t });
                await AuthModel.create(createUser.AUTH);
                return newUser;
              });
            console.log(createdUser, "response");
        }
        catch(error: unknown) {
            console.log(catchError(error));
        }
        return createdUser;
    }

    // async findUserByUsername(emailId: string): Promise<UserModel | null> {
    //     let user: UserModel | null = null;
    //     try {
    //         user = await UserModel.findOne({ where: { EMAILID: emailId} });
    //     }
    //     catch(error: unknown) {
    //         console.log(catchError(error));
    //     }
    //     return user;
        
    // }

    async getUserByUsername(emailId: string): Promise<UserModel | null> {
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