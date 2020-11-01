'use strict'

const PostgresORM = require('postgresql-orm')

class AvailableShippingModel extends PostgresORM {
    get tableName () {
        return 'available_shipping'
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
            ukm_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            shipping_id: {
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
            ukm: { // untuk mencari data berdasarkan
                keys: {ukm_id: 1},
                uniq: false
            },
            date: { // untuk sorting
                keys: {created_at: -1},
                uniq: false
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new AvailableShippingModel(opt)
    return model
}