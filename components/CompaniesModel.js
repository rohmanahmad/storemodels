'use strict'

const PostgresORM = require('postgresql-orm')

class Model extends PostgresORM {
    get tableName () {
        return 'company_list'
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
            name: { // PT, CV atau lainnya
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            description: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: true
            },
            ref_address_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            phone_number: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: true
            },
            email: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: true
            },
            fax: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: true
            },
            website: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: true
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
                keys: {is_trash: -1},
                uniq: false
            },
            search_by_name: {
                keys: {name: 1, is_trash: -1},
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
        }
    }
}

module.exports = function (opt = {}) {
    const model = new Model(opt)
    return model
}