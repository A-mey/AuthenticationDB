class userDBSchema {

    constructor() {  }

    readonly schema = {
        "insertUser": {
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
        },
        "checkUser": {
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
    }
}

export default new userDBSchema();