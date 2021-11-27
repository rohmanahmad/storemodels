'use strict'

// source: https://dbdiagram.io/d/61471a3f825b5b014608f160

const PostgresORM = require('postgresql-orm')


// satu UKM bisa memiliki lebih dari 1 store
class Model extends PostgresORM {
    get tableName () {
        return 'store_list'
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
            ref_ukm_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            store_name: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            ref_address_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            ref_category_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            ref_store_photo_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            ref_wall_photo_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            description: {
                type: String,
                stringType: 'bpchar',
                size: 200,
                isNullable: true
            },
            is_active: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: true
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
            address_list: {table: 'address_list', local: 'ref_address_id', foreign: '_id'},
            photo_files: {table: 'files', local: 'ref_store_photo_id', foreign: '_id'},
            wall_files: {table: 'files', local: 'ref_wall_photo_id', foreign: '_id'},
            category_list: {table: 'category_list', local: 'ref_category_id', foreign: '_id'},
        }
    }
}

module.exports = function (opt = {}) {
    const model = new Model(opt)
    return model
}