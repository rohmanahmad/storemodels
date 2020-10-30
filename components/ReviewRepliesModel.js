'use strict'

const BaseModel = require('./__base')

class ProductReviewRepliesModel extends BaseModel {
    constructor(instance) {
        super()
        this.instance = instance
    }

    get tableName () {
        return 'review_replies'
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
            review_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            }, // relasi ke product_review.id
            customer_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            }, // relasi ke customer.id
            ukm_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            }, // relasi ke ukm.id
            reply_text: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: false
            },
            reply_images_url: {
                type: String,
                stringType: 'text',
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
            review_id: { // sort chat by date
                keys: {review_id: -1},
                uniq: false
            },
            date: { // untuk sorting
                keys: {created_at: -1},
                uniq: false
            }
        }
    }
}

module.exports = function (instance = {}) {
    const model = new ProductReviewRepliesModel(instance)
    return model
}