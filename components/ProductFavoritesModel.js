'use strict'

const BaseModel = require('./__base')

class ProductFavoritesModel extends BaseModel {
    constructor(instance) {
        super()
        this.instance = instance
    }

    get tableName () {
        return 'product_favorites'
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
            product_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            customer_id: { // bank_transfer / credits
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
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1}
            }
        }
    }

    /* functions */
}

module.exports = function (instance = {}) {
    const model = new ProductFavoritesModel(instance)
    return model
}