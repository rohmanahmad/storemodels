'use strict'

// source: https://dbdiagram.io/d/61471a3f825b5b014608f160

const PostgresORM = require('postgresql-orm')

class ProductEmbededModel extends PostgresORM {
    get tableName () {
        return 'product_embeded'
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
                size: 40,
                isNullable: false
            },
            account_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            is_custom: {
                type: Boolean,
                stringType: 'boolean',
                size: 0,
                isNullable: false
            },
            custom_title: {
                type: String,
                stringType: 'bpchar',
                size: 50,
                isNullable: true
            },
            custom_description: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: true
            },
            custom_price: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: true
            },
            custom_price: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: true
            },
            is_trash: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: false
            },
            is_active: {
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
                keys: {is_trash: 1},
                uniq: false
            },
            account_id: {
                keys: {account_id: 1},
                uniq: false
            },
            uploader_id: {
                keys: {uploader_id: 1},
                uniq: false
            },
            by_uploader: {
                keys: {uploader_id: 1},
                uniq: false
            },
            by_index: {
                keys: {image_index: 1},
                uniq: false
            },
            // use for product_detail query
            product_list: {
                keys: {
                    product_id: 1,
                    image_status: -1,
                    index: 1
                },
                uniq: false
            },
            // use for product_detail query
            product_detail: {
                keys: {
                    product_id: 1,
                    image_status: -1
                },
                uniq: false
            },
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1},
                uniq: false
            }
        }
    }

    /* functions */
}

module.exports = function (opt = {}) {
    const model = new ProductEmbededModel(opt)
    return model
}