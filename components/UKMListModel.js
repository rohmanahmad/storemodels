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
            name: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            address_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            description: {
                type: String,
                stringType: 'bpchar',
                size: 200,
                isNullable: true
            },
            is_active: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: true
            },
            is_pending_approval: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: false
            },
            is_temp_blocked: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: false
            },
            is_blocked: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: false
            },
            is_trash: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: false
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
            is_trash: {
                keys: {is_trash: 1},
                uniq: false
            },
            is_active: {
                keys: {is_active: 1},
                uniq: false
            },
            is_pending_approval: {
                keys: {is_pending_approval: 1},
                uniq: false
            },
            is_temp_blocked: {
                keys: {is_temp_blocked: 1},
                uniq: false
            },
            is_blocked: {
                keys: {is_blocked: 1},
                uniq: false
            },
            name: { // untuk searching
                keys: {name: -1},
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