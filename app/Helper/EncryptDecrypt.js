const CryptoJS = require("crypto-js");

class EncryptDecrypt {
  static uuidv4() {
    return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  static encrypt(string, key) {
    return CryptoJS.AES.encrypt(string, key).toString();
  }

  static decrypt(encrypted, key) {
    return CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);
  }
}

module.exports = EncryptDecrypt;
