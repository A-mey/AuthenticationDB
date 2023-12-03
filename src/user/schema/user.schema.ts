class userDBSchema {

    constructor() {  }

    readonly schema = {
        "insertUser": {
            "type": "object",
            "additionalProperties": false,
            "required": ["USER", "AUTH"],
            "properties": {
                "USER": {
                    "type": "object",
                    "additionalProperties": false,
                    "required": ["EMAILID", "FIRSTNAME", "TITLE", "GENDER", "DOB"],
                    "properties": {
                        "EMAILID": {
                            "type": "string",
                            "format": "email"
                        },
                        "TITLE": {
                            "type": "number",
                            "enum": [1, 2, 3] 
                        },
                        "FIRSTNAME": {
                            "type": "string",
                        },
                        "LASTNAME": {
                            "type": "string",
                        },
                        "GENDER": {
                            "type": "number",
                            "enum": [1, 2]
                        },
                        "DOB": {
                            "type": "string",
                        }
                    }
                },
                "AUTH": {
                    "type": "object",
                    "additionalProperties": false,
                    "required": ["USERNAMEHASH", "AUTHPILL"],
                    "properties": {
                        "USERNAMEHASH": {
                            "type": "string",
                        },
                        "AUTHPILL": {
                            "type": "string",
                        },
                    }
                }
            }
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
        },

        "getUserByUsername": {
            "type": "object",
            "additionalProperties": false,
            "required": ["EMAILID"],
            "properties" : {
                "EMAILID": {
                    "type": "string",
                    "format": "email"
                },
            },
        },

        "authenticateUser": {
            "type": "object",
            "additionalProperties": false,
            "required": ["USERNAMEHASH", "USERAUTH"],
            "properties" : {
                "USERNAMEHASH": {
                    "type": "string",
                },
                "USERAUTH": {
                    "type": "string"
                }
            },
        }
    }
}

export default new userDBSchema();