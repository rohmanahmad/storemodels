'use strict'

const PostgresORM = require('postgresql-orm')

class VerificationImages extends PostgresORM {
    get tableName () {
        return 'verification_images'
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
            url: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: false
            },
            folder_path: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: false
            },
            is_pending: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: true
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
            is_pending: {
                keys: {is_pending: -1},
                uniq: false
            },
            created_date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1},
                uniq: false
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new VerificationImages(opt)
    return model
}