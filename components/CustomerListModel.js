'use strict'

const PostgresORM = require('postgresql-orm')

class Model extends PostgresORM {
    get tableName () {
        return 'customer_list'
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
            ref_user_id: { // user_accounts._id
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            // title (tuan, nyonya, agan, sista)
            title: {
                type: String,
                stringType: 'bpchar',
                size: 10,
                isNullable: true
            },
            first_name: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: true
            },
            last_name: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: true
            },
            /*
             * verification_photo_id:
             * verifikasi dilakukan untuk menentukan apakah real atau enggak
             * foto bersama ktp untuk prosess verifikasi
             */
            ref_verification_photo_id: { // files._id
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            ref_profile_photo_id: { // files._id
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            // identity_type (ktp/passport/sim/dll)
            identity_type: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: true
            },
            // identity_number (nomor identitas)
            identity_number: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: true
            },
            // birth_date (tanggal tanpa jam)
            birth_date: {
                type: Date,
                stringType: 'date',
                size: 0,
                isNullable: true
            },
            // birth_place (kota tempat lahir)
            birth_place: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: true
            },
            // is_indonesia (ktp indonesia atau bukan)
            is_indonesia: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: true
            },
            // is_verified (verifikasi menggunakan ktp dan foto bersama ktp)
            is_verified: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false
            },
            is_active: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false
            },
            is_temp_blocked: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false
            },
            is_blocked: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false
            },
            is_trash: {
                type: Boolean,
                stringType: 'bool',
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
                keys: {_id: -1},
                uniq: true
            },
            account_id: {
                keys: {ref_user_id: -1},
                uniq: true
            },
            is_trash: {
                keys: {is_trash: -1},
                uniq: false
            },
            is_active: {
                keys: {is_active: -1},
                uniq: false
            },
            is_blocked: {
                keys: {is_blocked: -1},
                uniq: false
            },
            is_temp_blocked: {
                keys: {is_temp_blocked: -1},
                uniq: false
            },
            is_verified: { // untuk mencari data yg terverifikasi dan blm
                keys: {is_verified: -1},
                uniq: false
            },
            date: { // untuk sorting
                keys: {created_at: -1},
                uniq: false
            }
        }
    }

    get hasMany () {
        return {
        }
    }
    
    get hasOne () {
        return {
            garbages: {table: 'garbages', local: '_id', foreign: 'ref_id'},
            user_accounts: {table: 'user_accounts', local: 'ref_user_id', foreign: '_id'},
            ref_verification_photo_id: {table: 'verification_images', local: 'ref_verification_photo_id', foreign: '_id'},
            ref_profile_photo_id: {table: 'files', local: 'ref_profile_photo_id', foreign: '_id'},
            ref_main_address_id: {table: 'address_list', local: 'ref_main_address_id', foreign: '_id'},
        }
    }
}

module.exports = function (opt = {}) {
    const model = new Model(opt)
    return model
}