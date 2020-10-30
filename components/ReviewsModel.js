'use strict'

const BaseModel = require('./__base')

class ProductsModel extends BaseModel {
    constructor(instance) {
        super()
        this.instance = instance
    }

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
            ukm_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            }, // as foreign-key to ukm_list
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
                keys: {product_id: -1, ukm_id: 1, customer_id: 1},
                uniq: false
            },
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1}
            }
        }
    }
}

module.exports = function (instance = {}) {
    const model = new ProductsModel(instance)
    return model
}