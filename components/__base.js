'use strict'

const {Pool} = require('pg')
const connectionPool = new Pool({
    connectionString: process.env.POSTGRESQL_DSN
})
const acceptedOperators = [
    '$eq',
    '$lt',
    '$lte',
    '$gt',
    '$gte',
    '$in',
    '$or',
    '$and'
]
const operatorsMap = {
    '$eq': '=',
    '$lt': '<',
    '$lte': '<=',
    '$gt': '>',
    '$gte': '>='
}

class Builder {
    constructor () {
        this.t_select = []
        this.t_keys = {} // untuk indexing berisi key {'user_name': '$1', 'user_email': '$2']
        this.t_where_and = []
        this.t_where_or = []
        this.t_join = []
        this.t_limit = 0
        this.t_offset = 0
    }
    /* only calling from internal class not public */
    /**
     * @param {string} key 
     */
    addKey (key = '') {
        if (!this.t_keys[key]) this.t_keys[key] = `$${Object.keys(this.t_keys).length}`
    }

    getAllkeys () {
        return Object.keys(this.schemas)
    }

    select (keys = ['*']) {
        this.is_select_query = true // untuk pengecekan dari builder
        const allKeys = this.getAllkeys()
        for (const k of keys) {
            if (k === '*' || allKeys.indexOf(k) > -1) {
                this.t_select.push(k)
            }
        }
        return this
    }
    /**
     * @param {string} key 
     * @param {*} value 
     */  
    where (object = {}) {
        const type = 'and'
        for (const key in object) {
            let value = object[key]
            if (key && value) {
                if (typeof value === 'object') {
                    // cek apakah sesuai dengan acceptedOperators
                    const opType = Object.keys(value)[0]
                    if (acceptedOperators.indexOf(opType) > -1) {
                        const operator = operatorsMap[opType]
                        if (operator) {
                            value = value[Object.keys(value)[0]]
                            this.t_where_and.push({
                                [key]: { type, operator, value }
                            })
                        } else if (opType === '$in') {
                            value = value[Object.keys(value)[0]]
                            this.t_where_and.push({
                                [key]: { type, operator: 'IN', value }
                            })
                        }
                    }
                } else {
                    this.t_where_and.push({
                        [key]: { type, operator: '=', value }
                    })
                }
            }
        }
        return this
    }

    orWhere (object = {}) {
        const type = 'or'
        let operator = '='
        for (const key in object) {
            let value = object[key]
            if (key && value) {
                if (typeof value === 'object') {
                    // cek apakah sesuai dengan acceptedOperators
                    const opType = Object.keys(value)[0]
                    if (acceptedOperators.indexOf(opType) > -1) {
                        operator = operatorsMap[opType]
                        if (operator) {
                            value = value[Object.keys(value)[0]]
                            this.t_where_or.push({
                                [key]: { type, operator, value }
                            })
                        }
                    }
                } else {
                    this.t_where_or.push({
                        [key]: { type, operator, value }
                    })
                }
            }
        }
        return this
    }

    limit (limit = 0) {
        this.t_limit = limit
        return this
    }

    offset (offset = 0) {
        this.t_offset = offset
        return this
    } 

    buildQuery () {
        const sql = []
        if (this.is_select_query) {
            console.log('select', this.t_select)
            const fields = this.t_select.join(', ')
            sql.push(`SELECT ${fields} FROM ${this.tableName}`)
        }
        const wAND = this.t_where_and
        const wOR = this.t_where_or
        let sequence = 1
        const kurung = ['(', ')']
        const wANDsize = wAND.length
        const wORsize = wOR.length
        let mapValueSequence = []
        if (wANDsize > 0) {
            if (sequence === 1) sql.push('WHERE')
            let s = 1
            for (const obj of wAND) {
                const key = Object.keys(obj)[0]
                const type = obj[key]['type'].toUpperCase()
                const val = obj[key]['value']
                const op = obj[key]['operator']
                if (sequence > 1) sql.push(type)
                const k0 = (s === 1 ? kurung[0] : '')
                const k1 = (s === wANDsize ? kurung[1] : '')
                if (op === 'IN') {
                    sql.push(`${k0}${key} ${op} ($${sequence})${k1}`)
                    mapValueSequence.push(val.join())
                } else {
                    sql.push(`${k0}${key} ${op} $${sequence}${k1}`)
                    mapValueSequence.push(val)
                }
                sequence += 1
                s += 1
            }
        }
        if (wORsize > 0) {
            if (sequence === 1) sql.push('WHERE')
            let s = 1
            for (const obj of wOR) {
                const key = Object.keys(obj)[0]
                const type = obj[key]['type'].toUpperCase()
                const val = obj[key]['value']
                console.log(obj[key])
                const op = obj[key]['operator']
                if (sequence > 1) sql.push(type)
                const k0 = (s === 1 ? kurung[0] : '')
                const k1 = (s === wORsize ? kurung[1] : '')
                if (op === 'IN') {
                    sql.push(`${k0}${key} ${op} ($${sequence})${k1}`)
                } else {
                    sql.push(`${k0}${key} ${op} $${sequence}${k1}`)
                }
                mapValueSequence.push(val)
                sequence += 1
                s += 1
            }
        }
        if (this.is_select_query) {
            if (this.t_limit) sql.push(`LIMIT ${this.t_limit}`)
            if (this.t_offset) sql.push(`OFFSET ${this.t_offset}`)
        }
        return {sql, mapValueSequence}
    }

    async insertOne (data = {}) {
        try {
            let keys = []
            let values = []
            let preparedMap = []
            let mapValue = 1
            for (const key in data) {
                keys.push(key)
                values.push(data[key])
                preparedMap.push(`$${mapValue}`)
                mapValue += 1
            }
            const sql = `INSERT INTO ${this.tableName} (${keys.join()}) values (${preparedMap.join(',')})`
            console.log(sql)
            await this.execquery(sql, values)
        } catch (err) {
            throw err
        }
    }
}

class BaseModel extends Builder {
    constructor () {
        super()
        this.whereClauses = []
        this.values = []
    }

    async execquery (sql = '', data = []) {
        try {
            if (typeof sql !== 'string') sql = sql.join(' ')
            console.logger('running query:', {sql, data})
            const q = await connectionPool.query(sql, data)
            await connectionPool.end()
            return q
        } catch (err) {
            console.error(err)
            return null
        }
    }

    async findOne (criteria, options = {}) {
        try {
            for (const field in criteria) {
                this.where(field, criteria[field])
            }
            const sql = `SELECT * FROM ${this.tableName} ${this.whereClauses.join(' ')} LIMIT 1`
            const q = await this.execquery(sql, this.values)
            return this.getResult(q,'rows[0]', {})
        } catch (err) {
            throw err
        }
    }

    async findBy (criteria, options = {}) {
        try {
            for (const field in criteria) {
                this.where(field, criteria[field])
            }
            const sql = `SELECT * FROM ${this.tableName} ${this.whereClauses.join(' ')}`
            const q = await this.execquery(sql, this.values)
            return this.getResult(q,'rows', [])
        } catch (err) {
            throw err
        }
    }
}
module.exports = BaseModel