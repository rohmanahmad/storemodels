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
            _id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            shipping_name: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            shipping_company_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            shipping_status: {
                type: Number,
                stringType: 'int4',
                size: 0,
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