I'm using this to automatically disconnect and connect mobile data connection when the ping to google fails. It's is running inside node container infinitely and after ping failes, it tries to fix the connection by restarting it. Each restarting event will be notified by email.

My modem is Zyxel LTE LTE7460-M608. The operator has some strange problem in the area, that the connection quality drops once in a while to very poor, the ping is 25 seconds. The re-connect automatically fixes the issue.
  
Here is short guide how im using this: 
* check settings in docker-compose.yml file
* run ```docker-compose up```

There is a build for each two platforms: arm64 (my setup) and amd64 (normal x86).

https://hub.docker.com/repository/docker/heikkis/zyxel-lte-modem 