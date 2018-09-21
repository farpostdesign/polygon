FROM node:8.12.0-alpine

WORKDIR /polygon
COPY package*.json ./
RUN npm install --production && npm cache clean --force

EXPOSE 3000

COPY . .

RUN npm run build

CMD ["npm", "start"]
