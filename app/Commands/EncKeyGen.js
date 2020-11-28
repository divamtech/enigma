'use strict'

const { Command } = require('@adonisjs/ace')
const EncryptDecrypt = use("App/Helper/EncryptDecrypt");

class EncKeyGen extends Command {
  static get signature () {
    return 'enc_key_gen generate random keys for use encryption'
  }

  static get description () {
    return 'generate random keys for use encryption'
  }

  async handle () {
    this.info(`Key: ${EncryptDecrypt.keyGenerator()}`)
  }
}

module.exports = EncKeyGen
