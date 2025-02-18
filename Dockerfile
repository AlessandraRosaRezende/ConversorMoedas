FROM node:16.14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install

ENTRYPOINT [ "npm", "run" ]
CMD [ "dev" ]