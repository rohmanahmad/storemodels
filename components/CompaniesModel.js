'use strict'

const PostgresORM = require('postgresql-orm')

class CompaniesModel extends PostgresORM {
    get tableName () {
        return 'company_list'
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
            company_name: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            address_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            // kurir id / hanya untuk kurir lokal aja. jika kurir luar, akan ditulis global
            reputation: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: true
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
                keys: {company_name: 1},
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
    const model = new CompaniesModel(opt)
    return model
}