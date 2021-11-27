'use strict'

// source: https://dbdiagram.io/d/61471a3f825b5b014608f160

const PostgresORM = require('postgresql-orm')

class Model extends PostgresORM {
    get tableName () {
        return 'user_activities'
    }

    get schemas () {
        // user account bisa seorang pemilik ukm atau seorang customer (jadi satu)
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
            zone: {
                type: String,
                stringType: 'bpchar',
                size: 10,
                isNullable: true
            },
            method: {
                type: String,
                stringType: 'bpchar',
                size: 10,
                isNullable: true
            },
            url: {
                type: Text,
                stringType: 'text',
                size: 0,
                isNullable: false
            },
            url_hash: { // md5 hash
                type: String,
                stringType: 'bpchar',
                size: 100,
                isNullable: false
            },
            ref_token_id: { // user_tokens._id
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            server_ip: { // server worker ip
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            from_ip: { // ip address pengguna
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            ref_user_id: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false
            },
            data: {
                type: Text,
                stringType: 'text',
                size: 0,
                isNullable: true
            },
            time_request: {
                type: Date,
                stringType: 'timestamp',
                size: 0,
                isNullable: false
            },
            time_response: {
                type: Date,
                stringType: 'timestamp',
                size: 0,
                isNullable: false
            },
            total_response_time: {
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
                keys: {is_trash: -1},
                uniq: false
            },
            total_response_time: {
                keys: {total_response_time: -1},
                uniq: false
            },
            created_date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1},
                uniq: false
            }
        }
    }

    get hasMany () {
        return {
            ref_token_id: {table: 'user_tokens', local: 'ref_token_id', foreign: '_id'},
            ref_user_id: {table: 'user_accounts', local: 'ref_user_id', foreign: '_id'},
        }
    }
    
    get hasOne () {
        return {
            garbages: {table: 'garbages', local: '_id', foreign: 'ref_id'}
        }
    }
}

module.exports = function (opt = {}) {
    const model = new Model(opt)
    return model
}