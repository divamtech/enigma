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

##### Under MIT License