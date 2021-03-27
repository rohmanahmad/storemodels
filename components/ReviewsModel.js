'use strict'

const PostgresORM = require('postgresql-orm')

class ReviewsModel extends PostgresORM {
    get tableName () {
        return 'reviews'
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
            /* available groups: product, ukm,  */
            review_group: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            /* reerence to product_table or ukm or others */
            reference_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            }, // as foreign-key to product_list
            // untuk review tidak memerlukan ukm_id, krn secara default, ukm tidak bisa tulis review, hanya bisa reply aja.
            // untuk penanganan menggunakan product_id
            customer_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            }, // as foreign-key to customer_list
            review_text: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: false
            }, // dibatasi 255 karakter
            review_status: {
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
            },
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
            product: { // mencari review by productid dan customerid serta ukmid
                keys: {reference_id: -1, customer_id: 1},
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