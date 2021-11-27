'use strict'

// source: https://dbdiagram.io/d/61471a3f825b5b014608f160

const PostgresORM = require('postgresql-orm')

class Model extends PostgresORM {
    get tableName () {
        return 'ukm_list'
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
            ref_user_id: { // user_accounts._id
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            name: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            ref_address_id: { // address_list._id
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            ref_photo_id: { // files._id
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            description: {
                type: Text,
                stringType: 'text',
                size: 0,
                isNullable: true
            },
            is_active: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: true
            },
            is_pending_approval: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: false
            },
            is_temp_blocked: {
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
            is_active: {
                keys: {is_active: 1},
                uniq: false
            },
            is_pending_approval: {
                keys: {is_pending_approval: 1},
                uniq: false
            },
            is_temp_blocked: {
                keys: {is_temp_blocked: 1},
                uniq: false
            },
            is_blocked: {
                keys: {is_blocked: 1},
                uniq: false
            },
            name: { // untuk searching
                keys: {name: -1},
                uniq: false
            },
            date: { // untuk sorting
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
            ref_user_id: {table: 'user_accounts', local: 'ref_user_id', foreign: '_id'},
            ref_address_id: {table: 'address_list', local: 'ref_address_id', foreign: '_id'},
            ref_photo_id: {table: 'files', local: 'ref_photo_id', foreign: '_id'},
        }
    }
}

module.exports = function (opt = {}) {
    const model = new Model(opt)
    return model
}