const { Pool } = require('pg');
const pool = require('../database/connectiondb');

const createInstalacion = async(Data) => {
    
    const { contrato, ordentrabajo_idordentrabajo, planactual_idplanes, clienteactual_dnicliente, fecha_inicio_contrato, condicion_equipo, tipo_equipo, cobro_equipo, cobro_instalacion, comentario_instalacion, caja_instalacion, splitter_instalacion, user_mk, estado_servicio, user_create, fecha_proximo_pago, ciclo_facturacion, dia_pago, latitud, longitud} = Data;
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO instalacion_contrato(contrato, ordentrabajo_idordentrabajo, planactual_idplanes, clienteactual_dnicliente, fecha_inicio_contrato, condicion_equipo, tipo_equipo, cobro_equipo, cobro_instalacion, comentario_instalacion, caja_instalacion, splitter_instalacion, user_mk, estado_servicio, user_create, fecha_proximo_pago, ciclo_facturacion, dia_pago, latitud, longitud) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) RETURNING *';
        const values = [contrato, ordentrabajo_idordentrabajo, planactual_idplanes, clienteactual_dnicliente, fecha_inicio_contrato, condicion_equipo, tipo_equipo, cobro_equipo, cobro_instalacion, comentario_instalacion, caja_instalacion, splitter_instalacion, user_mk, estado_servicio, user_create, fecha_proximo_pago, ciclo_facturacion, dia_pago, latitud, longitud];
        const result = await client.query(query, values);
        console.log("SOY instalacion_contrato MODEL")
        console.log(result.rows)
        return result.rows[0];
    } catch (error) {
        console.log("Error creating instalacion_contrato: "+error);
        throw error;
    } finally {
        client.release(); // Liberar conexión SIEMPRE
    }
};

// Función para actualizar una INSTALACION
const updateInstalacion = async (id, Data) =>{
    const client = await pool.connect(); // Adquiriendo conexión
    try {
        const num_contrato = id.id;
        const query = `UPDATE instalacion_contrato SET ${Object.keys(Data).map(key => `${key} = '${Data[key]}'`).join(', ')} WHERE num_contrato = $1 RETURNING *`;
        const values = [num_contrato];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error("Error en updateInstalacion:",err);
        throw err; //Re-lanzar el error para manejarlo en el controlador
    } finally {
        client.release(); // Liberar conexión SIEMPRE
    }
};

const getInstalaciones = async() => {
    try {
        const result = await pool.query("SELECT * FROM instalacion_contrato");
        return result.rows;
    } catch (error) {
        console.log("Error Get Instalacion_contratos: "+error);
        throw error;
    }
}

const getInstalacionById = async(id) => {
    const query = 'SELECT * FROM instalacion_contrato WHERE num_contrato = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0]
}

//******* TODOS LOS CLIENTES ACTIVOS Y SUSPENDIDOS ******/
const getInstalacionesAll = async() => {
    try {
        const result = await pool.query("select ic.num_contrato, ic.contrato, ot.id_ordentrabajo, ot.clienteinicial_dnicliente, ot.user_create as user_venta, ot.fecha_create as fecha_venta, ic.clienteactual_dnicliente, cl.nombrecli, cl.apellidocli, cl.distritocli, cl.direccioncli, cl.referenciacli, cl.geolocalizacion, cl.telefonocli, ot.planinicial_idplanes, ic.planactual_idplanes, ic.descuento, ic.precio_final, ic.user_mk, pl.nombreplan, pl.descplan, pl.precioplan, pl.velocidadplan, to_char(ot.fecha_create, 'YYYY-MM-DD') as fecha_ot, to_char(ic.fecha_inicio_contrato, 'YYYY-MM-DD') as fecha_inicio_contrato, ic.user_create as tecnico_instalador, to_char(ic.fecha_create, 'DD/MM/YYYY') as fecha_instalacion, ic.comentario_instalacion, ic.caja_instalacion, ic.splitter_instalacion, ic.estado_servicio, es.nombre_estado, ic.condicion_equipo, ic.tipo_equipo, ic.cobro_equipo, ic.cobro_instalacion, ot.nombreimg_contrato, ic.ciclo_facturacion, ic.fecha_proximo_pago, ic.fecha_ultimo_pago, ic.dia_pago, ot.nombreimg_caja_antes, ot.nombreimg_potencia_antes, ot.nombreimg_caja_despues, ot.nombreimg_potencia_despues, ot.nombreimg_instalacion_interna, ot.nombreimg_potencia_interna, ot.nombreimg_casa, ic.latitud, ic.longitud, to_char(ic.fecha_suspension, 'DD/MM') as fecha_suspension, to_char(ic.fecha_activacion, 'DD/MM') as fecha_activacion, ic.pendiente_recojo, to_char(ic.fecha_programacion_recojo, 'DD/MM') as fecha_programacion_recojo, ic.comentario, ic.pendiente, ic.estado_pendiente, sd.nombre_sede, ic.fecha_baja, ic.user_baja  from instalacion_contrato as ic INNER JOIN ordentrabajo as ot on ic.ordentrabajo_idordentrabajo=ot.id_ordentrabajo INNER JOIN cliente as cl on ic.clienteactual_dnicliente=cl.dnicliente INNER JOIN planes as pl on ic.planactual_idplanes=pl.idplanes INNER JOIN estado as es on ic.estado_servicio=es.id_estado INNER JOIN sedes as sd on cl.sedecli=sd.id_sede WHERE ic.estado_servicio=1 OR ic.estado_servicio=3");
        return result.rows;
    } catch (error) {
        console.log("Error Get Instalaciones Activos y Suspendidos: "+error);
        throw error;
    }
}
//******* TODOS LOS CLIENTES INACTIVOS ******/
const getInstalacionesAll2 = async() => {
    try {
        const result = await pool.query("select ic.num_contrato, ic.contrato, ot.id_ordentrabajo, ot.clienteinicial_dnicliente, ic.clienteactual_dnicliente, cl.nombrecli, cl.apellidocli, cl.distritocli, cl.direccioncli, cl.referenciacli, cl.geolocalizacion, cl.telefonocli, ot.planinicial_idplanes, ic.planactual_idplanes, ic.user_mk, pl.nombreplan, pl.descplan, pl.precioplan, pl.velocidadplan, to_char(ot.fecha_create, 'YYYY-MM-DD') as fecha_ot, to_char(ic.fecha_inicio_contrato, 'YYYY-MM-DD') as fecha_inicio_contrato, ic.user_create as tecnico_instalador, to_char(ic.fecha_create, 'DD/MM/YYYY') as fecha_instalacion, ic.comentario_instalacion, ic.caja_instalacion, ic.splitter_instalacion, ic.estado_servicio, es.nombre_estado, ic.condicion_equipo, ic.tipo_equipo, ic.cobro_equipo, ic.cobro_instalacion, ot.nombreimg_contrato, ic.ciclo_facturacion, ic.fecha_proximo_pago, ic.fecha_ultimo_pago, ic.dia_pago, ot.nombreimg_caja_antes, ot.nombreimg_potencia_antes, ot.nombreimg_caja_despues, ot.nombreimg_potencia_despues, ot.nombreimg_instalacion_interna, ot.nombreimg_potencia_interna, ot.nombreimg_casa, ic.latitud, ic.longitud, to_char(ic.fecha_suspension, 'DD/MM') as fecha_suspension, to_char(ic.fecha_activacion, 'DD/MM') as fecha_activacion, ic.pendiente_recojo, to_char(ic.fecha_programacion_recojo, 'DD/MM') as fecha_programacion_recojo, ic.comentario, ic.pendiente, ic.estado_pendiente, sd.nombre_sede, to_char(ic.fecha_baja, 'DD/MM/YYYY') as fecha_baja, ic.user_baja from instalacion_contrato as ic INNER JOIN ordentrabajo as ot on ic.ordentrabajo_idordentrabajo=ot.id_ordentrabajo INNER JOIN cliente as cl on ic.clienteactual_dnicliente=cl.dnicliente INNER JOIN planes as pl on ic.planactual_idplanes=pl.idplanes INNER JOIN estado as es on ic.estado_servicio=es.id_estado INNER JOIN sedes as sd on cl.sedecli=sd.id_sede WHERE ic.estado_servicio=2 ORDER BY fecha_baja DESC");
        return result.rows;
    } catch (error) {
        console.log("Error Get Instalaciones Inactivos: "+error);
        throw error;
    }
}


// Función para actualizar IMAGEN 1 CONTRATO
const updateImagen = async (id, Data) =>{
    const client = await pool.connect();
    try {
        const id_ordentrabajo = id.id;
        const query = `UPDATE ordentrabajo SET ${Object.keys(Data).map(key => `${key} = '${Data[key]}'`).join(', ')} WHERE id_ordentrabajo = $1 RETURNING *`;
        const values = [id_ordentrabajo];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error("Error en updateImagen",err);
        throw err;
    } finally {
        client.release(); // Liberar conexión SIEMPRE
    }
};

//FUNCION PARA CORREGIR EL DNI DE UN CLIENTE POR ERROR DE DIGITACION
// FUNCIÓN PARA CORREGIR EL DNI DE UN CLIENTE POR ERROR DE DIGITACIÓN PROPUESTO POR LA IA DEEPSEEK
const corregirDniCliente = async (nuevo_dni, dni_incorrecto) => {
    const client = await pool.connect(); // Obtenemos un cliente del pool para la transacción
    
    try {
        await client.query('BEGIN'); // Iniciamos la transacción

        // 1. Verificar que el nuevo DNI no exista ya en la base de datos
        const verificarDni = await client.query(
            'SELECT 1 FROM cliente WHERE dnicliente = $1', 
            [nuevo_dni]
        );
        if (verificarDni.rows.length > 0) {
            throw new Error('El nuevo DNI ya existe en la base de datos');
        }

        // 2. Verificar que el cliente con DNI incorrecto exista
        const verificarCliente = await client.query(
            'SELECT * FROM cliente WHERE dnicliente = $1', 
            [dni_incorrecto]
        );
        
        if (verificarCliente.rows.length === 0) {
            throw new Error('No existe un cliente con el DNI incorrecto proporcionado');
        }

        const clienteOriginal = verificarCliente.rows[0];

        // 3. Insertar nuevo cliente con los mismos datos pero DNI corregido
        const insertQuery = `
            INSERT INTO cliente(
                dnicliente, 
                nombrecli, 
                apellidocli, 
                direccioncli, 
                referenciacli, 
                geolocalizacion, 
                telefonocli, 
                telefonocli2, 
                sedecli, 
                user_create,
                fecha_create
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
            RETURNING *`;
        
        const { rows: nuevoCliente } = await client.query(insertQuery, [
            nuevo_dni,
            clienteOriginal.nombrecli,
            clienteOriginal.apellidocli,
            clienteOriginal.direccioncli,
            clienteOriginal.referenciacli,
            clienteOriginal.geolocalizacion,
            clienteOriginal.telefonocli,
            clienteOriginal.telefonocli2,
            clienteOriginal.sedecli,
            clienteOriginal.user_create,
            clienteOriginal.fecha_create
        ]);

        // 4. Actualizar todos los contratos asociados al nuevo DNI
        await client.query(
            'UPDATE instalacion_contrato SET clienteactual_dnicliente = $1 WHERE clienteactual_dnicliente = $2',
            [nuevo_dni, dni_incorrecto]
        );
        await client.query(
            'UPDATE ordentrabajo SET clienteinicial_dnicliente = $1 WHERE clienteinicial_dnicliente = $2',
            [nuevo_dni, dni_incorrecto]
        );

        // 5. Eliminar el cliente con el DNI incorrecto
        await client.query(
            'DELETE FROM cliente WHERE dnicliente = $1',
            [dni_incorrecto]
        );

        await client.query('COMMIT'); // Confirmamos la transacción
        return nuevoCliente[0]; // Devolvemos el nuevo cliente creado

    } catch (error) {
        await client.query('ROLLBACK'); // Si hay error, hacemos rollback
        console.error('Error en la transacción de corrección de DNI:', error);
        throw error; // Relanzamos el error para manejarlo en el controlador
    } finally {
        client.release(); // Liberamos el cliente del pool
    }
};

module.exports = {
    createInstalacion, updateInstalacion, getInstalaciones, getInstalacionById, getInstalacionesAll, getInstalacionesAll2, updateImagen, corregirDniCliente
}