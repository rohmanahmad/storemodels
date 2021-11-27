'use strict'

const PostgresORM = require('postgresql-orm')

class RequestChangesModel extends PostgresORM {
    get tableName () {
        return 'request_changes'
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
            /* available types: phonenumber, email, dll */
            request_type: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            /* 
            available ref:
                - user._id
                - customer._id
                - etc
             */
            reference_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: false
            }, // as foreign-key to product_list
            // untuk review tidak memerlukan ukm_id, krn secara default, ukm tidak bisa tulis review, hanya bisa reply aja.
            // untuk penanganan menggunakan product_id
            old_data: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: true
            }, // as foreign-key to customer_list
            new_data: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: true
            },
            // approval types: [automatic, confirmation, admin]
            approval_type: {
                type: String,
                stringType: 'bpchar',
                size: 0,
                isNullable: false
            },
            // confirmation types: [sms, email, whatsapp]
            confirmation_type: {
                type: String,
                stringType: 'bpchar',
                size: 6,
                isNullable: false
            },
            confirmation_code: {
                type: String,
                stringType: 'bpchar',
                size: 6,
                isNullable: false
            },
            /* 
            approval_status: 
            - 0 : rejected
            - 1 : approved
            - 2 : pending
            - 3 : cancel
             */
            approval_status: {
                type: Number,
                stringType: 'int4',
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
            },
        }
    }

    get index () {
        return {
            primary: {
                keys: {_id: -1},
                uniq: true
            },
            approval_status: {
                keys: {approval_status: -1},
                uniq: false
            },
            type_and_ref: {
                keys: {reference_id: 1, request_type: 1},
                uniq: false
            },
            date: {
                keys: {created_at: -1}
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new RequestChangesModel(opt)
    return model
}