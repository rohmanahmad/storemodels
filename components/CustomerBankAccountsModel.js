'use strict'

const PostgresORM = require('postgresql-orm')

class Model extends PostgresORM {
    get tableName () {
        return 'customer_bank_accounts'
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
            ref_bank_id: { // bank_list._id
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            ref_customer_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            m_banking_username: { // nama sesuai yg terdaftar pada akun bank
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: true
            },
            i_banking_username: { // nama sesuai yg terdaftar pada akun bank
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: true
            },
            bank_account_number: { // nomor rekening
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            bank_account_name: { // nama sesuai yg terdaftar pada akun bank
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            branch_name: { // nama cabang sesuai yg terdaftar pada akun bank
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            is_trash: {
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
                keys: {_id: -1},
                uniq: true
            },
            ref_bank_id: {
                keys: {ref_bank_id: -1},
                uniq: false
            },
            ref_customer_id: {
                keys: {ref_customer_id: -1},
                uniq: false
            },
            trash_status: {
                keys: {is_trash: -1},
                uniq: false
            },
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1}
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
            ref_customer_id: {table: 'customer_list', local: 'ref_customer_id', foreign: '_id'},
            ref_bank_id: {table: 'bank_list', local: 'ref_bank_id', foreign: '_id'}
        }
    }

    /* functions */
}

module.exports = function (opt = {}) {
    const model = new Model(opt)
    return model
}