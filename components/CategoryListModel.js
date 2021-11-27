'use strict'

// source: https://dbdiagram.io/d/61471a3f825b5b014608f160

const PostgresORM = require('postgresql-orm')

class Model extends PostgresORM {
    get tableName () {
        return 'category_list'
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
            // yaitu parentid masih dari tabel yg sama
            ref_parent_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            slug: {
                type: String,
                stringType: 'bpchar',
                size: 100,
                isNullable: false
            },
            title: {
                type: String,
                stringType: 'bpchar',
                size: 50,
                isNullable: false
            },
            description: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: true
            },
            ref_image_file_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
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
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1}
            }
        }
    }

    get hasMany () {
        return {
            ref_parent_id: {table: 'category_list', local: 'ref_parent_id', foreign: '_id'},
        }
    }
    
    get hasOne () {
        return {
            garbages: {table: 'garbages', local: '_id', foreign: 'ref_id'},
            ref_image_file_id: {table: 'files', local: 'ref_image_file_id', foreign: '_id'},
        }
    }
}

module.exports = function (opt = {}) {
    const model = new Model(opt)
    return model
}