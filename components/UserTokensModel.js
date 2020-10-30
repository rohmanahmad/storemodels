'use strict'

const BaseModel = require('./__base')

class UserTokensModel extends BaseModel {
    constructor(instance) {
        super()
        this.instance = instance
    }

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
            user_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            }, // >> user_accounts.id
            token: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: false
            }, // text hash
            expired: {
                type: Date,
                stringType: 'timestamp',
                size: 0,
                isNullable: false
            }, // expired date in time 
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
                isNullable: false
            }
        }
    } 

    get index () {
        return {
            primary: {
                keys: {id: -1},
                uniq: true
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

module.exports = function (instance = {}) {
    const model = new UserTokensModel(instance)
    return model
}