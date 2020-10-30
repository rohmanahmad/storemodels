'use strict'

const BaseModel = require('./__base')

class CustomerListModel extends BaseModel {
    constructor(instance) {
        super()
        this.instance = instance
    }

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
            customer_title: {
                type: String,
                stringType: 'bpchar',
                size: 10,
                isNullable: false
            }, // tuan, nyonya, agan, sista
            customer_fullname: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            is_verified: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false
            }, // verifikasi dilakukan untuk menentukan apakah real atau enggak
            verification_photo: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: false
            }, // foto bersama ktp untuk prosess verifikasi
            identity_no: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            }, // nomor ktp
            birth_date: {
                type: Date,
                stringType: 'date',
                size: 0,
                isNullable: false
            }, // tanggal tanpa jam
            birth_place: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: false
            }, // kota tempat lahir
            main_address_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            }, // relasi ke address_list.id
            secondary_address_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            }, // relasi ke address_list.id
            is_indonesia: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false
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

module.exports = function (instance = {}) {
    const model = new CustomerListModel(instance)
    return model
}