'use strict'

const PostgresORM = require('postgresql-orm')

class UKMSummariesModel extends PostgresORM {
    get tableName () {
        return 'ukm_summaries'
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
            total_partners: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            total_owned_products: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            total_embed_products: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            total_success_trx: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            total_pending_trx: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            total_cancel_trx: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            rate_trx_7days_ago: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            total_customer_reports: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            total_members: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            rate_chats_7days_ago: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            slowest_response_time: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            fastest_response_time: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
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
            ukm_id: { // digunakan untuk pencarian by keyword
                keys: {ukm_id: 1},
                uniq: true
            },
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1},
                uniq: false
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new UKMSummariesModel(opt)
    return model
}