'use strict'

const BaseModel = require('./__base')

class UsersModel extends BaseModel {
    constructor(instance) {
        super()
        this.instance = instance
    }

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
            server_ip: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            data: {
                type: Object,
                stringType: 'json',
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
            },
            type: {
                type: String,
                stringType: 'bpchar',
                size: 20,
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

module.exports = function (instance = {}) {
    const model = new UsersModel(instance)
    return model
}