import dotenv from 'dotenv';
dotenv.config();

import server from './app/server';

const port: number = Number(process.env.PORT);

server.listen(port, (): void => {
  console.log(`process starting on port ${port}`);
});