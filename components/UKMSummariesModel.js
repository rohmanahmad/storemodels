'use strict'

// source: https://dbdiagram.io/d/61471a3f825b5b014608f160

const PostgresORM = require('postgresql-orm')

class Model extends PostgresORM {
    get tableName () {
        return 'ukm_summaries'
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
            ref_ukm_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            total_partners: { // total kontrak dropshippers atau resellers
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false,
                default: 0
            },
            total_owned_products: { // total produk yg dimiliki di semua store
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false,
                default: 0
            },
            total_embed_products: { // total product yang di embed para dropshipper/reseller
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false,
                default: 0
            },
            total_success_trx: { // total transaksi yg sudah berhasil / pelanggan diterima dan tidak ada complain
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false,
                default: 0
            },
            total_pending_trx: { // transaksi yg masih tahap pengiriman, atau review atau sedang di proses
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false,
                default: 0
            },
            total_cancel_trx: { // transaksi yang di batalkan oleh pihak ukm ataupun pelanggan
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false,
                default: 0
            },
            rate_trx_7days_ago: { // rata2 transaksi (semua, pending/sukses dalam 7 hari kebelakang)
                type: Number,
                stringType: 'float4',
                size: 0,
                isNullable: false,
                default: 0
            },
            total_customer_reports: { // customer yang mereport ukm tsb dengan alasan yg diterima oleh admin
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false,
                default: 0
            },
            total_members: { // jumlah pelanggan yg subscribe
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false,
                default: 0
            },
            rate_chats_7days_ago: { // rata2 percakapan dalam 7 hari kebelakang
                type: Number,
                stringType: 'float4',
                size: 0,
                isNullable: false,
                default: 0
            },
            slowest_response_time: { // waktu respon percakapan terlama dijam kerja
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false,
                default: 0
            },
            fastest_response_time: { // waktu respon percakapan tercepat dijam kerja
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false,
                default: 0
            },
            rate_response_time: { // rata2 waktu respon percakapan dijam kerja
                type: Number,
                stringType: 'float4',
                size: 0,
                isNullable: false,
                default: 0
            },
            is_trash: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: false
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
                keys: {is_trash: -1},
                uniq: false
            },
            ukm_id: { // digunakan untuk pencarian by keyword
                keys: {ref_ukm_id: 1},
                uniq: true
            },
            date: { // untuk sorting kebanyakan DESC
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
            ukm_list: {table: 'ukm_list', local: 'ukm_id', foreign: '_id'},
        }
    }
}

module.exports = function (opt = {}) {
    const model = new Model(opt)
    return model
}