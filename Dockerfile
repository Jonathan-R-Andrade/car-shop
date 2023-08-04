FROM node:16.20

WORKDIR /app

COPY package*.json ./

RUN ["npm", "i"]

COPY tsconfig.json nyc.config.js ./

COPY ./src ./src

RUN ["npm", "run", "build"]

CMD ["npm", "run", "start"]
