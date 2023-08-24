import {  AllowedSchema } from "express-json-validator-middleware";

export const saveReceiveSchema: AllowedSchema  = {
	"type": "object",
    "properties" : {
        "FLAG": {
            "type": "string",
            "enum": ["SELECT", "INSERT"]
        }
    },
	"if": {
		"properties": { "FLAG": { "const": "INSERT" } }
	  },
	  "then": {
		"additionalProperties": false,
		"required": ["FLAG", "uID", "KEY", "VALUE", "IdKEY"],
		"properties": {
			"FLAG": {
				"type": "string",
				"enum": ["INSERT"]
			},
			"uID": { 
				"type": "string" 
			},
			"KEY": {
				"type": "string"
			},
			"VALUE": {
				"type": "string"
			},
			"IdKEY": {
				"type": "string"
			},
			"messages": {
				"type": "array",
				"items": {
					"type": "object",
					"properties": {
						"message": {
							"type": "object",
							"properties": {
								"text": {
									"type": "string"
								}
							}
						}
					}
				}
			}
		}
	  },
	  "else": {
		"additionalProperties": false,
		"required": ["FLAG", "messages"],
		"properties": {
			"FLAG": {
				"type": "string",
				"enum": ["SELECT"]
			},
			"messages": {
				"type": "array",
				"items": {
					"type": "object",
					"properties": {
						"text": {
							"type": "string"
						},
						"from": {
							"type": "number"
						}
					}
				}
			}
		}
	  }
};