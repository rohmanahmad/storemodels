'use strict'

const BaseModel = require('./__base')

class TransactionDetailModel extends BaseModel {
    constructor(instance) {
        super()
        this.instance = instance
    }

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
            transaction_id: {
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
                isNullable: false
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

module.exports = function (instance = {}) {
    const model = new TransactionDetailModel(instance)
    return model
}