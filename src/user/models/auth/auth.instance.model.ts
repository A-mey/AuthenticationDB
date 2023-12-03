import AuthAttributes from "./auth.attribute.model";
import { Model } from "sequelize-typescript";

export interface AuthInstance
  extends Model<AuthAttributes>, AuthAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }