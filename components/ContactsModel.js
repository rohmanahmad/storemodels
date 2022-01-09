'use strict'

const PostgresORM = require('postgresql-orm')

class ContactsModel extends PostgresORM {
    get tableName () {
        return 'contacts'
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
            _id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            /* relation to user_accounts */
            user_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            phone_number: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            /* verifikasi dilakukan ketika daftar, kontak akan mengirimkan otp ke nomor admin untuk verifikasi */
            whatsapp_verified: {
                type: Number,
                stringType: 'int4',
                size: 0,
                default: 0,
                isNullable: false
            },
            /* verifikasi dilakukan ketika daftar, kontak akan mengirimkan otp ke bot admin untuk verifikasi */
            telegram_verified: {
                type: Number,
                stringType: 'int4',
                size: 0,
                default: 0,
                isNullable: false
            },
            is_blocked: {
                type: Boolean,
                stringType: 'bool',
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
            user_id_phonenumber: { // digunakan untuk getInformation
                keys: {user_id: 1, phone_number: 1},
                uniq: true
            },
            phonenumber: { // digunakan untuk getInformation by phonenumber
                keys: {phone_number: 1},
                uniq: true
            },
            created_date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1},
                uniq: false
            },
            updated_date: { // untuk sorting kebanyakan DESC
                keys: {updated_at: -1},
                uniq: false
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new ContactsModel(opt)
    return model
}