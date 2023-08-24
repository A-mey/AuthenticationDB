import { CommonSchema } from "../../common/common.schema";

export class userDBSchema extends CommonSchema{


    constructor() {
        super()
        this.ajv = super.getAjv()
    }

    private insertUserSchema = {
        "type": "object",
        "additionalProperties": false,
        "required": ["EMAILID", "FIRSTNAME"],
        "properties" : {
            "EMAILID": {
                "type": "string",
                "format": "email"
            },
            "FIRSTNAME": {
                "type": "string",
            },
            "LASTNAME": {
                "type": "string",
            },
            "PERMISSIONLEVEL": {
                "type": "number",
            }
        },
    };

    private checkUserSchema = {
        "type": "object",
        "additionalProperties": false,
        "required": ["EMAILID"],
        "properties" : {
            "EMAILID": {
                "type": "string",
                "format": "email"
            },
        },
    }

    public insertUserSchemaValidate = this.ajv.compile(this.insertUserSchema)

    public checkUserSchemaValidate = this.ajv.compile(this.checkUserSchema)
}