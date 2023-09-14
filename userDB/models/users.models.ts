import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, ForeignKey } from 'sequelize-typescript';
// import { Table, Column, DataType, Model, Attribute, Default, PrimaryKey } from '@sequelize/core/decorators-legacy';

import {UserInstance} from './users.instance.models'
import { UserCreationAttributes } from './users.creation.models';
import { Title } from './title/title.models';
import { Gender } from './gender/gender.models';

@Table({
  timestamps: true,
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
    unique: true
  })
  ID!: number

  @ForeignKey(() => Title)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  TITLE!: number;

  // @BelongsTo(() => Title)
  // title: Title;

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

  @ForeignKey(() => Gender)
  @Column({
    type: DataType.NUMBER,
    allowNull: false
  })
  GENDER!: number;

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