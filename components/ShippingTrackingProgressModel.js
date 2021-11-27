'use strict'

const PostgresORM = require('postgresql-orm')

class Model extends PostgresORM {
    get tableName () {
        return 'shipping_tracking_progress'
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
            ref_trx_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            status: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: true
            },
            description_status: {
                type: Text,
                stringType: 'text',
                size: 0,
                isNullable: true
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
            status: {
                keys: {status: -1},
                uniq: false
            },
            trx_id: {
                keys: {ref_trx_id: 1},
                uniq: false
            },
            date: { // untuk sorting
                keys: {created_at: -1},
                uniq: false
            }
        }
    }

    get hasMany () {
        return {
        }
    }
    
    get hasOne () {
        return {
            garbages: {table: 'garbages', local: '_id', foreign: 'ref_id'},
            transaction_list: {table: 'transaction_list', local: 'ref_trx_id', foreign: '_id'}
        }
    }
}

module.exports = function (opt = {}) {
    const model = new Model(opt)
    return model
}