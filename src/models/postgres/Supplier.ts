import {Model, Table, Column, PrimaryKey, DataType, NotNull, BelongsToMany} from 'sequelize-typescript'
import { uuid } from 'uuidv4'
import { Action } from './Action'
import { Product } from './Product'


@Table({
    tableName: 'suppliers',
    timestamps: false
})
export class Supplier extends Model {
    @BelongsToMany(() => Product, () => Action)
    products!: Product[]

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
    supplier!: string

    @NotNull
    @Column({
        allowNull: false
    })
    address!: string

    @Column({
        allowNull: true
    })
    contacts!: string
}