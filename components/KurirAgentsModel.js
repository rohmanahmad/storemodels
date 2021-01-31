'use strict'

const PostgresORM = require('postgresql-orm')

class KurirAgentsModel extends PostgresORM {
    get tableName () {
        return 'kurir_agent'
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
            user_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            company_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            agent_firstname: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            agent_lastname: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: true
            },
            profile_gallery_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            // kurir id / hanya untuk kurir lokal aja. jika kurir luar, akan ditulis global
            address_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            // reputation : 0 - 5
            reputation: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: true
            },
            /* 
            * - 0 : nonactive / need confirmation
            * - 1 : active / available
            * - 2 : banned / not available in time period
            * - 3 : blocked / black list / not-available 
            */
            status: {
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
            search_by_name: {
                keys: {agent_firstname: 1},
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
    const model = new KurirAgentsModel(opt)
    return model
}