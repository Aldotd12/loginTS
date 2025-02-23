import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { registerUser, loginUser } from './auth';

const app = express();
const PORT = 3000;

// Middleware para analizar JSON
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '../public')));

// Rutas de API
app.post('/register', registerUser);
app.post('/login', loginUser);

// Ruta por defecto (redirige a login.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://your_host:${PORT}`);
});