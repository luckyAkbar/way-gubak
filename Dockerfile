FROM node:14.17.5
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm run build
COPY . ./
EXPOSE 5000
CMD ["node", "build/index.js"]