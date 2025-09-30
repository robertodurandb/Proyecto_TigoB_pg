const RouterOSAPI = require('node-routeros').RouterOSAPI;
const mikrotikConfigs = require('../config/mikrotik');

class MikrotikService {
  constructor(zone) {
    this.config = mikrotikConfigs[zone];
    this.connection = null;
  }

  // Conectar al dispositivo
  async connect() {
    try {
      this.connection = new RouterOSAPI(this.config);
      await this.connection.connect();
      return true;
    } catch (error) {
      console.error(`Error conectando a MikroTik ${this.config.host}:`, error);
      throw error;
    }
  }

  // Desconectar
  disconnect() {
    if (this.connection) {
      this.connection.close();
      this.connection = null;
    }
  }

  // Ejecutar comando
  async executeCommand(command, params = []) {
    try {
      if (!this.connection || !this.connection.connected) {
        await this.connect();
      }

      const result = await this.connection.write(command, params);
      return result;
    } catch (error) {
      console.error('Error ejecutando comando:', error);
      throw error;
    }
  }

  // Métodos específicos para tu aplicación
  async getSystemResources() {
    return await this.executeCommand('/system/resource/print');
  }

  async createDHCPLease(leaseData) {
    return await this.executeCommand('/ip/dhcp-server/lease/add', leaseData);
  }

  async getActiveConnections() {
    return await this.executeCommand('/interface/print');
  }
  
  // Agrega aquí más métodos según tus necesidades
}

module.exports = MikrotikService;