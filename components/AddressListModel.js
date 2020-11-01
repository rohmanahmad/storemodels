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
            address_name: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            address_street: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: false
            },
            address_province: {
                type: String,
                stringType: 'bpchar',
                size: 50,
                isNullable: false
            },
            address_city: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            address_kecamatan: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            address_kelurahan: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            address_postal_code: {
                type: String,
                stringType: 'bpchar',
                size: 10,
                isNullable: false
            },
            ukm_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            }, // relasi ke ukm.id
            customer_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            }, // relasi ke customer.id
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