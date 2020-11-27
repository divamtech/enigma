'use strict'

const { Command } = require('@adonisjs/ace')
const EncryptDecrypt = use("App/Helper/EncryptDecrypt");

class Decrypt extends Command {
  static get signature () {
    return  `decrypt 
    {encrypt_key: Encrypt Key provided at dashboard}
    {encrypt_value: Return from api response}
    { -f: format json value  }
    `
  }

  static get description () {
    return 'decrypt encrypted json response from the api'
  }

  async handle (args, flags) {
    const key = args.encrypt_key;
    const val = args.encrypt_value;
    let text = EncryptDecrypt.decrypt(val,key)
    if (flags.F) {
      text = JSON.stringify(JSON.parse(text),null,2)
    }
    this.info(`Decrypted value:\n${text}`)
  }
}

module.exports = Decrypt
