'use strict'

// source: https://dbdiagram.io/d/61471a3f825b5b014608f160

const PostgresORM = require('postgresql-orm')

class UserActivityModel extends PostgresORM {
    get tableName () {
        return 'user_activities'
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
            zone: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            method: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            endpoint: {
                type: String,
                stringType: 'bpchar',
                size: 200,
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
            from_ip: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: true
            },
            userid: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            user_role: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            data: {
                type: Object,
                stringType: 'json',
                size: 0,
                isNullable: true
            },
            time_request: {
                type: Date,
                stringType: 'timestamp',
                size: 0,
                isNullable: false
            },
            time_response: {
                type: Date,
                stringType: 'timestamp',
                size: 0,
                isNullable: true
            },
            total_time: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: true
            },
            created_at: {
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
            server: { // mencari dengan spesifik server dan jenis
                keys: {server_ip: -1, type: -1},
                uniq: false
            },
            userid: { // mencari dengan spesifik server dan jenis
                keys: {userid: -1},
                uniq: false
            },
            zone: { // mencari dengan spesifik server dan jenis
                keys: {zone: 1},
                uniq: false
            },
            from_ip: { // mencari dengan spesifik server dan jenis
                keys: {from_ip: 1},
                uniq: false
            },
            total_time_execution: { // untuk sorting kebanyakan DESC
                keys: {total_time: -1}
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new UserActivityModel(opt)
    return model
}