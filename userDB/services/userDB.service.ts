// import OtpService from '../../common/services/otp.services'
// import {OtpObject} from '../../common/interfaces/otpObject.interface'
// import EncryptionService from '../../common/services/encryption.services'
// import HttpRequestService from '../../common/services/httpRequest.services'
import userDBDao from '../dao/userDB.dao'
import { CreateUserDto } from '../dto/create.user.dto';


class UserDBService {
    async insertUserData(user: CreateUserDto){
        userDBDao.createUser(user).then((data: unknown) => {
            // console.log("got2", data)
            return new Promise((resolve) => {
                resolve(data)
            })
        });
    }

    // async insertUserData(user: any) {
    //     console.log(user, "user")
    //     return await userDBDao.createUser(user)
    // }

    // async storeUserData(emailId: string, encryptedData: Pill) {
    //     let data = {
    //         EMAILID: emailId,
    //         ENCRYPTEDDATA: encryptedData
    //     }
    //     // let response = HttpRequestService.postRequest(data);
    // }

    async getUsers() {
        userDBDao.getUsers().then((data) => {
            // console.log("got2", data)
            return new Promise((resolve) => {
                resolve(data)
            })
        });
        // let data = await userDBDao.createUser()
        // console.log("got2", data);
        // return data;
        
    }
}

export default new UserDBService();