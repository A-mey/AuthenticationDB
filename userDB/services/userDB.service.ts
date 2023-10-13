import userDBDao from '../dao/userDB.dao'
import { CreateUserDto } from '../dto/create.user.dto';


class UserDBService {
    insertUserData = async (user: CreateUserDto) => {
        const newUser = await userDBDao.createUser(user);
        console.log("newUser", newUser);
        return newUser;

    }

    getUsers = async () => {
        const data = await userDBDao.getUsers()
        console.log("got2", data);
        return data;
        
    }
}

export default new UserDBService();