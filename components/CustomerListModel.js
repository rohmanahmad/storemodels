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
            customer_title: {
                type: String,
                stringType: 'bpchar',
                size: 10,
                isNullable: true
            }, // tuan, nyonya, agan, sista
            customer_firstname: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: true
            },
            customer_lastname: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: true
            },
            is_verified: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false
            },
            // verifikasi dilakukan untuk menentukan apakah real atau enggak
            // foto bersama ktp untuk prosess verifikasi
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
            identity_no: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: true
            }, // nomor ktp
            birth_date: {
                type: Date,
                stringType: 'date',
                size: 0,
                isNullable: true
            }, // tanggal tanpa jam
            birth_place: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: true
            }, // kota tempat lahir
            main_address_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            }, // relasi ke address_list.id
            secondary_address_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            }, // relasi ke address_list.id
            is_indonesia: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: true
            }, // ktp indonesia atau bukan
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
            identity: { // untuk mencari data berdasarkan no ktp/sim/passport
                keys: {identity_no: 1},
                uniq: true
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