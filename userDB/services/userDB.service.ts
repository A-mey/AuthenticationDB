import { catchError } from '../../common/utils/catch.util';
import userDBDao from '../dao/userDB.dao'
import { CreateUserDto } from '../dto/create.user.dto';


class UserDBService {
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

export default new UserDBService();