const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const userRouter = require('./routes/userRoute');
const { uploadsPath, baseUrl } = require('./config/uploads');
const path = require('path');

dotenv.config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde el volumen
app.use('/uploads', express.static(uploadsPath));

// Ruta principal
app.use('/api/v1/clientes', userRouter)

// Ruta para acceder a imágenes (manteniendo compatibilidad)
app.get('/api/v1/clientes/:imagen', (req, res) => {
  const imagen = req.params.imagen;
  const imagePath = path.join(uploadsPath, imagen);
  
  // Verificar si la imagen existe
  const fs = require('fs');
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).json({ error: 'Imagen no encontrada' });
  }
});

// Ruta de salud
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    uploadsPath: uploadsPath,
    filesCount: require('fs').readdirSync(uploadsPath).length
  });
});

// Inicializar jobs (agrega esto después de las rutas)
const initSuspensionJobs = require('./jobs/suspensionJob');
initSuspensionJobs();

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
  console.log('Servidor andando en puerto: ' + PORT);
  console.log('Ruta de uploads: ' + uploadsPath);
  console.log('Entorno: ' + process.env.NODE_ENV || 'development');
});