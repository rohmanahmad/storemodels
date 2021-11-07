'use strict'

// source: https://dbdiagram.io/d/61471a3f825b5b014608f160

const PostgresORM = require('postgresql-orm')

class OfficeAccessControl extends PostgresORM {
    get tableName () {
        return 'office_access_control'
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
            ref_office_user_id: { // office_users._id
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            access_name: { // access bagian ex: product
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            is_read_access: { // access ke global
                type: Boolean,
                stringType: 'boolean',
                size: 0,
                isNullable: true,
                default: false
            },
            is_write_access: { // access ke global
                type: Boolean,
                stringType: 'boolean',
                size: 0,
                isNullable: true,
                default: false
            },
            is_own_access: { // ini hanya diperbolehkan read-write yg dimiliki saja, ex: produk, review
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
                keys: {is_trash: -1},
                uniq: false
            },
            ref_office_user_id: { // mencari dengan spesifik server dan jenis
                keys: {ref_office_user_id: 1},
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
    const model = new OfficeAccessControl(opt)
    return model
}