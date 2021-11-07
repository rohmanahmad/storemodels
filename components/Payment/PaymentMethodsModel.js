'use strict'

const PostgresORM = require('postgresql-orm')

class PaymentRefsModel extends PostgresORM {
    get tableName () {
        return 'payment_methods'
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
            bank_method_id: { // i_banking, m_banking, virtual_account, transfer
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            customer_bank_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
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