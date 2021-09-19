'use strict'

const PostgresORM = require('postgresql-orm')

class CustomerListModel extends PostgresORM {
    get tableName () {
        return 'customer_list'
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
            // nick_name (nama panggilan)
            nick_name: {
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
            verification_photo_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            profile_photo_id: {
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
}

module.exports = function (opt = {}) {
    const model = new CustomerListModel(opt)
    return model
}