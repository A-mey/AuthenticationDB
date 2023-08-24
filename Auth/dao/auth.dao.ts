import { CreateAuthDto } from '../dto/create.auth.dto';
import debug from 'debug';
import mySqlService from '../../common/services/sql.services'
import {AuthModel} from '../models/auth.models'

const log: debug.IDebugger = debug('app:in-memory-dao');

class AuthDao {
    // authTable: Array<CreateAuthDto> = [];  

    constructor() {        
        this.getSequelizeDao();
        
        
    }

    public sequelize: any;
    public User: any;

    async getSequelizeDao(): Promise<void> {
        this.sequelize = await mySqlService.getSequelize();
        // log(this.sequelize, "DaoSequelize");
        this.sequelize.addModels([AuthModel]); 
        // log(this.User);
        this.sequelize.sync().then(() => {
            log('Auth table created successfully!');
            }).catch((error: any) => {
            console.error('Unable to create table : ', error);
            });
    }

    async insertAuth(authModel: CreateAuthDto) {
        try {
            let data: boolean = false;
            AuthModel.create(authModel).then((res: any) => {
                return new Promise((resolve, _reject) => {
                    log(res);
                    data = true;
                    resolve(data);
                })
            })
            .catch((err: any) => {
                return new Promise((_resolve, reject) => {
                    log(err.message)
                    data = true;
                    reject(data);
                })
            })
        }
        catch(err: any) {
            return new Promise((_resolve, reject) => {
                console.log(err.message)
                return reject(false);
            })
        }
        
    }

    async checkPill(authModel: CreateAuthDto): Promise<any> {
        try {
            await AuthModel.findOne({ where: { USERNAMEHASH: authModel.USERNAMEHASH, AUTHPILL: authModel.AUTHPILL} })
            .then((data) => {
                return new Promise((resolve, _reject) => {
                    if (data) {
                        return resolve(true);
                    }
                    else {
                        return resolve(false);
                    }
                })
            })
            .catch((err: any) => {
                return new Promise((_resolve, reject) => {
                    console.log(err.message)
                    return reject(false);
                })
            })
        }
        catch(err: any) {
            return new Promise((_resolve, reject) => {
                console.log(err.message)
                return reject(false);
            })
        }
        
    }  

}

export default new AuthDao();