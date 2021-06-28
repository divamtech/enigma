import { BaseCommand } from '@adonisjs/core/build/standalone'
import Env from 'env'
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
    loadApp: false,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process
     */
    stayAlive: false,
  }
  info: any

  public async run () {
    const config = require(process.cwd() + '/config/database');
    config[config.connection].connection.database = null;
    const knex = Knex(config[config.connection]);
    await knex.raw(`CREATE DATABASE IF NOT EXISTS ${Env.get('MYSQL_DB_NAME')}`);
    await knex.destroy();
    this.info('DB created');
  }
}
