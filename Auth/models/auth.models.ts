import { Table, Column, Model, DataType } from 'sequelize-typescript';
import {AuthInstance} from './auth.instance.models'

@Table({
  timestamps: false,
  tableName: "tblAuth",
})
export class AuthModel extends Model<AuthInstance> implements AuthInstance{

  @Column(
    {type: DataType.STRING(255),
    allowNull: false,
    unique: true})
  USERNAMEHASH!: string;

  @Column(
    {type: DataType.STRING(255),
      allowNull: false}
  )
  AUTHPILL!: string;
}