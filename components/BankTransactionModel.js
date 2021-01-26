'use strict'

const PostgresORM = require('postgresql-orm')

class BankTransactionModel extends PostgresORM {
    get tableName () {
        return 'bank_transaction'
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
            bank_from_name: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            bank_destination_name: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            bank_ref_transaction_code: {
                type: String,
                stringType: 'bpchar',
                size: 5,
                isNullable: false
            },
            bank_sender_account_no: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            bank_sender_note: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: true
            },
            bank_sender_attachment: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: true
            },
            nominal: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            approved_by_id: { // relasi ke user_account yg rolenya sebagai admin / operation
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            approved_at: { // relasi ke user_account yg rolenya sebagai admin / operation
                type: Date,
                stringType: 'timestamp',
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
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1}
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new BankTransactionModel(opt)
    return model
}