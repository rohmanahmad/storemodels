'use strict'

const PostgresORM = require('postgresql-orm')

class Model extends PostgresORM {
    get tableName () {
        return 'activity_log'
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
            type: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            server_ip: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: true
            },
            data: {
                type: Object,
                stringType: 'json',
                size: 0,
                isNullable: true
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
            server: { // mencari dengan spesifik server dan jenis
                keys: {server_ip: -1, type: -1},
                uniq: false
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
            garbages: {table: 'garbages', local: '_id', foreign: 'ref_id'}
        }
    }
}

module.exports = function (opt = {}) {
    const model = new Model(opt)
    return model
}