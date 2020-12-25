'use strict'

const PostgresORM = require('postgresql-orm')

class ImagesGalleryModel extends PostgresORM {
    get tableName () {
        return 'images_gallery'
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
            second_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            }, // foreign-key dari product_list
            /* 
            available type:
                - product
                - profile-avatar
                - profile-wallpaper
                - store-avatar
                - category
            */
            image_type: {
                type: String,
                stringType: 'bpchar',
                size: 10,
                isNullable: false
            },
            /* 
            image_group: 
                - thumbnail
            */
            image_group: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: true
            },
            image_name: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            }, // akan di tempatkan pada alt di tag <img>
            image_url: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: false
            }, // dipisahkan koma. dibatasi max 4 image
            image_index: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            }, // mulai dari 0: defautl 1 gambar ke2 dst
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
            second: {
                keys: {second_id: 1},
                uniq: false
            },
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1},
                uniq: false
            }
        }
    }

    /* functions */
}

module.exports = function (opt = {}) {
    const model = new ImagesGalleryModel(opt)
    return model
}