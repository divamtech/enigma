import crypto from 'crypto';

export default class EncryptDecrypt {
  public static keyGenerator() {
    return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  // key must be 48 characters length
  public static encrypt(plain, key) {
    const {enc_key, iv } = this.parseKey(key)
    let cipher = crypto.createCipheriv('aes-256-cbc', enc_key, iv);
    let encrypted = cipher.update(plain, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  }

  // key must be 48 characters length
  public static decrypt(encrypted, key) {
    const {enc_key, iv } = this.parseKey(key)
    let decipher = crypto.createDecipheriv('aes-256-cbc', enc_key, iv);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    return (decrypted + decipher.final('utf8'));
  }

  // key must be 48 characters length
  public static parseKey(key) {
    const iv = key.substr(0,16)
    const enc_key = key.substr(16)
    return { enc_key, iv }
  }
}


