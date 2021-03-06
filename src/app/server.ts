import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import routes from '../router/routes';
import invalidJSONFormatHandler from '../middleware/incorrectJSONFormatHandler';
import requestLogger from '../middleware/requestLogger';
import loginChecker from '../middleware/loginChecker';

const server:Express = express();

server.set('view engine', 'ejs');
server.set('trust proxy', true);

server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.json({ type: 'application/json' }), invalidJSONFormatHandler);
server.use(express.static('public/'));
server.use('/', requestLogger);
server.use('/dashboard', loginChecker);
server.use('/', routes);

export default server;
