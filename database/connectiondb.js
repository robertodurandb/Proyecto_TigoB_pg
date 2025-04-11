const { Pool } = require('pg');
const dotenv = require('dotenv')

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'clientestigo2',
  password: process.env.DB_PASS || 'Ingenieria5704722',
  port: process.env.DB_PORT || 5432, // Por defecto, pero puedes modificarlo si es necesario
  max: 5, // Número máximo de conexiones en el pool
  idleTimeoutMillis: 30000, // Tiempo de inactividad antes de cerrar una conexión 30seg
  connectionTimeoutMillis: 5000 // Tiempo máximo para establecer una conexión 5 segundos
});

module.exports = pool;