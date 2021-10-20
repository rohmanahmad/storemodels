'use strict'

// source: https://dbdiagram.io/d/61471a3f825b5b014608f160

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
            name: { // name berupa admin, client, vendor
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            ability: { // roles berupa string, hanya dipisah menggunakan koma
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            in_admin: {
                type: Boolean,
                stringType: 'boolean',
                size: 0,
                isNullable: true,
                default: false
            },
            in_ukm: {
                type: Boolean,
                stringType: 'boolean',
                size: 0,
                isNullable: true,
                default: false
            },
            in_customer: {
                type: Boolean,
                stringType: 'boolean',
                size: 0,
                isNullable: true,
                default: false
            },
            in_kurir: {
                type: Boolean,
                stringType: 'boolean',
                size: 0,
                isNullable: true,
                default: false
            },
            is_trash: {
                type: Boolean,
                stringType: 'boolean',
                size: 0,
                isNullable: true,
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
            trash_status: {
                keys: {trash_status: -1},
                uniq: false
            },
            name: { // mencari dengan spesifik server dan jenis
                keys: {name: -1},
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