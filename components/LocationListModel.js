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
            name: {
                type: String,
                stringType: 'bpchar',
                size: 100,
                isNullable: false
            },
            ref_propinsi_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            ref_kab_kota_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            ref_kecamatan_id: { // untuk location tidak perlu pakai md5
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            postal_code: {
                type: String,
                stringType: 'bpchar',
                size: 8,
                isNullable: true
            },
            latitude: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: true
            },
            longitude: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: true
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
            propinsi: {table: 'location_list', local: 'ref_propinsi_id', foreign: 'ref_id'},
            kabupaten_kota: {table: 'location_list', local: 'ref_kab_kota_id', foreign: 'ref_id'},
            kecamatan: {table: 'location_list', local: 'ref_kecamatan_id', foreign: 'ref_id'},
        }
    }
}

module.exports = function (opt = {}) {
    const model = new Model(opt)
    return model
}