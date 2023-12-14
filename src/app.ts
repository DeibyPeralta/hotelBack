import * as dotenv from "dotenv";
dotenv.config();

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan  from 'morgan';
import bodyParser from'body-parser';
import path from 'path';

const app = express();

app.use(cors());
app.use(morgan ('dev'));;
app.use(express.json());

import usuariosRoutes from './ruta/usuarios/login.routes';
import tableroRoutes from './ruta/tablero/tablero.routes';

app.use(bodyParser.json({limit:'500mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit:'500mb' }));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/usuarios', usuariosRoutes);
app.use('/tablero', tableroRoutes);

app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  // catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404);
    next(new Error('Not Found'));
  });
  
  export default app;