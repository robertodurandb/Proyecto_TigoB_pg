const { Pool } = require('pg');
const pool = require('../database/connectiondb');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const timezoned = () => {
    return new Date().toLocaleString('en-US', {
        timeZone: 'America/Lima'
    });
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: timezoned }),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
          })
    ),
    transports: [
        new DailyRotateFile({
            filename: 'combined-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxsize: 100 * 1024, // 100 KB
            maxFiles: '7d', // Keep files for 7 days
          })

    ]
});

const insertPagos = async (Data) =>{

    const { fecha_operacion, dnipago, descripcion, monto, agencia, operacion, hora } = Data;
    try {
        const client = await pool.connect();
        const query = 'INSERT INTO pago(fecha_operacion, dnipago, descripcion, monto, agencia, operacion, hora) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [fecha_operacion, dnipago, descripcion, monto, agencia, operacion, hora];
        const result = await client.query(query, values);
        client.release();
        logger.info("Inserción Correcta (dnipago)="+result.rows[0].dnipago+" dni encontrado en la tabla cliente.")
        return result.rows[0];
    } catch (error) {
        logger.error(error.detail)
    }
}

const createPago = async(Data) => {
    
    const { fecha_operacion, dnipago, descripcion, monto, agencia, operacion, hora } = Data;

    try {
        const client = await pool.connect();
        const query = 'INSERT INTO pago(fecha_operacion, dnipago, descripcion, monto, agencia, operacion, hora) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [fecha_operacion, dnipago, descripcion, monto, agencia, operacion, hora];
        const result = await client.query(query, values);
        client.release();
        console.log("SOY PAGO_MODEL")
        console.log(result.rows)
        return result.rows[0];
    
    } catch (error) {
        console.log("Error creating Pago: "+error);
        throw error;
    }
};

// Función para actualizar un Pago
const updatePago = async (id, Data) =>{
    try {
        const id_pago = id.id;
        const client = await pool.connect();
        
        const query = `UPDATE pago SET ${Object.keys(Data).map(key => `${key} = '${Data[key]}'`).join(', ')} WHERE idpago = $1 RETURNING *`;
        const values = [id_pago];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error(err);
    }
}

const getPagos = async() => {
    try {
        const result = await pool.query("SELECT * FROM pago");
        return result.rows;
    } catch (error) {
        console.log("Error Get Pagos: "+error);
        throw error;
    }
}

const getPagosAll = async() => {
    try {
        const result = await pool.query("SELECT pg.idpago, pg.dnipago, cl.nombrecli, cl.apellidocli, to_char(pg.fechapago2, 'DD/MM/YYYY') as fechapago, pg.hora, pg.descripcion, pg.monto, pg.agencia, pg.operacion FROM pago2 as pg INNER JOIN cliente as cl on pg.dnipago = cl.dnicliente");
        return result.rows;
    } catch (error) {
        console.log("Error Get PagosAll: "+error);
        throw error;
    }
}

const getPagoById = async(id) => {
    const query = 'SELECT * FROM pago WHERE idpago = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0]
}
const getControlPagos = async() => {
    try {
        const result = await pool.query("WITH PagosPorContrato AS (SELECT co.num_contrato, c.dnicliente, c.nombrecli, c.apellidocli, to_char(it.fechainstalacion, 'DD/MM/YYYY') AS incio_servicio, co.diapago, es.nombre_estado AS servicio, (current_date-it.fechainstalacion)/30 AS total_meses, pl.precioplan AS pago_mensual, pl.precioplan * ((current_date - it.fechainstalacion)/30) AS deuda_total, SUM(pg.monto) AS total_pagado, (pl.precioplan * ((current_date - it.fechainstalacion)/30)) - SUM(pg.monto) AS pago_pendiente FROM cliente c INNER JOIN contrato co ON c.dnicliente = co.cliente_dnicliente LEFT JOIN pago pg ON co.cliente_dnicliente = pg.dnipago INNER JOIN planes as pl ON co.planes_idplanes=pl.idplanes INNER JOIN instalacion as it on co.instalacion_idinstalacion=it.idinstalacion INNER JOIN estado as es on co.estado_servicio=es.id_estado WHERE co.estado_servicio = 1 OR co.estado_servicio = 3 GROUP BY co.num_contrato, c.dnicliente, c.nombrecli, c.apellidocli, it.fechainstalacion, pl.precioplan, es.nombre_estado) SELECT*, deuda_total - total_pagado AS pago_pendiente, CASE WHEN deuda_total - total_pagado <= 0 THEN 'Al día' ELSE 'Pendiente' END AS estado FROM PagosPorContrato");
        return result.rows;
    } catch (error) {
        console.log("Error Get PagosControlPagos: "+error);
        throw error;
    }
}

module.exports = {
    createPago, updatePago, getPagos, getPagoById, getPagosAll, insertPagos, getControlPagos
}