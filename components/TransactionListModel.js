'use strict'

// source: https://dbdiagram.io/d/61471a3f825b5b014608f160

const PostgresORM = require('postgresql-orm')

class Model extends PostgresORM {
    get tableName () {
        return 'transaction_list'
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
            ref_user_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            ref_store_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            /* 
            item_total: total semua item uniq
            */
            item_total: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: true
            },
            /* 
            item_qty_total: jumlah semua masing2 item dengan qty yg berbeda2
            */
            item_qty_total: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: true
            },
            /* 
            didapat dari seluruh sub total item pada detail trx
            */
            item_price_total: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: true
            },
            /* 
            seluruh jumlah keseluruhan discount
            */
            discount_total: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: true
            },
            /* 
            hasil pengurangan dari jumlah harga - jumlah discount
            */
            total_invoice: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: true
            },
            ref_address_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            ref_shipping_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            shipping_price: {
                type: Number,
                stringType: 'float4',
                size: 0,
                isNullable: false,
                default: 0
            },
            tgl_antar: {
                type: String,
                stringType: 'bpchar',
                size: 10, // 2020-01-01
                isNullable: true
            },
            jam_antar: { // khusus pengiriman dalam wilayah / pengiriman menggunakan kurir lokal
                type: String,
                stringType: 'bpchar',
                size: 5, // 20:00
                isNullable: true
            },
            tax_total: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: true
            },
            admin_fee: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: true
            },
            /* 
            statuses:
            pending, // (artinya, masih di keranjang)
            vendor_waiting, // pesanan masuk pada vendor, tp blm di terima (lagi offline)
            vendor_approved, // pesanan sudah di terima vendor, tp blm di packing
            packing, // selesai (sudah melakukan pembayaran, tp masih blm diterima barangnya)
            awaiting_product, // barang sedang dikirimkan, dan pelanggan masih menunggu barang belanjaan tsb
            success, // barang sudah di terima oleh pelanggan
            hold, // orderan tidak bisa di terima / di proses, krn status ini kemungkinan krn ada permintaan pelanggan untuk pengubahan orderan / alamat
            return, // barang dikembalikan atas beberapa alasan
            cancel, // pesanan di batalkan krn alasan tertentu
            */
            trx_status: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: true
            },
            changes_histories: {
                type: Text,
                stringType: 'text',
                size: 0,
                isNullable: true
            },
            payment_method: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: true
            },
            is_trash: {
                type: Boolean,
                stringType: 'boolean',
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
            trash_status: {
                keys: {is_trash: -1},
                uniq: false
            },
            ref_store_id: {
                keys: {ref_store_id: -1},
                uniq: false
            },
            user_id: {
                keys: {user_id: -1},
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
            address_list: {table: 'address_list', local: 'ref_address_id', foreign: '_id'},
            shipping_list: {table: 'shipping_list', local: 'ref_shipping_id', foreign: '_id'},
        }
    }
}

module.exports = function (opt = {}) {
    const model = new Model(opt)
    return model
}