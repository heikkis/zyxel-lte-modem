FROM node:alpine

RUN apk add iputils

USER node
RUN mkdir /home/node/app
ADD --chown=node:node . /home/node/app
WORKDIR /home/node/app

CMD npm start