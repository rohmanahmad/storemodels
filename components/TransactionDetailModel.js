'use strict'

const PostgresORM = require('postgresql-orm')

class TransactionDetailModel extends PostgresORM {
    get tableName () {
        return 'transaction_detail'
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
            trx_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            }, // relasi ke transactions.id
            trx_product_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            }, // relase ke product_list.id
            trx_locked_name: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            trx_locked_price: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            trx_locked_image_urls: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: false
            }, // url didapat dari copy dari product images
            trx_locked_discount: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            trx_qty: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            trx_sub_total: {
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
                keys: {id: -1},
                uniq: true
            },
            date: { // untuk sorting
                keys: {created_at: -1},
                uniq: false
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new TransactionDetailModel(opt)
    return model
}