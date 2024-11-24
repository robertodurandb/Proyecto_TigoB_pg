const { Pool } = require('pg');
const pool = require('../database/connectiondb');
const winston = require('winston');
const { combine, timestamp, printf } = winston.format;
const DailyRotateFile = require('winston-daily-rotate-file');

const myFormat = printf(({ level, message, timestamp
}) => {
 return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new DailyRotateFile({
            filename: 'combined-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxsize: 100 * 1024, // 100 KB
            maxFiles: '7d' // Keep files for 7 days
          })
        //new winston.transports.File({ filename: 'combined.log' }),
        // new winston.transports.Console({ 
        //      format: myFormat,
        //  })
    ]
});

const insertPagos = async (Data) =>{

    const { fechapago2, dnipago, descripcion, monto, agencia, operacion, hora } = Data;
    try {
        const client = await pool.connect();
        const query = 'INSERT INTO pago2(fechapago2, dnipago, descripcion, monto, agencia, operacion, hora) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [fechapago2, dnipago, descripcion, monto, agencia, operacion, hora];
        const result = await client.query(query, values);
        client.release();
        logger.info("Registro exitoso!!, DNI: "+result.rows[0].dnipago)
        return result.rows[0];
    } catch (error) {
        logger.error(error.detail)
    }
}

const createPago = async(Data) => {
    
    const { fechapago2, dnipago, descripcion, monto, agencia, operacion, hora } = Data;

    try {
        const client = await pool.connect();
        const query = 'INSERT INTO pago2(fechapago2, dnipago, descripcion, monto, agencia, operacion, hora) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [fechapago2, dnipago, descripcion, monto, agencia, operacion, hora];
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
        
        const query = `UPDATE pago2 SET ${Object.keys(Data).map(key => `${key} = '${Data[key]}'`).join(', ')} WHERE idpago2 = $1 RETURNING *`;
        const values = [id_pago];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error(err);
    }
}

const getPagos = async() => {
    try {
        const result = await pool.query("SELECT * FROM pago2");
        return result.rows;
    } catch (error) {
        console.log("Error Get Pagos: "+error);
        throw error;
    }
}

const getPagosAll = async() => {
    try {
        const result = await pool.query("SELECT pg.idpago2, pg.dnipago, cl.nombrecli, cl.apellidocli, to_char(pg.fechapago2, 'DD/MM/YYYY') as fechapago2, pg.hora, pg.descripcion, pg.monto, pg.agencia, pg.operacion FROM pago2 as pg INNER JOIN cliente as cl on pg.dnipago = cl.dnicliente");
        return result.rows;
    } catch (error) {
        console.log("Error Get PagosAll: "+error);
        throw error;
    }
}

const getPagoById = async(id) => {
    const query = 'SELECT * FROM pago2 WHERE idpago2 = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0]
}

module.exports = {
    createPago, updatePago, getPagos, getPagoById, getPagosAll, insertPagos
}