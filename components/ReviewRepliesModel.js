'use strict'

const PostgresORM = require('postgresql-orm')

class ReviewRepliesModel extends PostgresORM {
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
            _id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            review_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            }, // relasi ke product_review.id
            customer_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            }, // relasi ke customer.id
            ukm_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
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
                isNullable: true
            },
            reply_status: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            trash_status: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false,
                default: 0
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
            trash_status: {
                keys: {trash_status: -1},
                uniq: false
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

module.exports = function (opt = {}) {
    const model = new ReviewRepliesModel(opt)
    return model
}