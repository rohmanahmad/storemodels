'use strict'

const PostgresORM = require('postgresql-orm')

class ProductsModel extends PostgresORM {
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
            product_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            }, // as foreign-key to product_list
            // untuk review tidak memerlukan ukm_id, krn secara default, ukm tidak bisa tulis review, hanya bisa reply aja.
            // untuk penanganan menggunakan product_id
            customer_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            }, // as foreign-key to customer_list
            review_text: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: false
            }, // dibatasi 255 karakter
            review_images_url: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: false
            }, // dipisahkan tanda koma. metok 4 images
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
            },
        }
    }

    get index () {
        return {
            primary: {
                keys: {id: -1},
                uniq: true
            },
            product: { // mencari review by productid dan customerid serta ukmid
                keys: {product_id: -1, customer_id: 1},
                uniq: false
            },
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1}
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new ProductsModel(opt)
    return model
}