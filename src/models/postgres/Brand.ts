import {Model, Table, Column, PrimaryKey, DataType, NotNull} from 'sequelize-typescript'
import { uuid } from 'uuidv4'


@Table({
    tableName: 'brands',
    timestamps: false
})
export class Brand extends Model {
    @PrimaryKey
    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: uuid()
    })
    id!: string

    @NotNull
    @Column({
        allowNull: false
    })
    brand!: string
}