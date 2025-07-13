import * as dotenv from "dotenv";
dotenv.config();

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
const fileUpload = require('express-fileupload');

const app = express();

// CORS
const allowedOrigins = [
  'http://valle.parqueaderosantacruz.shop:4200',
  'http://cucuta.parqueaderosantacruz.shop:4200'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true
}));

// Middlewares globales
app.use(morgan('dev'));
app.use(express.json());
app.use(fileUpload());
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '500mb' }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// 🚨 Middleware de subdominio antes de rutas
app.use((req: Request, res: Response, next: NextFunction) => {
  const host = req.headers.host || '';
  const subdomain = host.split('.')[0];

  console.log('Subdominio detectado:', subdomain);

  if (subdomain === 'valle' || subdomain === 'cucuta') {
    (req as any).schema = subdomain;
    return next();
  }

  return res.status(400).json({ message: 'Subdominio no válido' });
});

// Rutas
import usuariosRoutes from './ruta/usuarios/login.routes';
import tableroRoutes from './ruta/tablero/tablero.routes';
import sociosRoutes from './ruta/socios/socio.routes';

app.use('/usuarios', usuariosRoutes);
app.use('/tablero', tableroRoutes);
app.use('/socios', sociosRoutes);

// 404 handler para rutas que no existen
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  next(new Error('Not Found'));
});

// Error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  console.error('Error atrapado:', err);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Error del servidor',
  });
});

// Angular: enviar index.html en rutas desconocidas solo si no son API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

export default app;
