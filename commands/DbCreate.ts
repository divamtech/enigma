import { BaseCommand } from '@adonisjs/core/build/standalone'
import Knex from 'knex'

export default class DbCreate extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'db:create'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Create Database'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process
     */
    stayAlive: false,
  }

  public async run() {
    try {
      const { default: env } = await import('@ioc:Adonis/Core/Env')
      const { default: config } = await import('@ioc:Adonis/Core/Config')
      const connName = env.get('DB_CONNECTION')
      const conn = config.get('database.connections')[connName]
      conn.connection.database = null
      const knex = Knex(conn)
      await knex.raw(`CREATE DATABASE ${env.get(`${connName.toUpperCase()}_DB_NAME`)}`)
      await knex.destroy()
    } catch (e) {
      if (e.code === 'ER_DB_CREATE_EXISTS') {
        this.logger.error('DB already exist')
      } else {
        this.logger.error(e)
      }
      return
    }
    this.logger.info('DB created')

    // const config = require(process.cwd() + '/config/database');
    // config[config.connection].connection.database = null;
    // const knex = Knex(config[config.connection]);
    // await knex.raw(`CREATE DATABASE IF NOT EXISTS ${Env.get('MYSQL_DB_NAME')}`);
  }
}
