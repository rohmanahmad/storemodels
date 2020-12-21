'use strict'

const PostgresORM = require('postgresql-orm')

class UserAccountsModel extends PostgresORM {
    get tableName () {
        return 'user_accounts'
    }

    get connection () {
        return 'pg'
    }

    get schemas () {
        // user account bisa seorang pemilik ukm atau seorang customer (jadi satu)
        return {
            id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            /* email dan password tidak wajib, krn harus menggunakan nomor telp sebagai OTP */
            user_email: {
                type: String,
                stringType: 'bpchar',
                size: 50,
                isNullable: true
            },
            user_password: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: true
            },
            /* phonenumber wajib */
            user_phonenumber: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            is_active: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false
            },
            is_blocked: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false
            },
            ukm_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: true
            },
            /* setiap kali pendaftaran user baru, maka otomatis terdaftar sebagai customer sebagai default */
            /* jika user tsb juga sebagai mitra, maka ukm id ada isinya */
            customer_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            user_role: {
                type: String,
                stringType: 'bpchar',
                size: 10,
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
                keys: {id: -1},
                uniq: true
            },
            user_email: { // digunakan untuk getInformation
                keys: {user_email: 1},
                uniq: true
            },
            user_phonenumber: { // digunakan untuk getInformation by phonenumber
                keys: {user_phonenumber: 1},
                uniq: true
            },
            ukm_id: { // digunakan untuk pencarian by ukmid
                keys: {ukm_id: 1},
                uniq: true
            },
            created_date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1},
                uniq: false
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new UserAccountsModel(opt)
    return model
}