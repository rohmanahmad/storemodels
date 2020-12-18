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
            user_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: true
            },
            /* 
            item_total: semua item uniq
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
            /* 
            statuses:
            0: pending (artinya, masih di keranjang)
            1: (on-packing) selesai (sudah melakukan pembayaran, tp masih blm diterima barangnya)
            2: (awaiting) barang sedang dikirimkan, dan pelanggan masih menunggu barang belanjaan tsb
            3: (success) barang sudah di terima oleh pelanggan
            50: (return) barang dikembalikan atas beberapa alasan
            60: (cancel) pesanan di batalkan krn alasan tertentu
            */
            trx_status: {
                type: Number,
                stringType: 'int4',
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
                keys: {id: -1},
                uniq: true
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