import {Model, Table, Column, PrimaryKey, DataType, NotNull, ForeignKey} from 'sequelize-typescript'
import { uuid } from 'uuidv4'
import { Product } from './Product'
import { Supplier } from './Supplier'


@Table({
    tableName: 'actions',
    timestamps: false
})
export class Action extends Model {
    @PrimaryKey
    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: uuid()
    })
    id!: string

    @ForeignKey(() =>  Product)
    @NotNull
    @Column({
        allowNull: false
    })
    product_id!: string

    @ForeignKey(() => Supplier)
    @NotNull
    @Column({
        allowNull: false
    })
    supplier_id!: string

    @NotNull
    @Column({
        allowNull: false
    })
    action_date!: Date

    @NotNull
    @Column({
        allowNull: false
    })
    price!: number

    @NotNull
    @Column({
        allowNull: false
    })
    qty!: number
}