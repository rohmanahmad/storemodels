'use strict'

// source: https://dbdiagram.io/d/61471a3f825b5b014608f160

const PostgresORM = require('postgresql-orm')

class Model extends PostgresORM {
    get tableName () {
        return 'product_embed'
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
            ref_product_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            ref_store_id: { // userid dari user yang meng-embed product_id tsb
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            is_custom: {
                type: Boolean,
                stringType: 'boolean',
                size: 0,
                isNullable: false
            },
            custom_title: {
                type: String,
                stringType: 'bpchar',
                size: 50,
                isNullable: true
            },
            custom_description: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: true
            },
            increase: {
                type: Number,
                stringType: 'float4',
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
            is_active: {
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
                keys: { _id: -1 },
                uniq: true
            },
            is_trash: {
                keys: { is_trash: 1 },
                uniq: false
            },
            ref_user_id: {
                keys: { ref_user_id: 1 },
                uniq: false
            },
            product_list: {
                keys: { ref_product_id: 1 },
                uniq: false
            },
            date: {
                keys: { created_at: -1 },
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
            product_list: {table: 'product_list', local: 'ref_product_id', foreign: '_id'},
            user_accounts: {table: 'user_accounts', local: 'ref_user_id', foreign: '_id'}
        }
    }
}

module.exports = function (opt = {}) {
    const model = new Model(opt)
    return model
}