import {Model, Table, Column, PrimaryKey, DataType, NotNull} from 'sequelize-typescript'
import { uuid } from 'uuidv4'


@Table({
    tableName: 'categories',
    timestamps: false
})
export class Category extends Model {
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
    category!: string

    @NotNull
    @Column({
        allowNull: false
    })
    description!: string
}