'use strict'

const { Command } = require('@adonisjs/ace')
const Env = use("Env")
const Knex = use("knex")

class DbDrop extends Command {
  static get signature () {
    return 'db:drop'
  }

  static get description () {
    return 'Drop database'
  }

  async handle () {
    const config = require(process.cwd() + '/config/database');
    const knex = Knex(config[config.connection]);
    await knex.raw(`DROP DATABASE ${Env.get("DB_DATABASE")}`);
    await knex.destroy();
    this.info('DB dropped');
  }
}

module.exports = DbDrop
