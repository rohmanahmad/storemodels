'use strict'

const PostgresORM = require('postgresql-orm')

class Model extends PostgresORM {
    get tableName () {
        return 'bank_list'
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
            bank_code: {
                type: String,
                stringType: 'bpchar',
                size: 4, // kode bank jika trf menggunakan atm ke bank lain
                isNullable: false
            },
            bank_name: {
                type: String,
                stringType: 'bpchar',
                size: 50, // nama bank: bca, mandiri, bri, dsb
                isNullable: false
            },
            is_trash: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: 0
            },
            ref_created_by_id: {
                type: String,
                stringType: 'bpchar',
                size: 40, // user_accounts._id
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
                keys: {_id: -1},
                uniq: true
            },
            is_trash: {
                keys: {is_trash: -1},
                uniq: false
            },
            bank_name: {
                keys: { bank_name: 1 },
                uniq: true
            },
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1}
            }
        }
    }

    get hasMany () {
        return {
            ref_bank_id: {table: 'customer_bank_accounts', local: 'ref_bank_id', foreign: '_id'},
            ref_created_by_id: {table: 'user_accounts', local: 'ref_created_by_id', foreign: '_id'},
        }
    }

    get hasOne () {
        return {
            garbages: {table: 'garbages', local: '_id', foreign: 'ref_id'}
        }
    }
}

module.exports = function (opt = {}) {
    const model = new Model(opt)
    return model
}