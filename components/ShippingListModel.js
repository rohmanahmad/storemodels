'use strict'

const PostgresORM = require('postgresql-orm')

class ShippingListModel extends PostgresORM {
    get tableName () {
        return 'shipping_list'
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
            shipping_name: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            shipping_company_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            is_active: {
                type: Boolean,
                stringType: 'bool',
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
            search_autocomplete: { // search shipping
                keys: {shipping_name: 1},
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
    const model = new ShippingListModel(opt)
    return model
}