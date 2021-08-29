'use strict'

const PostgresORM = require('postgresql-orm')

/*
    tabel ini tidak diubah secara langsung oleh pemilik maupun admin.
    ini otomatis diubah berdasarkan data dari review dan dihitung menggunakan formula
*/
class RateSummaryModel extends PostgresORM {
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
            _id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            rate_type: { // product, store or other
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            }, 
            reference_id: {// product_id, ukm_id, etc
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            stars_level: {
                type: Number,
                stringType: 'float4',
                size: 0,
                isNullable: false
            }, // (type float8)
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
            }
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
            product: {
                keys: {reference_id: 1},
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
    const model = new RateSummaryModel(opt)
    return model
}