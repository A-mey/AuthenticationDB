import { Table, Column, Model, DataType } from 'sequelize-typescript';
import {UserInstance} from './users.instance.models'
import { UserCreationAttributes } from './users.creation.models';

@Table({
  timestamps: false,
  tableName: "tblUsers",
})
export class UserModel extends Model<UserInstance, UserCreationAttributes> implements UserInstance{

  // @Length({max: 100})
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  EMAILID!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  FIRSTNAME!: string;

  @Column(DataType.TEXT)
  LASTNAME!: string;

  @Column(DataType.INTEGER)
  PERMISSIONLEVEL!: number;
}