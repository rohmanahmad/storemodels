'use strict'

const BaseModel = require('./__base')

class ProductsModel extends BaseModel {
    constructor(opts) {
        super()
        this.opts = opts
    }

    get tableName () {
        return 'product_list'
    }

    get connection () {
        return 'pg'
    }

    get schemas () {
        return {
            id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            category_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            }, // foreign-key dari category_list
            product_name: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            product_description: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: false
            },
            product_price: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            product_status: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            product_discount: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            product_stock: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            created_at: {
                type: Date,
                stringType: 'timestamp',
                size: 0,
                isNullable: false
            },
            updated_at: {
                type: Date,
                stringType: 'timestamp',
                size: 0,
                isNullable: false
            }
        }
    }

    get index () {
        return {
            primary: {
                keys: {id: -1},
                uniq: true
            },
            category: { // digunakan untuk pencarian by category
                keys: {category_id: 1},
                uniq: false
            },
            productname: { // digunakan untuk pencarian by keyword
                keys: {product_name: 1},
                uniq: false
            },
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1},
                uniq: false
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new ProductsModel(opt)
    return model
}