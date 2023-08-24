import otpGenerator from 'otp-generator';
import {OtpObject} from '../interfaces/otpObject.interface'
import NodeMailer from './mailer.services';
import EncryptionService from './encryption.services';

const key: string = 'MySecretKey';

class OtpService {
    async createOTP(emailId: string):Promise<OtpObject> {
        let otpValidationTime: string = process.env.otpValidationTime || '2'
        let otpValidationTimeInMins: number = parseInt(otpValidationTime, 10);
    
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        const ttl = otpValidationTimeInMins * 60 * 1000; //5 Minutes in miliseconds
        const expires = Date.now() + ttl; //timestamp to 5 minutes in the future
        const data = `${emailId}.${otp}.${expires}`; // phone.otp.expiry_timestamp
        // const hash = crypto.createHmac("sha256",key).update(data).digest("hex"); 
        const hash = await EncryptionService.hmac(key, data) // creating SHA256 hash of the data
        const fullHash:string = `${hash}.${expires}`; // Hash.expires, format to send to the user
        let otpObj: OtpObject = {
            otp: otp,
            fullHash: fullHash
        }
        return otpObj;
    }
    
    async verifyOTP(emailId: string, hash: string, otp: string): Promise<boolean> {
        // Seperate Hash value and expires from the hash returned from the user
        let [hashValue,expires] = hash.split(".");
        // Check if expiry time has passed
        let now = Date.now();
        if(now>parseInt(expires)) return false;
        // Calculate new hash with the same key and the same algorithm
        let data  = `${emailId}.${otp}.${expires}`;
        // let newCalculatedHash = crypto.createHmac("sha256",key).update(data).digest("hex");
        const newCalculatedHash = EncryptionService.hmac(key, data);
        // Match the hashes
        if(newCalculatedHash.toString() === hashValue){
            return true;
        } 
        return false;
    }

    async sendOtpMail(emailId: string, otp: string): Promise<void> {
        let emailRecipient: string = emailId;
        let subject: string =  'OTP';
        let body: string = "Your OTP is ${otp}";
        body = body.replace("${otp}", otp);
        await NodeMailer.sendMail(emailRecipient, subject, body);
    }
}

export default new OtpService()