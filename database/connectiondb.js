const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'clientestigo2',
  //database: 'tigo_dbclientes2',
  password: 'Ingenieria5704722',
  port: 5432, // Por defecto, pero puedes modificarlo si es necesario
  max: 100, // Número máximo de conexiones en el pool
  idleTimeoutMillis: 30000, // Tiempo de inactividad antes de cerrar una conexión
  connectionTimeoutMillis: 3000 // Tiempo máximo para establecer una conexión
});

module.exports = pool;