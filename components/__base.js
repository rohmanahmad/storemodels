'use strict'

const {Pool} = require('pg')
const connectionPool = new Pool({
    connectionString: process.env.POSTGRESQL_DSN
})

class Builder {
    constructor () {
        this.t_keys = {} // untuk indexing berisi key {'user_name': '$1', 'user_email': '$2']
        this.t_where = []
        this.t_join = []
        this.t_limit = 0
        this.t_skip = 0
    }
    /* only calling from internal class not public */
    /**
     * @param {string} key 
     */
    addKey (key = '') {
        if (!this.t_keys[key]) this.t_keys[key] = `$${Object.keys(this.t_keys).length}`
    }
    /**
     * @param {string} key 
     * @param {*} value 
     */  
    where (object = {}) {
        let w = [/* key, value, index */]
        for (const key in object) {
            const value = object[key]
            if (key && value) {
                this.t_where.push({[key]: value})
            }
        }
        return this
    }

    orWhere (key, value) {
    }
}

class BaseModel {
    constructor () {
        this.whereClauses = []
        this.values = []
    }

    getResult (...args) {
        return result(...args)
    }

    async connect () {
        const driver = this.connection
        const connection = await this.instance[driver].connect()
        return connection
    }

    where (key, value = '') {
        const l = this.whereClauses.length
        let sql = ''
        if (l === 0) sql += 'WHERE '
        if (l >= 1) sql += 'AND '
        sql += `${key} = $${l + 1}`
        this.whereClauses.push(sql)
        this.values.push(value)
        return sql
    }

    whereLike (key, value = '') {
        const l = this.whereClauses.length
        let sql = ''
        if (l === 0) sql += 'WHERE '
        if (l >= 1) sql += 'AND '
        sql += `${key} LIKE $${l + 1}`
        this.whereClauses.push(sql)
        this.values.push(value)
        return sql
    }

    limit (limit = 10) {
        const index = this.values.length
        let sql = ''
        sql += `LIMIT $${index + 1}`
        this.values.push(limit)
        return sql
    }

    offset (limit = 10) {
        const index = this.values.length
        let sql = `OFFSET $${index + 1}`
        this.values.push(limit)
        return sql
    }

    and (data = {}) {
        let i = 1
        let andStatement = ''
        for (const x in data) {
            if (i > 1) andStatement += ' AND '
            andStatement += `${x}=${data[x]}`
            i += 1
        }
        return andStatement
    }

    or (data = {}) {
        let i = 1
        let orStatement = ''
        for (const x in data) {
            if (i > 1) orStatement += ' OR '
            orStatement += `${x}=${data[x]}`
            i += 1
        }
        return orStatement
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
module.exports = Models