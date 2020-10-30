'use strict'

const BaseModel = require('./__base')

class CategoriesModel extends BaseModel {
    constructor(instance) {
        super()
        this.instance = instance
    }

    get tableName () {
        return 'category_list'
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
            parent_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            }, // yaitu parentid masih dari tabel yg sama
            category_name: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            category_description: {
                type: String,
                stringType: 'text',
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
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1}
            }
        }
    }
}

module.exports = function (instance = {}) {
    const model = new CategoriesModel(instance)
    return model
}