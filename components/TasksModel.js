'use strict'

const PostgresORM = require('postgresql-orm')

class TasksModel extends PostgresORM {
    get tableName () {
        return 'tasks'
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
            /* 
            avaiable types:
                - email
                - whatsapp
                - telegram
                - sms
            */
            type: {
                type: String,
                stringType: 'bpchar',
                size: 20,
                isNullable: false
            },
            executor_name: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: true
            },
            // ip address dari eksekutor (tanda * untuk bebas pemilihan ip)
            executor_ip: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: true
            },
            // stringify data object
            data: {
                type: Object,
                stringType: 'json',
                size: 0,
                isNullable: true
            },
            is_trash: {
                type: Boolean,
                stringType: 'bool',
                size: 0,
                isNullable: false,
                default: false
            },
            // tanggal kapan seharusnya di eksekusi
            target_execution: {
                type: Date,
                stringType: 'timestamp',
                size: 0,
                isNullable: false
            },
            // tgl selesai di eksekusi (di isi oleh eksekutor)
            executed_at: {
                type: Date,
                stringType: 'timestamp',
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
            trash_status: {
                keys: {is_trash: -1},
                uniq: false
            },
            executor_ip: { // mencari dengan spesifik server ip
                keys: {executor_ip: -1},
                uniq: false
            },
            date: { // untuk sorting kebanyakan DESC
                keys: {created_at: -1}
            }
        }
    }
}

module.exports = function (opt = {}) {
    const model = new TasksModel(opt)
    return model
}