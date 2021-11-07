'use strict'

// source: https://dbdiagram.io/d/61471a3f825b5b014608f160

const PostgresORM = require('postgresql-orm')

class OfficeUsers extends PostgresORM {
    get tableName () {
        return 'office_users'
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
            username: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            email: {
                type: String,
                stringType: 'bpchar',
                size: 100,
                isNullable: false
            },
            phone_number: {
                type: String,
                stringType: 'bpchar',
                size: 16,
                isNullable: true
            },
            password: {
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
                default: false
            },
            is_blocked: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: false
            },
            is_trash: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: false
            },
            ref_createdby_id: { // office_users._id (self relationship)
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            ref_updatedby_id: { // office_users._id (self relationship)
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
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
                keys: {is_trash: 1},
                uniq: false
            },
            username: {
                keys: {username: 1},
                uniq: true
            },
            email: {
                keys: {email: 1},
                uniq: true
            },
            phone_number: {
                keys: {phone_number: 1},
                uniq: false
            },
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1},
                uniq: false
            }
        }
    }

    /* functions */
}

module.exports = function (opt = {}) {
    const model = new OfficeUsers(opt)
    return model
}