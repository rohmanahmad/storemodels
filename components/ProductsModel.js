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
            ukm_id: {
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
            product_reference_id: {
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
            }, // foreign-key dari category_list
            product_name: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            product_description: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: false
            },
            product_price: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            /**
             * status: Number
             * - 0 : inactive
             * - 1 : active
             * - 2 : pending_review
             */
            product_status: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            product_discount: {
                type: Number,
                stringType: 'float4',
                size: 0,
                isNullable: false
            },
            product_stock: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            product_views_total: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: true
            },
            product_stars_rate: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: true
            },
            product_tax: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: true
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
            productname: { // digunakan untuk pencarian by keyword
                keys: {product_name: 1},
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