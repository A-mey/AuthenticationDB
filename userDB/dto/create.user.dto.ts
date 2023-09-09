import UserAttributes from '../models/users.attributes.models';
import {AuthInstance} from '../../Auth/models/auth.instance.models';

// export interface CreateUserDto extends UserAttributes {}
export interface CreateUserDto {
    USER: UserAttributes;
    AUTH: AuthInstance;
}