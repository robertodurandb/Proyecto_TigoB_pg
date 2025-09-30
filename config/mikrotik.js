// Configuración de todos tus MikroTiks
const mikrotikConfigs = {
  zonaA: {
    host: '198.7.123.156',
    port: 8729,
    user: process.env.MIKROTIK_A_USER,
    password: process.env.MIKROTIK_A_PASSWORD,
    secure: true
  },
  zonaB: {
    host: 'ip.mikrotik.zona.b',
    port: 8729,
    user: process.env.MIKROTIK_B_USER,
    password: process.env.MIKROTIK_B_PASSWORD,
    secure: true
  },
  zonaC: {
    host: 'ip.mikrotik.zona.c',
    port: 8729,
    user: process.env.MIKROTIK_C_USER,
    password: process.env.MIKROTIK_C_PASSWORD,
    secure: true
  }
};

module.exports = mikrotikConfigs
// module.exports = mikrotikConfigs();