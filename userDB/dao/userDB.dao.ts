import { CreateUserDto } from '../dto/create.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import shortid from 'shortid';
import debug from 'debug';
import mySqlService from '../../common/services/sql.services'
import {UserModel} from '../models/users.models'
import { resolve } from 'path';
// import  DataTypes  from 'Sequelize';
// import { poolPromise } from '../../common/services/DAL/sql.service';
// import { sipSQL } from '../../common/services/DAL/sql.service.sip'

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
    users: Array<CreateUserDto> = [];
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

    public sequelize: any;
    public User: any;

    async getSequelizeDao(): Promise<void> {
        this.sequelize = await mySqlService.getSequelize();
        log(this.sequelize, "DaoSequelize");
        this.sequelize.addModels([UserModel]); 
        log(this.User);
        this.sequelize.sync().then(() => {
            log('User table created successfully!');
            }).catch((error: any) => {
            console.error('Unable to create table : ', error);
            });
    }

    async getUsers(): Promise<any> {
        try {
            return UserModel.findAll().then((res: any) => {
                log("got3", res);
                return new Promise((resolve, _reject) => {
                    resolve(res);
                });
            }).catch((error: any) => {
                log('Failed to retrieve data : ', error);
                return new Promise((_resolve, reject) => {
                    reject(error);
                });
            });
        }
        catch(error: any) {
            log('Failed to retrieve data : ', error);
            return new Promise((_resolve, reject) => {
                reject(error);
            });
        }
        
    }

    async createUser(user: CreateUserDto): Promise<any> {
        try {
            let data: boolean = false;
            return UserModel.create(user).then((res: any) => {
                // console.log("user", res);
                return new Promise((resolve, _reject) => {
                    data = true;
                    resolve(data);
                })
            })
            .catch((err: any) => {
                return new Promise((_resolve, reject) => {
                    reject(data);
                })
            })
        }
        catch(error: any) {
            log('Failed to create user : ', error);
            return new Promise((_resolve, reject) => {
                reject(false);
            });
        }
        
    }

    async findUserByUsername(emailId: string): Promise<boolean> {
        try {
            const user = await UserModel.findOne({ where: { EMAILID: emailId} });
            if (!user) {
                return false;
            }
            else {
                return true;
            }
        }
        catch(error: any) {
            return new Promise((_resolve, reject) => {
                reject(false);
            });
        }
        
    }

    async getUserByUsername(emailId: string): Promise<any> {
        try {
            const user = await UserModel.findOne({ where: { EMAILID: emailId} });
            if (!user) {
                return false;
            }
            else {
                return user;
            }
        }
        catch(error: any) {
            return new Promise((_resolve, reject) => {
                reject(false);
            });
        }
        
    }
}

export default new UsersDao();