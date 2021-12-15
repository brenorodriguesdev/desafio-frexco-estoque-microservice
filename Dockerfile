FROM node:16
WORKDIR /usr/src/gateway
COPY ./package.json .
RUN npm install --only=prod
COPY ./dist ./dist
CMD npm start 