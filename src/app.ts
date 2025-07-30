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
  'https://valle.parqueaderosantacruz.shop',
  'http://valle.parqueaderosantacruz.shop:4200',
  'http://cucuta.parqueaderosantacruz.shop:4200',
  'https://cucuta.parqueaderosantacruz.shop',
  'http://localhost:3333',
  'http://localhost:4200' // solo para pruebas locales
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('🚫 Bloqueado por CORS:', origin);
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true
}));

// Middlewares globales
app.use(morgan('dev'));
app.use(express.json({ limit: '5mb' }));
app.use(fileUpload());
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '500mb' }));
app.use(express.static(path.join(__dirname, '..', 'public')));


app.use((req: Request, res: Response, next: NextFunction) => {
  const host = req.headers.host || '';
  const subdomain = host.split('.')[0];
  console.log('paso 44:', host);
  console.log('paso 45:', subdomain);
  console.log('🛰️ Subdominio detectado:', subdomain);

  // Reescribimos 'desarrollo' como 'valle'
  let schema = subdomain;
  if (subdomain === 'desarrollo') {
    schema = 'valle';
  }
  
  if (schema === 'valle' || schema === 'cucuta') {
    (req as any).schema = schema;
    return next();
  }

  // Permitimos pruebas locales (curl, localhost)
  if (host.startsWith('localhost') || host.startsWith('127.0.0.1')) {
    (req as any).schema = 'valle'; // por defecto para pruebas
    return next();
  }

  return res.status(400).json({ message: 'Subdominio no válido' });
});


// 🧠 Middleware de subdominio
// app.use((req: Request, res: Response, next: NextFunction) => {
//   const host = req.headers.host || '';
//   const subdomain = host.split('.')[0];

//   if (subdomain === 'valle' || subdomain === 'cucuta') {
//     (req as any).schema = subdomain;
//     return next();
//   }

//   // Permitimos pruebas locales (curl, localhost)
//   if (host.startsWith('localhost') || host.startsWith('127.0.0.1')) {
//     (req as any).schema = 'valle'; // por defecto para pruebas
//     return next();
//   }

//   return res.status(400).json({ message: 'Subdominio no válido' });
// });

// 🧠 Middleware de subdominio
// app.use((req: Request, res: Response, next: NextFunction) => {
//   const subdomain = req.headers['x-subdomain'] as string;

//   if (subdomain === 'valle' || subdomain === 'cucuta') {
//     req.schema = subdomain;
//     return next();
//   }

//   // fallback para localhost
//   if (req.headers.host?.startsWith('localhost')) {
//     req.schema = 'valle';
//     return next();
//   }

//   return res.status(400).json({ message: 'Subdominio no válido' });
// });


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
  console.error('❌ Error atrapado:', err.message);
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
