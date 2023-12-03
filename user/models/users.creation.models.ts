import UserAttributes from './users.attributes.models'
import {Optional} from 'sequelize';

export interface UserCreationAttributes extends Optional<UserAttributes, 'LASTNAME'> {}