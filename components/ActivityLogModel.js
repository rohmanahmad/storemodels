'use strict'

const PostgresORM = require('postgresql-orm')

class ActivityLogModel extends PostgresORM {
    get tableName () {
        return 'application_events_log'
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
            trash_status: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false,
                default: 0
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
                keys: {trash_status: -1},
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
}

module.exports = function (opt = {}) {
    const model = new ActivityLogModel(opt)
    return model
}