export class AuthSchema{

    constructor() { }

    readonly authSchema = {
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
}

export default new AuthSchema();