import express, { Express } from "express";
import cookieParser from "cookie-parser";
import routes from "../router/routes";
import invalidJSONFormatHandler from "../middleware/incorrectJSONFormatHandler";

const app:Express = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json({ type: 'application/json' }), invalidJSONFormatHandler);
app.use('/', routes);

export default app;
