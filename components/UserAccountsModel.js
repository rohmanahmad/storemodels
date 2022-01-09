'use strict'

// source: https://dbdiagram.io/d/61471a3f825b5b014608f160

const PostgresORM = require('postgresql-orm')

class Model extends PostgresORM {
    get tableName () {
        return 'user_accounts'
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
            /* email dan password tidak wajib, krn harus menggunakan nomor telp sebagai OTP */
            email: {
                type: String,
                stringType: 'bpchar',
                size: 50,
                isNullable: true
            },
            password: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: true
            },
            /* phone_number wajib */
            phone_number: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            role: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            is_has_ukm: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false
            },
            is_pending_confirmation: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: true
            },
            is_active: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: false
            },
            is_blocked: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: false
            },
            is_trash: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: false
            },
            ref_createdby_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            ref_updatedby_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
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
            is_trash: {
                keys: {is_trash: -1},
                uniq: false
            },
            user_email: { // digunakan untuk getInformation
                keys: {email: 1},
                uniq: true
            },
            user_phonenumber: { // digunakan untuk getInformation by phonenumber
                keys: {phone_number: 1},
                uniq: true
            },
            pendings: { // digunakan untuk pencarian by pending status
                keys: {is_pending_confirmation: 1},
                uniq: false
            },
            active: { // digunakan untuk pencarian by active status
                keys: {is_active: 1},
                uniq: false
            },
            blocked: { // digunakan untuk pencarian by blocked status
                keys: {is_blocked: 1},
                uniq: false
            },
            created_date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1},
                uniq: false
            }
        }
    }

    get hasMany () {
        return {
            user_token: {table: 'user_tokens', local: '_id', foreign: 'ref_user_id'},
        }
    }
    
    get hasOne () {
        return {
            garbages: {table: 'garbages', local: '_id', foreign: 'ref_id'}
        }
    }
}

module.exports = function (opt = {}) {
    const model = new Model(opt)
    return model
}