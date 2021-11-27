'use strict'

const PostgresORM = require('postgresql-orm')

class Model extends PostgresORM {
    get tableName () {
        return 'verification_images'
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
            ref_file_id: { // files._id
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            is_pending: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: true
            },
            is_valid: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: false
            },
            ref_validated_by_id: { // office_users._id
                type: String,
                stringType: 'bpchar',
                size: 40,
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

    get hasMany () {
        return {
        }
    }
    
    get hasOne () {
        return {
            garbages: {table: 'garbages', local: '_id', foreign: 'ref_id'},
            ref_file_id: {table: 'files', local: 'ref_file_id', foreign: '_id'},
            ref_validated_by_id: {table: 'office_users', local: 'ref_validated_by_id', foreign: '_id'},
        }
    }
}

module.exports = function (opt = {}) {
    const model = new Model(opt)
    return model
}