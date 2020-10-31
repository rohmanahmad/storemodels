'use strict'

const BaseModel = require('./__base')

class OTPCodeModel extends BaseModel {
    constructor(opts) {
        super()
        this.opts = opts
    }

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
            user_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
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
            status: {
                type: Number,
                stringType: 'int4', // 0: pending, 1: success, 2: timeout,
                size: 0,
                isNullable: false
            },
            valid_until: {
                type: Date,
                stringType: 'timestamp',
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
                isNullable: false
            }
        }
    }

    get index () {
        return {
            primary: {
                keys: {id: -1},
                uniq: true
            },
            otp_search: { // untuk sorting kebanyakan DESC
                keys: {otp_code: 1, otp_type: 1, valid_until: -1},
                uniq: false
            },
            user: { // untuk sorting kebanyakan DESC
                keys: {user_id: 1},
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