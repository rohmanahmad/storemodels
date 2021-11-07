'use strict'

const PostgresORM = require('postgresql-orm')

class TrackingOrdeModel extends PostgresORM {
    get tableName () {
        return 'tracking_order'
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
            trx_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            // kurir id / hanya untuk kurir lokal aja. jika kurir luar, akan ditulis global
            agent_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            progress_status: {
                type: String,
                stringType: 'bpchar',
                size: 40,
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
            search_by_trx: {
                keys: {trx_id: 1},
                uniq: false
            },
            search_by_kurir: {
                keys: {trx_id: 1},
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
    const model = new TrackingOrdeModel(opt)
    return model
}