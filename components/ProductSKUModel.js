'use strict'

// source: https://dbdiagram.io/d/61471a3f825b5b014608f160

const PostgresORM = require('postgresql-orm')

class Model extends PostgresORM {
    get tableName () {
        return 'product_sku'
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
            ref_image_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            code: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            variant: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            price: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false,
                default: 0
            },
            dicount: {
                type: Number,
                stringType: 'float4',
                size: 0,
                isNullable: false,
                default: 0
            },
            stock: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false,
                default: 0
            },
            tax: {
                type: Number,
                stringType: 'float4',
                size: 0,
                isNullable: false,
                default: 0
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
            image: {
                keys: {ref_image_id: 1},
                uniq: false
            },
            ref_product_id: { // digunakan untuk pencarian by keyword
                keys: {ref_product_id: 1},
                uniq: false
            },
            is_trash: {
                keys: {is_trash: -1},
                uniq: false
            },
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1},
                uniq: false
            }
        }
    }

    get hasMany () {
        return {
            product_list: {table: 'product_list', local: 'ref_product_id', foreign: '_id'},
        }
    }
    
    get hasOne () {
        return {
            garbages: {table: 'garbages', local: '_id', foreign: 'ref_id'},
            files: {table: 'files', local: 'ref_image_id', foreign: '_id'},
        }
    }
}

module.exports = function (opt = {}) {
    const model = new Model(opt)
    return model
}