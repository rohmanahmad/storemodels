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
            }, // relasi ke transactions.id
            ukm_name: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            }, // relase ke product_list.id
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
            stars_rate: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
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