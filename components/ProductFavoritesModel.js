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
            _id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            product_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            customer_id: { // khusus customer
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            trash_status: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false,
                default: 0
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
                keys: {_id: -1},
                uniq: true
            },
            trash_status: {
                keys: {trash_status: -1},
                uniq: false
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