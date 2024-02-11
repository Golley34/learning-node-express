import {Model, Table, Column, PrimaryKey, DataType, NotNull, ForeignKey, BelongsToMany} from 'sequelize-typescript'
import { uuid } from 'uuidv4'
import { Action } from './Action'
import { Brand } from './Brand'
import { Category } from './Category'
import { Supplier } from './Supplier'


@Table({
    tableName: 'products',
    timestamps: false
})
export class Product extends Model {
    @BelongsToMany(() => Supplier, () => Action)
    suppliers!: Supplier[]

    @PrimaryKey
    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: uuid()
    })
    id!: string

    @ForeignKey(() =>  Category)
    @Column({
        allowNull: true
    })
    category_id!: string

    @ForeignKey(() => Brand)
    @Column({
        allowNull: true
    })
    brand_id!: string

    @NotNull
    @Column({
        allowNull: false
    })
    product!: string

    @NotNull
    @Column({
        allowNull: false
    })
    description!: string

    @Column({
        allowNull: true
    })
    image!: string

    @NotNull
    @Column({
        type: DataType.DECIMAL,
        allowNull: false
    })
    price!: number
}