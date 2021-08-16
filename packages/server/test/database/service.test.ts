import _ from 'lodash'
import fs from 'fs'
import * as path from 'path'
import { mocked } from 'ts-jest/utils'

import { DatabaseService } from '../../src/database/service'
import { ConfigService } from '../../src/config/service'
import { Table } from '../../src/base/table'
import { Knex } from 'knex'

jest.mock('../../src/logger/types')
jest.mock('../../src/config/service')
jest.mock('fs')
jest.mock('knex', () => {
  const mKnexSchema = { hasTable: jest.fn(), createTable: jest.fn() }
  const mKnex = { destroy: jest.fn(), schema: mKnexSchema }

  return jest.fn(({ pool }) => {
    pool.afterCreate?.({ run: jest.fn() }, jest.fn())

    return mKnex
  })
})

export class TestTable extends Table {
  get id() {
    return 'test_table'
  }

  create(table: Knex.CreateTableBuilder) {
    table.uuid('id').primary()
  }
}

let configService: ConfigService

const table = new TestTable()
const defaultEnv = process.env
const postgresDatabaseUrl = 'postgres://user:pass@url:123/db'
const poolOptions = '{ "min": 0, "max": 7 }'
const invalidPoolOptions = '{ min: 0, max: 7 }'
const sqlitePath = 'a/path/sqlite.core'
const anyValue = 2
const date = new Date()
const stringDate = date.toISOString()
const obj = { a: 'value' }
const stringObj = JSON.stringify(obj)
const falsyValues = ['', null, undefined, false]

describe('DatabaseService', () => {
  beforeEach(() => {
    configService = new ConfigService()
    configService['current'] = {}

    process.env = { ..._.cloneDeep(process.env) }

    jest.useFakeTimers()
  })

  afterEach(() => {
    process.env = defaultEnv

    jest.useRealTimers()
  })

  test('Should not throw any error with a default configuration', () => {
    try {
      new DatabaseService(configService)
    } catch (e) {
      fail(e)
    }
  })

  describe('PostgreSQL', () => {
    beforeEach(() => {
      process.env.DATABASE_URL = postgresDatabaseUrl
    })

    describe('setup', () => {
      test('Should configure a PostgreSQL database connection from an env var', async () => {
        const db = new DatabaseService(configService)
        await db.setup()

        expect(Object.keys(db['pool'])).toEqual(['log'])
        expect(db['isLite']).toEqual(false)
        expect(db['url']).toEqual(postgresDatabaseUrl)
        expect(db.knex).not.toBeUndefined()
      })

      test('Should configure a PostgreSQL database connection from a config file', async () => {
        delete process.env.DATABASE_URL
        configService.current = {
          database: {
            connection: postgresDatabaseUrl
          }
        }

        const db = new DatabaseService(configService)
        await db.setup()

        expect(Object.keys(db['pool'])).toEqual(['log'])
        expect(db['isLite']).toEqual(false)
        expect(db['url']).toEqual(postgresDatabaseUrl)
        expect(db.knex).not.toBeUndefined()
      })

      test('Should configure a PostgreSQL database connection with custom pool options', async () => {
        process.env.DATABASE_POOL = poolOptions
        const jsonPoolOptions = JSON.parse(poolOptions)

        const db = new DatabaseService(configService)
        await db.setup()

        expect(Object.keys(db['pool'])).toEqual(['log', ...Object.keys(jsonPoolOptions)])
        expect(db['pool']).toEqual(expect.objectContaining(jsonPoolOptions))
        expect(db['isLite']).toEqual(false)
        expect(db['url']).toEqual(postgresDatabaseUrl)
        expect(db.knex).not.toBeUndefined()
      })

      test('Should configure a PostgreSQL database connection with no extra pool options', async () => {
        process.env.DATABASE_POOL = '{}'

        const db = new DatabaseService(configService)
        await db.setup()

        expect(Object.keys(db['pool'])).toEqual(['log'])
        expect(db['isLite']).toEqual(false)
        expect(db['url']).toEqual(postgresDatabaseUrl)
        expect(db.knex).not.toBeUndefined()
      })

      test('Should display a warning if the custom pool options are invalid JSON', async () => {
        process.env.DATABASE_POOL = invalidPoolOptions

        const db = new DatabaseService(configService)
        await db.setup()

        expect(db['logger'].warn).toHaveBeenCalledTimes(1)
        expect(Object.keys(db['pool'])).toEqual(['log'])
        expect(db['isLite']).toEqual(false)
        expect(db['url']).toEqual(postgresDatabaseUrl)
        expect(db.knex).not.toBeUndefined()
      })
    })

    describe('destroy', () => {
      test('Should call destroy on knex', async () => {
        const db = new DatabaseService(configService)
        await db.setup()

        mocked(db.knex.destroy).mockReturnValueOnce(Promise.resolve())

        await db.destroy()

        expect(db.knex.destroy).toHaveBeenCalledTimes(1)
        expect(db['logger'].error).not.toHaveBeenCalled()
      })

      test('Should call the logger if an error is thrown', async () => {
        const db = new DatabaseService(configService)
        await db.setup()

        mocked(db.knex.destroy).mockImplementationOnce(Promise.reject)

        await db.destroy()

        expect(db.knex.destroy).toHaveBeenCalledTimes(1)
        expect(db['logger'].error).toHaveBeenCalledTimes(1)
      })
    })

    describe('registerTable', () => {
      test('Should create a new table if it does not exists', async () => {
        const db = new DatabaseService(configService)
        await db.setup()

        mocked(db.knex.schema.hasTable).mockReturnValueOnce(Promise.resolve(false))
        mocked(db.knex.schema.createTable as any).mockReturnValueOnce(Promise.resolve({}))

        await db.registerTable(table)

        expect(db.knex.schema.hasTable).toHaveBeenCalledTimes(1)
        expect(db.knex.schema.hasTable).toHaveBeenCalledWith(table.id)
        expect(db['logger'].debug).toHaveBeenCalledTimes(1)
        expect(db.knex.schema.createTable).toHaveBeenCalledTimes(1)
        expect(db.knex.schema.createTable).toHaveBeenCalledWith(table.id, table.create)
      })

      test('Should not create a new table if it already exists', async () => {
        const db = new DatabaseService(configService)
        await db.setup()

        mocked(db.knex.schema.hasTable).mockReturnValueOnce(Promise.resolve(true))

        await db.registerTable(table)

        expect(db.knex.schema.hasTable).toHaveBeenCalledTimes(1)
        expect(db.knex.schema.hasTable).toHaveBeenCalledWith(table.id)
        expect(db['logger'].debug).not.toHaveBeenCalled()
        expect(db.knex.schema.createTable).not.toHaveBeenCalled()
      })
    })

    describe('getJson', () => {
      test('Should return the value as is', async () => {
        const db = new DatabaseService(configService)
        await db.setup()

        expect(db.getJson(anyValue)).toEqual(anyValue)
      })
    })

    describe('setJson', () => {
      test('Should return the value as is', async () => {
        const db = new DatabaseService(configService)
        await db.setup()

        expect(db.setJson(anyValue)).toEqual(anyValue)
      })
    })

    describe('getDate', () => {
      test('Should convert a string into a new Date', async () => {
        const db = new DatabaseService(configService)
        await db.setup()

        expect(db.getDate(stringDate)).toEqual(date)
      })
    })

    describe('setDate', () => {
      test('Should convert a string into a new Date', async () => {
        const db = new DatabaseService(configService)
        await db.setup()

        expect(db.setDate(date)).toEqual(stringDate)
      })

      test('Should return undefined if no date is provided', async () => {
        const db = new DatabaseService(configService)
        await db.setup()

        expect(db.setDate(undefined)).toEqual(undefined)
      })
    })
  })

  describe('SQLite', () => {
    describe('setup', () => {
      test('Should configure a SQLite database connection', async () => {
        mocked(fs.existsSync).mockReturnValueOnce(true)

        const db = new DatabaseService(configService)
        await db.setup()

        expect(Object.keys(db['pool'])).toEqual(['log'])
        expect(db['isLite']).toEqual(true)
        expect(db['url']).toBeUndefined()
        expect(fs.existsSync).toHaveBeenCalledTimes(1)
        expect(fs.existsSync).toHaveBeenCalledWith(expect.stringContaining('dist'))
        expect(db.knex).not.toBeUndefined()
      })

      test('Should configure a SQLite database connection for production', async () => {
        process.env.NODE_ENV = 'production'

        mocked(fs.existsSync).mockReturnValueOnce(false)
        mocked(fs.mkdirSync).mockReturnValueOnce(undefined)

        const db = new DatabaseService(configService)
        await db.setup()

        expect(Object.keys(db['pool'])).toEqual(['log'])
        expect(db['isLite']).toEqual(true)
        expect(db['url']).toBeUndefined()
        expect(fs.existsSync).toHaveBeenCalledTimes(1)
        expect(fs.existsSync).toHaveBeenCalledWith(expect.not.stringContaining('dist'))
        expect(fs.mkdirSync).toHaveBeenCalledTimes(1)
        expect(fs.mkdirSync).toHaveBeenCalledWith(expect.not.stringContaining('dist'), expect.anything())
        expect(db.knex).not.toBeUndefined()
      })

      test('Should configure a SQLite database connection using a provided filename from an env var', async () => {
        process.env.DATABASE_URL = sqlitePath

        mocked(fs.existsSync).mockReturnValueOnce(true)

        const db = new DatabaseService(configService)
        await db.setup()

        expect(Object.keys(db['pool'])).toEqual(['log'])
        expect(db['isLite']).toEqual(true)
        expect(db['url']).toEqual(sqlitePath)
        expect(fs.existsSync).toHaveBeenCalledTimes(1)
        expect(fs.existsSync).toHaveBeenCalledWith(path.dirname(sqlitePath))
        expect(db.knex).not.toBeUndefined()
      })

      test('Should configure a SQLite database connection using a provided filename from a config file', async () => {
        configService.current = {
          database: {
            connection: sqlitePath
          }
        }

        mocked(fs.existsSync).mockReturnValueOnce(true)

        const db = new DatabaseService(configService)
        await db.setup()

        expect(Object.keys(db['pool'])).toEqual(['log'])
        expect(db['isLite']).toEqual(true)
        expect(db['url']).toEqual(sqlitePath)
        expect(fs.existsSync).toHaveBeenCalledTimes(1)
        expect(fs.existsSync).toHaveBeenCalledWith(path.dirname(sqlitePath))
        expect(db.knex).not.toBeUndefined()
      })

      test('Should configure a SQLite database connection with custom pool options', async () => {
        process.env.DATABASE_URL = sqlitePath
        process.env.DATABASE_POOL = poolOptions
        const jsonPoolOptions = JSON.parse(poolOptions)

        const db = new DatabaseService(configService)
        await db.setup()

        expect(Object.keys(db['pool'])).toEqual(['log', ...Object.keys(jsonPoolOptions)])
        expect(db['pool']).toEqual(expect.objectContaining(jsonPoolOptions))
        expect(db['isLite']).toEqual(true)
        expect(db['url']).toEqual(sqlitePath)
        expect(db.knex).not.toBeUndefined()
      })

      test('Should configure a SQLite database connection with no extra pool options', async () => {
        process.env.DATABASE_URL = sqlitePath
        process.env.DATABASE_POOL = '{}'

        const db = new DatabaseService(configService)
        await db.setup()

        expect(Object.keys(db['pool'])).toEqual(['log'])
        expect(db['isLite']).toEqual(true)
        expect(db['url']).toEqual(sqlitePath)
        expect(db.knex).not.toBeUndefined()
      })

      test('Should display a warning if the custom pool options are invalid JSON', async () => {
        process.env.DATABASE_URL = sqlitePath
        process.env.DATABASE_POOL = invalidPoolOptions

        const db = new DatabaseService(configService)
        await db.setup()

        expect(db['logger'].warn).toHaveBeenCalledTimes(1)
        expect(Object.keys(db['pool'])).toEqual(['log'])
        expect(db['isLite']).toEqual(true)
        expect(db['url']).toEqual(sqlitePath)
        expect(db.knex).not.toBeUndefined()
      })
    })

    describe('destroy', () => {
      test('Should call destroy on knex', async () => {
        const db = new DatabaseService(configService)
        await db.setup()

        mocked(db.knex.destroy).mockReturnValueOnce(Promise.resolve())

        await db.destroy()

        expect(db.knex.destroy).toHaveBeenCalledTimes(1)
        expect(db['logger'].error).not.toHaveBeenCalled()
      })

      test('Should call the logger if an error is thrown', async () => {
        const db = new DatabaseService(configService)
        await db.setup()

        mocked(db.knex.destroy).mockImplementationOnce(Promise.reject)

        await db.destroy()

        expect(db.knex.destroy).toHaveBeenCalledTimes(1)
        expect(db['logger'].error).toHaveBeenCalledTimes(1)
      })
    })

    describe('registerTable', () => {
      test('Should create a new table if it does not exists', async () => {
        const db = new DatabaseService(configService)
        await db.setup()

        mocked(db.knex.schema.hasTable).mockReturnValueOnce(Promise.resolve(false))
        mocked(db.knex.schema.createTable as any).mockReturnValueOnce(Promise.resolve({}))

        await db.registerTable(table)

        expect(db.knex.schema.hasTable).toHaveBeenCalledTimes(1)
        expect(db.knex.schema.hasTable).toHaveBeenCalledWith(table.id)
        expect(db['logger'].debug).toHaveBeenCalledTimes(1)
        expect(db.knex.schema.createTable).toHaveBeenCalledTimes(1)
        expect(db.knex.schema.createTable).toHaveBeenCalledWith(table.id, table.create)
      })

      test('Should not create a new table if it already exists', async () => {
        const db = new DatabaseService(configService)
        await db.setup()

        mocked(db.knex.schema.hasTable).mockReturnValueOnce(Promise.resolve(true))

        await db.registerTable(table)

        expect(db.knex.schema.hasTable).toHaveBeenCalledTimes(1)
        expect(db.knex.schema.hasTable).toHaveBeenCalledWith(table.id)
        expect(db['logger'].debug).not.toHaveBeenCalled()
        expect(db.knex.schema.createTable).not.toHaveBeenCalled()
      })
    })

    describe('getJson', () => {
      test('Should return the value parsed into an object', async () => {
        const db = new DatabaseService(configService)
        await db.setup()

        expect(db.getJson(stringObj)).toEqual(obj)
      })

      test('Should return undefined if the value provided is falsy', async () => {
        const db = new DatabaseService(configService)
        await db.setup()

        for (const value of falsyValues) {
          expect(db.getJson(value)).toEqual(undefined)
        }
      })
    })

    describe('setJson', () => {
      test('Should return object parsed into a string', async () => {
        const db = new DatabaseService(configService)
        await db.setup()

        expect(db.setJson(obj)).toEqual(stringObj)
      })

      test('Should return undefined if the value provided is falsy', async () => {
        const db = new DatabaseService(configService)
        await db.setup()

        for (const value of falsyValues) {
          expect(db.setJson(value)).toEqual(undefined)
        }
      })
    })

    describe('getDate', () => {
      test('Should convert a string into a new Date', async () => {
        const db = new DatabaseService(configService)
        await db.setup()

        expect(db.getDate(stringDate)).toEqual(date)
      })
    })

    describe('setDate', () => {
      test('Should convert a string into a new Date', async () => {
        const db = new DatabaseService(configService)
        await db.setup()

        expect(db.setDate(date)).toEqual(stringDate)
      })

      test('Should return undefined if no date is provided', async () => {
        const db = new DatabaseService(configService)
        await db.setup()

        expect(db.setDate(undefined)).toEqual(undefined)
      })
    })
  })
})