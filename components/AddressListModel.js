'use strict'

const PostgresORM = require('postgresql-orm')

class AddressListModel extends PostgresORM {
    get tableName () {
        return 'address_list'
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
            user_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            is_default: {
                type: Number,
                stringType: 'int4',
                size: 1,
                isNullable: false
            },
            address_name: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
                // example: Home / Office / Apartement / Etc
            },
            address_street_name: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: false
                // example: Jalan Simpang Sumatra
            },
            address_home_block: {
                type: String,
                stringType: 'bpchar',
                size: 5,
                isNullable: false
                // example: VIC / 6c
            },
            address_home_number: {
                type: Number,
                stringType: 'int4',
                size: 2,
                isNullable: false
                // example: 8 / 10 /100
            },
            location_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
                // relation to locations table
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
            name: { // untuk mencari data autocomplete
                keys: {address_name: 1},
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
    const model = new AddressListModel(opt)
    return model
}