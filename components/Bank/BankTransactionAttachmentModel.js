'use strict'

const PostgresORM = require('postgresql-orm')

class BankTransactionModel extends PostgresORM {
    get tableName () {
        return 'bank_transaction_attachments'
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
            title: {
                type: String,
                stringType: 'bpchar',
                size: 255,
                isNullable: false
            },
            description: {
                type: Text,
                stringType: 'text',
                size: 0,
                isNullable: true
            },
            ref_bank_transaction_id: { // bank_transactions._id
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            ref_file_id: { // files._id
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
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
            trash_status: {
                keys: {is_trash: -1},
                uniq: false
            },
            ref_bank_transaction_id: {
                keys: {ref_bank_transaction_id: -1},
                uniq: false
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