'use strict'

const { Command } = require('@adonisjs/ace')
const EncryptDecrypt = use("App/Helper/EncryptDecrypt");

class Encrypt extends Command {
  static get signature () {
    return `encrypt 
    {encrypt_key: Encrypt Key provided at dashboard}
    {plain_value: some string may be json string}
    `
  }

  static get description () {
    return 'Encrypt value check for running keys'
  }

  async handle (args) {
    const key = args.encrypt_key;
    const val = args.plain_value;
    let text = EncryptDecrypt.encrypt(val,key)
    this.info(`Encrypted value:\n${text}`)
  }
}

module.exports = Encrypt
