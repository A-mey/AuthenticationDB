export class AuthSchema{

    constructor() { }

    readonly authSchema = {
        "type": "object",
        "additionalProperties": false,
        "required": ["USERNAMEHASH", "USERAUTH"],
        "properties" : {
            "USERNAMEHASH": {
                "type": "string",
            },
            "USERAUTH": {
                "type": "string",
            },
        },
    };
}

export default new AuthSchema();