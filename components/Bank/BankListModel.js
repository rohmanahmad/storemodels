'use strict'

const PostgresORM = require('postgresql-orm')

class BankAccounts extends PostgresORM {
    get tableName () {
        return 'bank_list'
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
            bank_code: {
                type: String,
                stringType: 'bpchar',
                size: 4, // kode bank jika trf menggunakan atm ke bank lain
                isNullable: false
            },
            bank_name: {
                type: String,
                stringType: 'bpchar',
                size: 30, // nama bank: bca, mandiri, bri, dsb
                isNullable: false
            },
            is_trash: {
                type: Boolean,
                stringType: 'bool',
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
            no_rec: { // mencari dengan spesifik server dan jenis
                keys: {no_rec: -1, trash_status: -1},
                uniq: true
            },
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1}
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new BankAccounts(opt)
    return model
}