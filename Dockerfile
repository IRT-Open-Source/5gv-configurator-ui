FROM node:latest
WORKDIR /usr/configurator-ui
COPY ./*.json ./
RUN npm install
RUN npm install -g @angular/cli
