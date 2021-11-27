'use strict'

// source: https://dbdiagram.io/d/61471a3f825b5b014608f160

const PostgresORM = require('postgresql-orm')

/*
    tabel ini tidak diubah secara langsung oleh pemilik maupun admin.
    ini otomatis diubah berdasarkan data dari review dan dihitung menggunakan formula
*/
class Model extends PostgresORM {
    get tableName () {
        return 'product_review_summary'
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
            views_total: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false,
                default: 0
            },
            stars_total: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false,
                default: 0
            },
            stars_rate: {
                type: Number,
                stringType: 'float4',
                size: 0,
                isNullable: false,
                default: 0
            },
            responden_total: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
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
                keys: { is_trash: -1 },
                uniq: false
            },
            product: {
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
            product_list: {table: 'product_list', local: 'ref_product_id', foreign: '_id'}
        }
    }
}

module.exports = function (opt = {}) {
    const model = new Model(opt)
    return model
}