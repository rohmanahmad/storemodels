'use strict'

const BaseModel = require('./__base')

class UKMListModel extends BaseModel {
    constructor(opts) {
        super()
        this.opts = opts
    }

    get tableName () {
        return 'ukm_list'
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
            account_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            }, // relasi ke transactions.id
            ukm_name: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            }, // relase ke product_list.id
            store_name: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            address_id: {
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
            name: { // untuk searching
                keys: {ukm_name: -1},
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
    const model = new UKMListModel(opt)
    return model
}