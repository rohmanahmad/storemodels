'use strict'

const PostgresORM = require('postgresql-orm')

class TasksModel extends PostgresORM {
    get tableName () {
        return 'tasks'
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
            executor_ip: {
                type: String,
                stringType: 'bpchar',
                size: 30,
                isNullable: true
            },
            data: {
                type: Object,
                stringType: 'json',
                size: 0,
                isNullable: true
            },
            trash_status: {
                type: Number,
                stringType: 'int4',
                size: 0,
                isNullable: false,
                default: 0
            },
            target_execution: {
                type: Date,
                stringType: 'timestamp',
                size: 0,
                isNullable: false
            },
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
                keys: {trash_status: -1},
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