'use strict'

const BaseModel = require('./__base')

class UsersModel extends BaseModel {
    constructor(opts) {
        super()
        this.opts = opts
    }

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
            from_ip: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            // examples: searching, checkout, topup, many others
            activity_type: {
                type: 'string',
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
            }
        }
    }

    get index () {
        return {
            primary: {
                keys: {id: -1},
                uniq: true
            },
            type: { // untuk search by type
                keys: {activity_type: 1}
            },
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1}
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new UsersModel(opt)
    return model
}