# Enigma
<img src="public/icons/icon32.png" width="32" height="32" /> Enigma adonisJS nodeJS application to store environment variable securely and transfer though API. Very use full to update, pass to ECS and easy to manage.

```curl
curl --location --request POST 'https://<host>/api1/service' \
--header 'Content-Type: application/json' \
--data-raw '{
    "token": "432320bb5bea597ec4cb901870f4bc97b3d6ca8afbf898ef785772820ee7bb8e",
    "path": "node-ecs-dev-server"
}'
```

## Encryption technique
`AES-256-CBC` which require `iv:16` and `key:32` which include as complete encryption key as first 16 chars are `iv` and rest 32 chars are `enc_key`.

Generate key using `adonis enc_key_gen`, like `Key: e8768e43c7a6047ebf3c199c2470cb477d907b1e0917c17b`. Key has 48 chars where first 16chars are iv as `e8768e43c7a6047e` and rest 32 chars are encryption key as `bf3c199c2470cb477d907b1e0917c17b`.

```js
// NodeJS
const crypto = require('crypto');

const iv = 'e8768e43c7a6047e'
const enc_key = 'bf3c199c2470cb477d907b1e0917c17b'
const plain_text = '{"hello":"world"}'
const encrypted_text = 'l/w30rTVW1xu1Mq2K+jvPATSbWspWKqDtEFHyLPaiY8='

var encrypt = ((plain) => {
  let cipher = crypto.createCipheriv('aes-256-cbc', enc_key, iv);
  let encrypted = cipher.update(plain, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
});

var decrypt = ((encrypted) => {
  let decipher = crypto.createDecipheriv('aes-256-cbc', enc_key, iv);
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  return (decrypted + decipher.final('utf8'));
});

const encrypted_key = encrypt(plain_text);
console.log(encrypted_key)
const original_text = decrypt(encrypted_text);
console.log(original_text)
```

```ruby
# Ruby / Rails
require 'openssl'
require 'base64'

iv = 'e8768e43c7a6047e'
key = 'bf3c199c2470cb477d907b1e0917c17b'
plain_text = '{"hello":"world"}'
encrypted_text = 'l/w30rTVW1xu1Mq2K+jvPATSbWspWKqDtEFHyLPaiY8='

cipher = OpenSSL::Cipher::AES.new(256, :CBC)
cipher.encrypt
cipher.key = key
cipher.iv = iv
text = cipher.update(plain_text) + cipher.final
final = Base64.strict_encode64(text)
puts final

decipher = OpenSSL::Cipher::AES.new(256, :CBC)
decipher.decrypt
decipher.iv = iv
decipher.key = key
dplain = decipher.update(Base64.strict_decode64(encrypted_text)) + decipher.final
puts dplain
```


##### Under MIT License