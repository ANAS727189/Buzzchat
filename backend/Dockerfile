FROM node:20-alpine

WORKDIR /app


COPY package*.json ./
COPY src ./src
COPY . .


RUN npm install


COPY ../client/dist ./dist


EXPOSE 3000


CMD ["node", "src/index.js"]