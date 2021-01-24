'use strict'

const PostgresORM = require('postgresql-orm')

class CategoriesModel extends PostgresORM {
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
            _id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            category_type: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            },
            parent_id: { // untuk ini biarkan memakai Id (number) krn jarang di lakukan oleh user secara langsung
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            }, // yaitu parentid masih dari tabel yg sama
            category_gallery_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
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
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1}
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new CategoriesModel(opt)
    return model
}