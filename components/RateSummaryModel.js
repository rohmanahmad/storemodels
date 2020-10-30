'use strict'

const BaseModel = require('./__base')

/*
    tabel ini tidak diubah secara langsung oleh pemilik maupun admin.
    ini otomatis diubah berdasarkan data dari review dan dihitung menggunakan formula
*/
class ProductRateSummary extends BaseModel {
    constructor(instance) {
        super()
        this.instance = instance
    }

    get tableName () {
        return 'rate_summary'
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
            rate_type: { // product, store or other
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            }, 
            product_id: {// foreign-key dari product_list
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            }, 
            ukm_id: {// foreign-key dari ukm_list
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            stars_level: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            }, // (type float8)
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
            product: {
                keys: {product_id: 1},
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

module.exports = function (instance = {}) {
    const model = new ProductRateSummary(instance)
    return model
}