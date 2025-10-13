const { Pool } = require('pg');
const pool = require('../database/connectiondb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const doLogin = async(req, res) => {
    const { id_user, password_user } = req.body;

    // Validación básica del input
    if (!id_user || !password_user) {
        return res.status(400).json({
            success: false,
            message: "Usuario y contraseña son requeridos"
        });
    }
    let client;
    try {
        client = await pool.connect();
        const query = `
            SELECT u.*, s.id_sede as sede_id, s.nombre_sede as sede_nombre 
            FROM usuarios u 
            LEFT JOIN sedes s ON u.sede_id = s.id_sede 
            WHERE u.id_user = $1 AND u.estado = true
        `;
        const values = [id_user.toLowerCase()];
        const result = await client.query(query, values);
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuario o clave erróneo"
            });
        }

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password_user, user.password_user);
  
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Usuario o clave erróneo"
            });
        }

        // Payload más completo y consistente
        const payload = {
            username: user.id_user,
            role: user.perfil_user,
            userId: user.id_user, // Si tienes un ID único en la tabla
            sedeId: user.sede_id  // Incluir sedeId en el token
        };

        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });
        
        // Respuesta estandarizada
        res.status(200).json({ 
            success: true,
            token: token,
            expiresIn: 3600,
            user: {
                username: user.id_user,
                role: user.perfil_user,
                sedeId: user.sede_id,
                sedeNombre: user.sede_nombre // Enviar nombre para mostrar en frontend
            }
        });
        
    } catch (err) {
        console.error("Error en login:", err);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        });
    } finally {
        if (client) client.release();
    }
};
module.exports = { doLogin }