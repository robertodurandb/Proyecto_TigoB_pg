const cron = require('node-cron');
const recojoequiposService = require('../services/recojoequiposService');

const initSuspensionJobs = () => {
    // Ejecutar diario a las 12:00 AM
    cron.schedule('0 0 * * *', async () => {
        console.log('Ejecutando verificación de suspensiones...');
        try {
            const results = await recojoequiposService.verificarSuspensiones();
            if (results.length > 0) {
                console.log(`Contratos marcados para recojo: ${results.length}`);
                // Aquí puedes agregar notificaciones o logs adicionales
            }
        } catch (error) {
            console.error('Error en el job de suspensiones:', error);
        }
    });
};

module.exports = initSuspensionJobs;