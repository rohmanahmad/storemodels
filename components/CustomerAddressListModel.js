'use strict'

// source: https://dbdiagram.io/d/61471a3f825b5b014608f160

const PostgresORM = require('postgresql-orm')

class AddressListModel extends PostgresORM {
    get tableName () {
        return 'address_list'
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
                isNullable: true
            },
            name: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
                // example: Home / Office / Apartement / Etc
            },
            is_default: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false
            },
            street_name: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: false
                // example: Jalan Simpang Sumatra
            },
            home_block: {
                type: String,
                stringType: 'bpchar',
                size: 5,
                isNullable: true
                // example: VIC / 6c
            },
            home_number: {
                type: Number,
                stringType: 'int4',
                size: 2,
                isNullable: true
                // example: 8 / 10 /100
            },
            location_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
                // relation to locations table
            },
            is_active: {
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
            recipest_name: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
                // relation to locations table
            },
            recipest_phonenumber: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
                // relation to locations table
            },
            recipest_email: {
                type: String,
                stringType: 'bpchar',
                size: 100,
                isNullable: true
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
            trash_status: {
                keys: {trash_status: -1},
                uniq: false
            },
            name: { // untuk mencari data autocomplete
                keys: {name: 1},
                uniq: false
            },
            trash: { // untuk mencari data autocomplete
                keys: {is_trash: 1},
                uniq: false
            },
            active: { // untuk mencari data autocomplete
                keys: {is_active: 1},
                uniq: false
            },
            location_id: { // untuk mencari data autocomplete
                keys: {location_id: 1},
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