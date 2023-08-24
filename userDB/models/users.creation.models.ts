import UserAttributes from './users.attributes.models'
import {Optional} from 'Sequelize';

export interface UserCreationAttributes extends Optional<UserAttributes, 'LASTNAME' | 'PERMISSIONLEVEL'> {}