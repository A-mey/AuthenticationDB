import { CommonSchema } from "../../common/common.schema";

export class AuthSchema extends CommonSchema{


    constructor() {
        super()
        this.ajv = super.getAjv()
    }

    private authSchema = {
        "type": "object",
        "additionalProperties": false,
        "required": ["USERNAMEHASH", "AUTHPILL"],
        "properties" : {
            "USERNAMEHASH": {
                "type": "string",
            },
            "AUTHPILL": {
                "type": "string",
            },
        },
    };

    public authSchemaValidate = this.ajv.compile(this.authSchema)
}