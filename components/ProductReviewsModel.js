'use strict'

const PostgresORM = require('postgresql-orm')

class ReviewsModel extends PostgresORM {
    get tableName () {
        return 'product_reviews'
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
            _id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            product_id: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            customer_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            text: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: false
            },
            gallery_id_1: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
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
                keys: {product_id: -1},
                uniq: false
            },
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1}
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new ReviewsModel(opt)
    return model
}