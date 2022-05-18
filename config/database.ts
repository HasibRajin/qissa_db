// /**
//  * Config source: https://git.io/JesV9
//  *
//  * Feel free to let us know via PR, if you find something broken in this config
//  * file.
//  */
//
// import Env from '@ioc:Adonis/Core/Env'
// import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'
// import Url from 'url-parse'
// const DATABASE_URL = new Url(Env.get('DATABASE_URL'))
// console.log('urlCheck:' + DATABASE_URL)
// const databaseConfig: DatabaseConfig = {
//   /*
//   |--------------------------------------------------------------------------
//   | Connection
//   |--------------------------------------------------------------------------
//   |
//   | The primary connection for making database queries across the application
//   | You can use any key from the `connections` object defined in this same
//   | file.
//   |
//   */
//   connection: 'pg',
//
//   connections: {
//     /*
//     |--------------------------------------------------------------------------
//     | PostgreSQL config
//     |--------------------------------------------------------------------------
//     |
//     | Configuration for PostgreSQL database. Make sure to install the driver
//     | from npm when using this connection
//     |
//     | npm i pg
//     |
//     */
//     pg: {
//       client: 'pg',
//       connection: {
//         host: DATABASE_URL.host as string,
//         port: Number(''),
//         user: DATABASE_URL.username as string,
//         password: DATABASE_URL.password as string,
//         database: DATABASE_URL.pathname.substr(1) as string,
//       },
//       healthCheck: false,
//     },
//   },
// }
//
// export default databaseConfig

/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

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
        host: 'ec2-54-165-184-219.compute-1.amazonaws.com',
        port: 5432,
        user: 'pcmyijeseroese',
        password: 'adbd72c93a2fa2c8c0f658e7696739365c695293773a55caeeaad59a5e7e6f05',
        database: 'd6bad8db3pmqcv',
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: false,
    },
  },
}

export default databaseConfig
