'use strict'

const PostgresORM = require('postgresql-orm')

class Model extends PostgresORM {
    get tableName () {
        return 'bank_transactions'
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
            ref_transaction_id: { // dari sini bisa mendapatkan informasi customer id
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
            ref_bank_account_id: { // bank_accounts._id
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            ref_attachment_id: { // relasi 1 to 1 ke bank.TransactionAttachments
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: true
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
            ref_action_by_id: { // office_users._id
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
            pending_status: {
                keys: {is_pending: -1},
                uniq: false
            },
            ref_transaction_id: {
                keys: {ref_transaction_id: -1},
                uniq: true
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
            ref_bank_account_id: {table: 'bank_list', local: 'ref_bank_account_id', foreign: '_id'},
            ref_attachment_id: {table: 'bank_transaction_attachments', local: 'ref_attachment_id', foreign: '_id'},
            ref_action_by_id: {table: 'office_users', local: 'ref_action_by_id', foreign: '_id'},
        }
    }
}

module.exports = function (opt = {}) {
    const model = new Model(opt)
    return model
}