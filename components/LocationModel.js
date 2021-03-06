'use strict'

const PostgresORM = require('postgresql-orm')

class LocationModel extends PostgresORM {
    get tableName () {
        return 'location_list'
    }

    get connection () {
        return 'pg'
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
            location_name: {
                type: String,
                stringType: 'bpchar',
                size: 100,
                isNullable: false
            },
            kecamatan_id: { // untuk location tidak perlu pakai md5
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            kab_kota_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            propinsi_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            postal_code: {
                type: Number,
                stringType: 'int4',
                size: 0,
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
            trash_status: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false,
                default: 0
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
            kecamatan_id: { // untuk sorting kebanyakan DESC
                keys: { kecamatan_id: 1 },
                uniq: false
            },
            kab_kota_id: { // untuk sorting kebanyakan DESC
                keys: { kab_kota_id: 1 },
                uniq: false
            },
            propinsi_id: { // untuk sorting kebanyakan DESC
                keys: { propinsi_id: 1 },
                uniq: false
            },
            location_name: { // untuk sorting kebanyakan DESC
                keys: { location_name: 1 },
                uniq: false
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new LocationModel(opt)
    return model
}