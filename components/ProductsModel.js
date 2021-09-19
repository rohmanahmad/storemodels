'use strict'

const PostgresORM = require('postgresql-orm')

class ProductsModel extends PostgresORM {
    get tableName () {
        return 'product_list'
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
            store_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            // untuk product yg di embed
            // jika terisi, maka semua data akan di referensikan ke parent productnya
            /* 
            field yg akan di referensikan:
            - product_stock
            - product_status
            selebihnya bebas kreasi, untuk issue marketing, krn setiap marketing punya cara sendiri untuk memasarkan product tsb
            * harga akan selalu ngikuti sesuai dengan margin dan kesepakatan, apakah menggunakan persentase atau komisi
            */
            product_parent_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            estalase_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            category_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
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
                isNullable: false
            },
            price: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            discount: {
                type: Number,
                stringType: 'float4',
                size: 0,
                isNullable: false
            },
            stock: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            views_total: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: true
            },
            stars_rate: {
                type: Number,
                stringType: 'float4',
                size: 0,
                isNullable: true
            },
            tax: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: true
            },
            is_active: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: false
            },
            is_pending_review: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: true
            },
            is_blocked: {
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
            }
        }
    }

    get index () {
        return {
            primary: {
                keys: {_id: -1},
                uniq: true
            },
            category: { // digunakan untuk pencarian by category
                keys: {category_id: 1},
                uniq: false
            },
            location: { // digunakan untuk pencarian by location
                keys: {location_id: 1},
                uniq: false
            },
            product_name: { // digunakan untuk pencarian by keyword
                keys: {name: 1},
                uniq: false
            },
            is_trash: {
                keys: {is_trash: -1},
                uniq: false
            },
            is_pending_review: { // digunakan untuk pencarian by pending review
                keys: {is_pending_review: 1},
                uniq: false
            },
            is_blocked: { // digunakan untuk pencarian by blocked status
                keys: {is_blocked: 1},
                uniq: false
            },
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1},
                uniq: false
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new ProductsModel(opt)
    return model
}