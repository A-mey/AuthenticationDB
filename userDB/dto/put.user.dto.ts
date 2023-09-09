import { CreateUserDto } from './create.user.dto'

export interface PutUserDto extends CreateUserDto{
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    permissionLevel: number;
}