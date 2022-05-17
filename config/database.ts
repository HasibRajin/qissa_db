/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'
import Url from 'url-parse'
const DATABASE_URL =
  'postgres://fjnricqouzamcn:1819a2a8855f0eef4574f74d427049890691e8bdcdf31b6fc6b1e0a194072fb7@ec2-54-86-224-85.compute-1.amazonaws.com:5432/d5ngsccmppkapr'
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
        host: DATABASE_URL.host as string,
        port: Number(''),
        user: DATABASE_URL.username as string,
        password: DATABASE_URL.password as string,
        database: DATABASE_URL.pathname.substr(1) as string,
      },
      healthCheck: false,
    },
  },
}

export default databaseConfig
