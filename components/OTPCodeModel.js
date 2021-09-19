'use strict'

const PostgresORM = require('postgresql-orm')

class OTPCodeModel extends PostgresORM {
    get tableName () {
        return 'otp_code'
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
            account_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            otp_code: {
                type: String,
                stringType: 'bpchar(6)',
                size: 0,
                isNullable: false
            }, // yaitu parentid masih dari tabel yg sama
            otp_type: {
                type: String,
                stringType: 'bpchar', // email, sms, whatsapp,
                size: 10,
                isNullable: false
            },
            is_pending: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                dafault: false
            },
            is_success: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                dafault: false
            },
            valid_until: {
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
            is_trash: {
                keys: {is_trash: -1},
                uniq: false
            },
            otp_search: { // untuk sorting kebanyakan DESC
                keys: {otp_code: 1, otp_type: 1, valid_until: -1},
                uniq: false
            },
            account_id: { // untuk sorting kebanyakan DESC
                keys: {account_id: 1},
                uniq: false
            },
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1}
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new OTPCodeModel(opt)
    return model
}