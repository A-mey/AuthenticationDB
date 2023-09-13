import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';
// import { Table, Column, DataType, Model, Attribute, Default, PrimaryKey } from '@sequelize/core/decorators-legacy';

import {UserInstance} from './users.instance.models'
import { UserCreationAttributes } from './users.creation.models';

@Table({
  timestamps: false,
  tableName: "tblUsers",
})
export class UserModel extends Model<UserInstance, UserCreationAttributes> implements UserInstance{

  // @Length({max: 100})
  // @PrimaryKey
  // @Default(1)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  ID!: number

  @Column({
    type: DataType.STRING(3),
    allowNull: false,
  })
  TITLE!: title;

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

  @Column({
    type: DataType.STRING(1),
    allowNull: false
  })
  GENDER!: gender;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false
    })
  DOB!: Date;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  CREATED_ON!: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  UPDATED_ON!: Date;
}