FROM node:alpine

RUN apk add iputils

USER node
ADD --chown=node:node . /home/node/app
WORKDIR /home/node/app
ENTRYPOINT npm start