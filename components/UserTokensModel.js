'use strict'

const PostgresORM = require('postgresql-orm')

class UserTokensModel extends PostgresORM {
    get tableName () {
        return 'user_tokens'
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
            }, // >> user_accounts.id
            token: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: false
            }, // text hash
            data: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: true
            }, // text hash
            expired_in: {
                type: Date,
                stringType: 'timestamp',
                size: 0,
                isNullable: false
            }, // expired date in time 
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
            trash_status: {
                keys: {trash_status: -1},
                uniq: false
            },
            token_active: { // digunakan untuk get token by userid
                keys: {user_id: 1, expired: -1},
                uniq: false
            },
            token_inactive: { // digunakan untuk menghapus token yg tidak diperlukan lagi
                keys: {expired: 1},
                uniq: false
            },
            created_date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1},
                uniq: false
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new UserTokensModel(opt)
    return model
}