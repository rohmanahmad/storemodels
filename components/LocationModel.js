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
            location_name: {
                type: String,
                stringType: 'bpchar',
                size: 100,
                isNullable: false
            },
            kecamatan_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            kab_kota_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            propinsi_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
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