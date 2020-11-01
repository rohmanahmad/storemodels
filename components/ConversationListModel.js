'use strict'

const PostgresORM = require('postgresql-orm')

class ConversationListModel extends PostgresORM {
    get tableName () {
        return 'conversation_list'
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
            conversation_date: {
                type: Date,
                stringType: 'date',
                size: 0,
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
                isNullable: false
            },
            customer_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
            },
            ukm_id: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false
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
            sorting_by_date: { // sort chat by date
                keys: {conversation_date: -1},
                uniq: false
            },
            chats: { // get chats conversation
                keys: {customer_id: 1, ukm_id: 1},
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