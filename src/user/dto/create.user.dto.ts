import UserAttributes from '../models/users.attributes.models';
import {AuthInstance} from '../models/auth/auth.instance.model';

// export interface CreateUserDto extends UserAttributes {}
export interface CreateUserDto {
    USER: UserAttributes;
    AUTH: AuthInstance;
}