import dotenv from "dotenv";
dotenv.config();

import app from "./app/server";

const port: number = Number(process.env.PORT);

app.listen(port, (): void => {
  console.log(`process starting on port ${port}`);
});