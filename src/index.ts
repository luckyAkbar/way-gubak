import dotenv from 'dotenv';

import server from './app/server';
import mongoConnect from './connection/mongoConnect';

dotenv.config();

const port = Number(process.env.PORT);

server.listen(port, async (): Promise<void> => {
  try {
    await mongoConnect();
    process.stdout.write(`process starting on port ${port}\n`);
  } catch (e: unknown) {
    console.log(e);
    process.stdout.write('Server failed to start.\n');
  }
});
