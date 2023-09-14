import { Table, Column, Model, DataType } from 'sequelize-typescript';
import TitleAttributes from './title.attributes.models';

@Table({
    timestamps: false,
    tableName: "tblTitle",
  })
export class Title extends Model implements TitleAttributes {
    
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    })
    ID!: number

    @Column({
        type: DataType.STRING(3),
        allowNull: false,

    })
    TITLE!: string

}