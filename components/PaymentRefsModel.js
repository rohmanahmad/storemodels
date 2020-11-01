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
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            bank_transaction_id: { // relasi ke bank_transaction
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