FROM node:14.17.5
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY tsconfig.json .

COPY . ./
RUN npm run build

WORKDIR ./build
COPY . ./

EXPOSE 3000
CMD ["node", "index.js"]