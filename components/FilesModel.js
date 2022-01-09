'use strict'

// source: https://dbdiagram.io/d/61471a3f825b5b014608f160

const PostgresORM = require('postgresql-orm')

class Model extends PostgresORM {
    get tableName () {
        return 'files'
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
            ref_owner_id: { // relasi bisa office_users atau user_accounts
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            ref_uploader_id: { // user_accounts._id
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true // pilih salah satu antara ref_uploader_id atau ref_uploader_office_id
            },
            ref_uploader_office_id: { // office_users._id
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true // pilih salah satu antara ref_uploader_id atau ref_uploader_office_id
            },
            title: {
                type: String,
                stringType: 'bpchar',
                size: 100,
                isNullable: false
            },
            file_hash: { // md5 hash
                type: String,
                stringType: 'bpchar',
                size: 200,
                isNullable: false
            },
            file_type: { // image/jpeg, image/png text/plain text/pdf dll
                type: String,
                stringType: 'bpchar',
                size: 100,
                isNullable: false
            },
            file_size: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: true
            },
            server_ip: {
                type: String,
                stringType: 'bpchar',
                size: 50,
                isNullable: false
            },
            domain: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: true
            },
            folder_base: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: true
            },
            file_name: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: true
            },
            is_public: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: true
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
                keys: {is_trash: -1},
                uniq: false
            },
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1}
            }
        }
    }

    get hasMany () {
        return {
            ref_owner_id: {table: 'user_accounts', local: 'ref_owner_id', foreign: '_id'},
            ref_uploader_id: {table: 'user_accounts', local: 'ref_uploader_id', foreign: '_id'},
            ref_uploader_office_id: {table: 'office_users', local: 'ref_uploader_office_id', foreign: '_id'}
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