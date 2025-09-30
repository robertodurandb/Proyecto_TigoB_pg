// Ejemplo en un controller
// const MikrotikService = require('../services/mikrotikService');

// const getMikrotikStatus = async (req, res) => {
//   try {
//     const { zone } = req.params;
//     const mikrotik = new MikrotikService(zone);
    
//     const resources = await mikrotik.getSystemResources();
//     const connections = await mikrotik.getActiveConnections();
    
//     mikrotik.disconnect();
    
//     res.json({
//       success: true,
//       data: {
//         resources,
//         connections
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// };

// module.exports = {
//     getMikrotikStatus
// }

const RouterOSAPI = require('node-routeros').RouterOSAPI;

// Configuración de los MikroTiks
const mikrotikConfig = {
  zonaA: {
    host: '198.7.123.156', // Tu IP pública del MikroTik
    port: 8729,
    user: 'api-isp',
    password: 'LaFlorid@6464',
    secure: true, // Usar TLS
    timeout: 10000 // 10 segundos timeout
  }
};

class MikrotikController {

  static async testConnection2() {
    console.log('🔍 Iniciando prueba DESDE tu IP: 38.253.150.163');
    console.log('🎯 Objetivo: MikroTik 198.7.123.156');
    console.log('👤 Usuario: api-isp');

    const conn = new RouterOSAPI({
        host: '198.7.123.156',
        port: 8729,
        user: 'api-isp',
        password: 'LaFlorid@6464', // ← USA LA CORRECTA
        secure: true,
        timeout: 10000
    });

    // Agregar eventos para debug
    conn.on('connected', () => {
        console.log('✅ Evento: connected');
    });

    conn.on('error', (error) => {
        console.log('❌ Evento error:', error.message);
    });

    conn.on('timeout', () => {
        console.log('⏰ Evento: timeout');
    });

    try {
        console.log('🔄 Intentando conexión...');
        await conn.connect();
        console.log('✅ Conexión exitosa!');
        
        const result = await conn.write('/system/resource/print');
        console.log('📊 Modelo:', result[0]['board-name']);
        
        conn.close();
        
    } catch (error) {
        console.log('💥 Error en TU conexión:');
        console.log('   Mensaje:', error.message);
        console.log('   Código:', error.code);
        
        if (error.message.includes('invalid credentials')) {
            console.log('   🔑 Tus credenciales son incorrectas');
            console.log('   Verifica: usuario: api-isp, password: [tu password real]');
        }
    }
  }

  static async testConnection(req, res) {
    const { zone = 'zonaA' } = req.query;
    const config = mikrotikConfig[zone];

    if (!config) {
      return res.status(400).json({
        success: false,
        error: 'Zona no válida'
      });
    }

    console.log(`🔌 Probando conexión a MikroTik ${zone}...`);

    const conn = new RouterOSAPI(config);

    try {
      // Conectar
      await conn.connect();
      console.log('✅ Conexión exitosa');

      // Obtener información del sistema
      const systemInfo = await conn.write('/system/resource/print');
      
      // Obtener interfaces
      const interfaces = await conn.write('/interface/print');
      
      conn.close();

      res.json({
        success: true,
        data: {
          zone,
          model: systemInfo[0]['board-name'],
          version: systemInfo[0]['version'],
          cpuLoad: systemInfo[0]['cpu-load'],
          uptime: systemInfo[0]['uptime'],
          interfaces: interfaces.map(intf => ({
            name: intf.name,
            type: intf.type,
            status: intf.running ? 'active' : 'inactive',
            mtu: intf['actual-mtu']
          }))
        }
      });

    } catch (error) {
      console.error('❌ Error de conexión:', error.message);
      
      conn.close();

      res.status(500).json({
        success: false,
        error: error.message,
        code: error.code,
        details: {
          host: config.host,
          port: config.port,
          message: this.getErrorDescription(error)
        }
      });
    }
  }

  static getErrorDescription(error) {
    if (error.code === 'ECONNREFUSED') {
      return 'El puerto está cerrado o el servicio API no está activo';
    } else if (error.code === 'ETIMEDOUT') {
      return 'Timeout - Verifica firewall y credenciales';
    } else if (error.message.includes('invalid credentials')) {
      return 'Usuario o contraseña incorrectos';
    } else if (error.code === 'ENOTFOUND') {
      return 'No se puede resolver la dirección IP';
    } else {
      return 'Error desconocido';
    }
  }

  static async getSystemResources(req, res) {
    const { zone = 'zonaA' } = req.query;
    const config = mikrotikConfig[zone];

    try {
      const conn = new RouterOSAPI(config);
      await conn.connect();
      
      const resources = await conn.write('/system/resource/print');
      const identity = await conn.write('/system/identity/print');
      
      conn.close();

      res.json({
        success: true,
        data: {
          identity: identity[0].name,
          model: resources[0]['board-name'],
          version: resources[0]['version'],
          cpuLoad: resources[0]['cpu-load'],
          freeMemory: resources[0]['free-memory'],
          totalMemory: resources[0]['total-memory'],
          uptime: resources[0]['uptime']
        }
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = MikrotikController;