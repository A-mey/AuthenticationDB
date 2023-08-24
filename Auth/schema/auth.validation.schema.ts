import {AuthSchema} from "./auth.schema";
import { CommonSchemaValidator } from "../../common/interfaces/schemaValidation.interface"; 
import { ErrorObject } from "ajv";
import { errorMessageObject } from "../../common/types/errorMsgObject.types";
import getErrorServices from "../../common/services/getError.services";

class AuthValidationSchema extends AuthSchema implements CommonSchemaValidator {
    constructor() {
        super()
    }

    public error: errorMessageObject = {isValid: false, errorMsg: ""};

    validateRequest(req: any, key: string) {
        switch(key) {
            case "auth":
                var isValid = this.authSchemaValidate(req);
                if (isValid) {
                    console.log('Data is valid');
                    this.error.isValid = true
                    return this.error;
                }
                else {
                    this.error.isValid = false;
                    let errors: ErrorObject[] | null | undefined = this.authSchemaValidate.errors;
                    this.error.errorMsg = getErrorServices.getError(errors![0]) 
                    return this.error;
                }

            default:
                return this.error;
        }
    }
}

export default new AuthValidationSchema()