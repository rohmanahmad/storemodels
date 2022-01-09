'use strict'

const PostgresORM = require('postgresql-orm')

/*
    tabel ini tidak diubah secara langsung oleh pemilik maupun admin.
    ini otomatis diubah berdasarkan data dari review dan dihitung menggunakan formula
*/
class WalletTransactionModel extends PostgresORM {
    get tableName () {
        return 'wallet_transaction'
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
            ewallet_transaction_type: { // topup, transfer, 
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            }, 
            ewall_send_from_id: { // sender / pengirim ID
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            }, 
            ewall_send_to_ewallet_id: { // tujuan ID
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            ewall_transaction_nominal: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            ewall_payment_method: { // tranfer bank
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            ewall_approved_by_id: { // admin ID
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            ewall_pre_transaction_credits: { // sebelum transaksi
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            ewall_after_transaction_credits: { // setelah transaksi
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            ewall_signed_transaction_token: { // token transaksi
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: false
            },
            ewall_approved_at: {
                type: Date,
                stringType: 'timestamp',
                size: 0,
                isNullable: false
            },
            is_trash: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: false
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
                keys: {created_at: -1},
                uniq: false
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new WalletTransactionModel(opt)
    return model
}