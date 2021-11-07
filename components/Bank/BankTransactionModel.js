'use strict'

const PostgresORM = require('postgresql-orm')

class BankTransactionModel extends PostgresORM {
    get tableName () {
        return 'bank_transactions'
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
            ref_bank_account_id: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            ref_transaction_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            transaction_type: { // m_banking, i_banking, virtual_account, transfer
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            ref_attachment_id: { // relasi 1 to * ke bank.TransactionAttachments
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: true
            },
            ref_approved_by_id: { // relasi ke user_account yg rolenya sebagai admin / operation
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            bank_trx_note: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: true
            },
            is_pending: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false
            },
            action_type: { // rejected, approved
                type: String,
                stringType: 'bpchar',
                size: 0,
                isNullable: false
            },
            action_at: {
                type: Date,
                stringType: 'timestamp',
                size: 0,
                isNullable: true
            },
            ref_actionby_id: { // office_users._id
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
            trash_status: {
                keys: {is_trash: -1},
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