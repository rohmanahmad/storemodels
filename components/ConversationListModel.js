'use strict'

const PostgresORM = require('postgresql-orm')

class ConversationListModel extends PostgresORM {
    get tableName () {
        return 'conversation_list'
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
            conversation_content: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: false
            },
            conversation_attachment: {
                type: String,
                stringType: 'text',
                size: 0,
                isNullable: true
            },
            customer_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            admin_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            ukm_id: {
                type: String,
                stringType: 'bpchar',
                size: 40,
                isNullable: true
            },
            conversation_status: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            trash_status: {
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
                keys: {trash_status: -1},
                uniq: false
            },
            chats1: { // get chats conversation
                keys: {customer_id: 1, ukm_id: 1},
                uniq: false
            },
            chats2: { // get chats conversation
                keys: {customer_id: 1, admin_id: 1},
                uniq: false
            },
            chats3: { // get chats conversation
                keys: {admin_id: 1, ukm_id: 1},
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
    const model = new ConversationListModel(opt)
    return model
}