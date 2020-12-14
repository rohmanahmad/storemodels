'use strict'

const PostgresORM = require('postgresql-orm')

/*
    tabel ini tidak diubah secara langsung oleh pemilik maupun admin.
    ini otomatis diubah berdasarkan data dari review dan dihitung menggunakan formula
*/
class ProductRateSummary extends PostgresORM {
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
                isNullable: true
            }, 
            ukm_id: {// foreign-key dari ukm_list
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: true
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
                isNullable: true
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

module.exports = function (opt = {}) {
    const model = new ProductRateSummary(opt)
    return model
}