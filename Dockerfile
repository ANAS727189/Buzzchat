
FROM node:20-alpine


WORKDIR /app


COPY package.json ./
COPY backend ./backend
COPY client ./client


RUN npm install
RUN npm run build


EXPOSE 3000


CMD ["npm", "start"]