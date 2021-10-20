'use strict'

// source: https://dbdiagram.io/d/61471a3f825b5b014608f160

const PostgresORM = require('postgresql-orm')

class ProductCategoryList extends PostgresORM {
    get tableName () {
        return 'product_category_list'
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
            // yaitu parentid masih dari tabel yg sama
            parent_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            image_gallery_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            name: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            description: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: true
            },
            is_active: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: true
            },
            is_trash: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: true
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
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1}
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new ProductCategoryList(opt)
    return model
}