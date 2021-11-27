'use strict'

// source: https://dbdiagram.io/d/61471a3f825b5b014608f160

const PostgresORM = require('postgresql-orm')

class Model extends PostgresORM {
    get tableName () {
        return 'product_reviews'
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
                size: 20,
                isNullable: false
            },
            ref_customer_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            content: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: false
            },
            stars_level: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            is_published: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: false
            },
            is_pending: {
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
            },
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
            is_pending: {
                keys: {is_pending: 1},
                uniq: false
            },
            is_published: {
                keys: {is_published: 1},
                uniq: false
            },
            product: {
                keys: {ref_product_id: -1},
                uniq: false
            },
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1}
            }
        }
    }

    get hasMany () {
        return {
            product_review_attachments: {table: 'product_review_attachments', local: '_id', foreign: 'ref_review_id'}
        }
    }
    
    get hasOne () {
        return {
            garbages: {table: 'garbages', local: '_id', foreign: 'ref_id'},
            product_list: {table: 'product_list', local: 'ref_product_id', foreign: '_id'},
            customer_list: {table: 'customer_list', local: 'ref_customer_id', foreign: '_id'}
        }
    }
}

module.exports = function (opt = {}) {
    const model = new Model(opt)
    return model
}