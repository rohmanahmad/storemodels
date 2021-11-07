'use strict'

const PostgresORM = require('postgresql-orm')

class PaymentRefsModel extends PostgresORM {
    get tableName () {
        return 'payment_reference'
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
            uniq_number: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            nominal: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            payment_method: { // bank_transfer / credits
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            e_wallet_transaction_id: { // relasi ke e_wallet_transaction
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            /**
             * - no rekening bank customer
             * - relasi dengan bank_accounts tabel
             */
            bank_account_from: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            /**
             * - no rekening bank perusahaan
             * - relasi dengan config
             */
            bank_account_destination: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
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
    const model = new PaymentRefsModel(opt)
    return model
}