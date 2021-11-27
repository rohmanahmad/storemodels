'use strict'

// source: https://dbdiagram.io/d/61471a3f825b5b014608f160

const PostgresORM = require('postgresql-orm')

class Model extends PostgresORM {
    get tableName () {
        return 'location_list'
    }

    get schemas () {
        /* level 1 adalah kelurahan */
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
            ref_user_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            name: {
                type: String,
                stringType: 'bpchar',
                size: 100,
                isNullable: false
            },
            is_default: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: true
            },
            street_name: {
                type: String,
                stringType: 'bpchar',
                size: 100,
                isNullable: true
            },
            rt: {
                type: String,
                stringType: 'bpchar',
                size: 5,
                isNullable: true
            },
            rw: {
                type: String,
                stringType: 'bpchar',
                size: 5,
                isNullable: true
            },
            ref_location_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            recipest_name: { // nama penerima
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            recipest_phonenumber: { // nomor telp penerima
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            recipest_email: { // email penerima
                type: Text,
                stringType: 'text',
                size: 0,
                isNullable: false
            },
            is_trash: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: false
            },
            is_pending_approval: {
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
                keys: { id: -1 },
                uniq: true
            },
            is_trash: { // untuk sorting kebanyakan DESC
                keys: { is_trash: 1 },
                uniq: false
            },
            user_id: { // untuk sorting kebanyakan DESC
                keys: { ref_user_id: 1 },
                uniq: false
            },
            kecamatan_id: { // untuk sorting kebanyakan DESC
                keys: { ref_kecamatan_id: 1 },
                uniq: false
            },
            kab_kota_id: { // untuk sorting kebanyakan DESC
                keys: { ref_kab_kota_id: 1 },
                uniq: false
            },
            propinsi_id: { // untuk sorting kebanyakan DESC
                keys: { ref_propinsi_id: 1 },
                uniq: false
            },
            location_name: { // untuk sorting kebanyakan DESC
                keys: { location_name: 1 },
                uniq: false
            }
        }
    }

    get hasMany () {
        return {
        }
    }
    
    get hasOne () {
        return {
            garbages: {table: 'garbages', local: '_id', foreign: 'ref_id'},
            user_accounts: {table: 'user_accounts', local: 'ref_user_id', foreign: '_id'},
            location_list: {table: 'location_list', local: 'ref_location_id', foreign: '_id'},
        }
    }
}

module.exports = function (opt = {}) {
    const model = new Model(opt)
    return model
}