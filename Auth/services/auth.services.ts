import AuthDao from '../dao/auth.dao'
import { CreateAuthDto } from '../dto/create.auth.dto';


class AuthService {
    insertAuthData = async (auth: unknown) => {
        return await AuthDao.insertAuth(auth as CreateAuthDto)
    }
}

export default new AuthService();