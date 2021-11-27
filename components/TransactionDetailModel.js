'use strict'

// source: https://dbdiagram.io/d/61471a3f825b5b014608f160

const PostgresORM = require('postgresql-orm')

class Model extends PostgresORM {
    get tableName () {
        return 'transaction_detail'
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
            ref_trx_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            }, // relasi ke transactions.id
            ref_product_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },  // relasi ke transactions.id
            ref_product_sku_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            }, // relase ke product_list.id
            trx_locked_product_name: {
                type: String,
                stringType: 'bpchar',
                size: 50,
                isNullable: false
            },
            trx_locked_product_description: {
                type: Text,
                stringType: 'text',
                size: 0,
                isNullable: false
            },
            trx_locked_price: {
                type: Number,
                stringType: 'float4',
                size: 0,
                isNullable: false,
                default: 0
            },
            ref_locked_image_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            }, // url didapat dari copy dari product images
            trx_locked_discount: {
                type: Number,
                stringType: 'float4',
                size: 0,
                isNullable: false,
                default: 0
            },
            trx_qty: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false,
                default: 1
            },
            trx_sub_total: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false,
                default: 0
            },
            trx_note: {
                type: Text,
                stringType: 'text',
                size: 0,
                isNullable: true
            },
            trx_tax: {
                type: Number,
                stringType: 'float4',
                size: 0,
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
            trx_id: { // untuk sorting
                keys: {trx_id: -1},
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
            transaction_list: {table: 'transaction_list', local: 'ref_trx_id', foreign: '_id'},
            product_list: {table: 'product_list', local: 'ref_product_id', foreign: '_id'},
            product_sku: {table: 'product_sku', local: 'ref_product_sku_id', foreign: '_id'},
            files: {table: 'files', local: 'ref_locked_image_id', foreign: '_id'},
        }
    }
}

module.exports = function (opt = {}) {
    const model = new Model(opt)
    return model
}