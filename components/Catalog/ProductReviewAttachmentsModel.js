'use strict'

const PostgresORM = require('postgresql-orm')

class ProductReviewAttachments extends PostgresORM {
    get tableName () {
        return 'product_review_attachments'
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
            },
            attachment_type: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false // image / video
            },
            attachment_url: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: false
            },
            attachment_folder_path: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: false
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
            is_trash: {
                keys: {is_trash: -1},
                uniq: false
            },
            created_date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1},
                uniq: false
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new ProductReviewAttachments(opt)
    return model
}