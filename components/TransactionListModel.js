'use strict'

const PostgresORM = require('postgresql-orm')

class TransactionListModel extends PostgresORM {
    get tableName () {
        return 'transaction_list'
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
            user_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            },
            ukm_id: {
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
            address_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            shipping_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            shipping_price: {
                type: Number,
                stringType: 'int4',
                size: 0,
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
            0: 'pending', // (artinya, masih di keranjang)
            1: 'vendor_waiting', // pesanan masuk pada vendor, tp blm di terima (lagi offline)
            2: 'vendor_approved', // pesanan sudah di terima vendor, tp blm di packing
            3: 'packing', // selesai (sudah melakukan pembayaran, tp masih blm diterima barangnya)
            4: 'awaiting_product', // barang sedang dikirimkan, dan pelanggan masih menunggu barang belanjaan tsb
            5: 'success', // barang sudah di terima oleh pelanggan
            6: 'hold', // orderan tidak bisa di terima / di proses, krn status ini kemungkinan krn ada permintaan pelanggan untuk pengubahan orderan / alamat
            50: 'return', // barang dikembalikan atas beberapa alasan
            60: 'cancel', // pesanan di batalkan krn alasan tertentu
            */
            trx_status: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: true
            },
            changes_histories: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: true
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
            ukm_id: {
                keys: {ukm_id: -1},
                uniq: false
            },
            active_trx: {
                keys: {user_id: -1, trx_status: 1},
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
    const model = new TransactionListModel(opt)
    return model
}