'use strict'

const PostgresORM = require('postgresql-orm')

class UKMListModel extends PostgresORM {
    get tableName () {
        return 'ukm_list'
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
            account_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            ukm_name: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            /* 
            Store Name dengan UKM Name berbeda penempatan,
            - UKM Name lebih mirip nama persahaan,
            - Store Name Lebih mirip dengan nama kios.
            - Bisa jadi 1 ukm mempunyai banyak nama toko (akan realisasi di kedepannya)
            */
            store_name: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            address_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            /* 
            Hasil Referensi dari model RateSummaryModel
            */
            stars_rate: {
                type: Number,
                stringType: 'float4',
                size: 0,
                isNullable: false
            },
            /* 
            available statuses:
             - 0 : inactive / pernament_blocked
             - 1 : active
             - 2 : pending approval
             - 3 : temp_blocked
            */
            ukm_status: {
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
            name: { // untuk searching
                keys: {ukm_name: -1},
                uniq: false
            },
            date: { // untuk sorting
                keys: {created_at: -1},
                uniq: false
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new UKMListModel(opt)
    return model
}