import { BaseCommand } from '@adonisjs/core/build/standalone'
import Env from 'env'
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
    loadApp: false,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process
     */
    stayAlive: false,
  }

  public async run () {
    const config = require(process.cwd() + '/config/database');
    const knex = Knex(config[config.connection]);
    await knex.raw(`DROP DATABASE ${Env.get("DB_DATABASE")}`);
    await knex.destroy();
    this.info('DB dropped');
  }
}
