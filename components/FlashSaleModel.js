'use strict'

const PostgresORM = require('postgresql-orm')

class FlashSaleModel extends PostgresORM {
    get tableName () {
        return 'flashsale_list'
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
            flash_price: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            flash_stock: {
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
                keys: { id: -1 },
                uniq: true
            },
            availability: { // untuk sorting kebanyakan DESC
                keys: { flash_stock: -1 },
                uniq: false
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new FlashSaleModel(opt)
    return model
}