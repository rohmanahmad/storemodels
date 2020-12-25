'use strict'

const PostgresORM = require('postgresql-orm')

class Roles extends PostgresORM {
    get tableName () {
        return 'roles'
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
            roles_name: { // roles_name berupa admin, client, vendor
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            roles: { // roles berupa string, hanya dipisah menggunakan koma
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: false
            },
            status: {
                type: Number,
                stringType: 'int4',
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
            name: { // mencari dengan spesifik server dan jenis
                keys: {roles_name: -1},
                uniq: false
            },
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1}
            }
        }
    }

    /* functions */
}

module.exports = function (opt = {}) {
    const model = new Roles(opt)
    return model
}