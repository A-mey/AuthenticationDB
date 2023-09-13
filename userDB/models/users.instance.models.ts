import UserAttributes from "./users.attributes.models";
import { UserCreationAttributes } from "./users.creation.models";
import { Model } from "sequelize-typescript";

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
      CREATED_ON: Date;
      UPDATED_ON: Date;
    }