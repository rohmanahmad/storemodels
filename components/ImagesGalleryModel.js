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
            account_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            uploader_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            is_public: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false
            },
            /* 
            available type:
                - product
                - profile-avatar
                - profile-wallpaper
                - store-avatar
                - category
                - verification-photo
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
                - original
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
            by_account: {
                keys: {account_id: 1},
                uniq: false
            },
            by_uploader: {
                keys: {uploader_id: 1},
                uniq: false
            },
            by_type: {
                keys: {image_type: 1},
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