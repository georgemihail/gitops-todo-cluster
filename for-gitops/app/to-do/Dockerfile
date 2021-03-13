FROM node:alpine

WORKDIR /usr/src/app

COPY . ./

RUN npm ci && \
    npm install

CMD ["npm", "start"]