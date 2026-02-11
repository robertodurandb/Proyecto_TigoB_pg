const path = require('path');
const fs = require('fs');

// Determinar la ruta de uploads según el entorno
const getUploadsPath = () => {
  // En producción (Railway), usa el volumen
  if (process.env.NODE_ENV === 'production' && process.env.UPLOADS_VOLUME_PATH) {
    return process.env.UPLOADS_VOLUME_PATH;
  }
  
  // En desarrollo, usa la carpeta local 'uploads'
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  
  // Crear directorio si no existe
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  
  return uploadsDir;
};

// Crear la URL base para acceder a las imágenes
const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.RAILWAY_STATIC_URL || '/api/v1/clientes';
  }
  return '/api/v1/clientes';
};

module.exports = {
  uploadsPath: getUploadsPath(),
  baseUrl: getBaseUrl()
};