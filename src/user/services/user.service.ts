import { catchError } from '../../common/utils/catch.util';
import userDBDao from '../dao/user.dao'
import { CreateUserDto } from '../dto/create.user.dto';
import { CheckAuth } from '../types/checkAuth.type';


export class UserService {

    constructor() { }

    getUserDetails = async (emailId: string) => {
        try {
            const userDetails = await userDBDao.getUserByUsername(emailId);
            return userDetails;
        } catch (error: unknown) {
            throw new Error(await catchError(error));
        }
    }

    fetchPill = async (auth: CheckAuth) => {
        try {
            const pillData = await userDBDao.checkPill(auth);
            return pillData;
        } catch (error: unknown) {
            throw new Error(await catchError(error));
        }
    }

    insertUserData = async (user: CreateUserDto) => {
        try {
            await userDBDao.createUser(user);
        } catch (error: unknown) {
            throw new Error(await catchError(error));
        }
    }

    getUsers = async () => {
        try {
            const data = await userDBDao.getUsers()
            return data;
        } catch (error: unknown) {
            throw new Error(await catchError(error));
        }        
    }

    checkWhetherUserExists = async (emailId: string) : Promise<boolean> => {
        try {
            const userData = await userDBDao.getUserByUsername(emailId);
            const doesUserExist = userData? true: false;
            return doesUserExist;

        } catch (error: unknown) {
            throw new Error(await catchError(error));
        }
    }
}