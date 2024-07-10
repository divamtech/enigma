import { BaseCommand } from '@adonisjs/core/build/standalone'
import Knex from 'knex'

export default class DbDrop extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'db:drop'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Drop database'

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
    const { default: env } = await import('@ioc:Adonis/Core/Env')
    const { default: config } = await import('@ioc:Adonis/Core/Config')
    const connName = env.get('DB_CONNECTION')
    const conn = config.get('database.connections')[connName]
    const dbName = env.get(`${connName.toUpperCase()}_DB_NAME`)
    try {
      const knex = Knex(conn)
      await knex.raw(`DROP DATABASE ${dbName}`)
      await knex.destroy()
      this.logger.info(`DB (${dbName}) dropped`)
    } catch (e) {
      if (e.code === 'ER_BAD_DB_ERROR') {
        this.logger.error(`DB (${dbName}) doesn't exist`)
      } else {
        this.logger.error(e)
      }
    }
  }
}
