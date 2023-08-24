import AuthDao from '../dao/auth.dao'


class AuthService {
    async insertAuthData(auth: any) {
        return await AuthDao.insertAuth(auth)
    }
}

export default new AuthService();