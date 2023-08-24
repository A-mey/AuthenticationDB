import AuthAttributes from "./auth.attributes.models";
import { Model } from "sequelize-typescript";

export interface AuthInstance
  extends Model<AuthAttributes>, AuthAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }