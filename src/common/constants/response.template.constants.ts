import { response } from "../types/response.types";

class ResponseTemplates {

    // Default error
    DEFAULT_ERROR: response = {code: 500, success: false, data: {message: "Something went wrong"}};

    // Schema validation error
    SCHEMA_VALIDATION_ERROR: response = {success: true, code: 400, data: {message: ""}};

    // ADD USER
    USER_ADDED: response = {success: true, code: 201, data: {message:"User added successfully"}};

    // GET USERS
    USERS_FETCHED: response = {success: false, code: 200, data: {message:"Users fetched"}}

    // USER EXISTS
    USER_EXISTS: response = {success: true, code: 200, data: {message: "User already exists"}}

    // USER DOES NOT EXIST
    USER_DOES_NOT_EXIST: response = {success: false, code: 404, data: {message: "No such user found"}}

    // PILL EXISTS
    PILL_EXISTS: response = {success: false, code: 200, data: {message: "User authenticated"}};

    // PILL DOES NOT EXIST
    PILL_DOES_NOT_EXIST: response = {success: false, code: 404, data: {message: "Authentication failed"}};
}

export default new ResponseTemplates();