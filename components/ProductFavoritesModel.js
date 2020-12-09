'use strict'

const PostgresORM = require('postgresql-orm')

class ProductFavoritesModel extends PostgresORM {
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
                isNullable: true
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

module.exports = function (opt = {}) {
    const model = new ProductFavoritesModel(opt)
    return model
}