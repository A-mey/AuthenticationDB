import { Table, Column, Model, DataType } from 'sequelize-typescript';
import GenderAttributes from './gender.attributes.models';

@Table({
    timestamps: false,
    tableName: "tblGender",
  })
export class GenderModel extends Model implements GenderAttributes {
    
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    })
    ID!: number

    @Column({
        type: DataType.STRING(1),
        allowNull: false,
    })
    GENDER!: string

}