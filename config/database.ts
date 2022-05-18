/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'
import Url from 'url-parse'
const DATABASE_URL = new Url(Env.get('DATABASE_URL'))
const host = DATABASE_URL.host as string
const port = DATABASE_URL.port as number
const user = DATABASE_URL.username as string
const password = DATABASE_URL.password as string
const database = DATABASE_URL.pathname.substr(1) as string
console.log(
  `DATABASE_URL:${DATABASE_URL};\nhost:${host}\nport:${port}\nuser:${user}\npassword:${password}\ndatabase:${database}\n`
)

const databaseConfig: DatabaseConfig = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | The primary connection for making database queries across the application
  | You can use any key from the `connections` object defined in this same
  | file.
  |
  */
  connection: 'pg',
  connections: {
    /*
    |--------------------------------------------------------------------------
    | PostgreSQL config
    |--------------------------------------------------------------------------
    |
    | Configuration for PostgreSQL database. Make sure to install the driver
    | from npm when using this connection
    |
    | npm i pg
    |
    */
    pg: {
      client: 'pg',
      connection: {
        host: DATABASE_URL.host.split(':')[0] as string,
        port: DATABASE_URL.port as number,
        user: DATABASE_URL.username as string,
        password: DATABASE_URL.password as string,
        database: DATABASE_URL.pathname.substr(1) as string,
      },
      healthCheck: false,
    },
  },
}

export default databaseConfig
