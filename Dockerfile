FROM node:alpine

RUN apk add iputils

USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app
CMD npm start

ADD --chown=node:node . /home/node/app
