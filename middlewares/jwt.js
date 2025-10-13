const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    
    if (!headerAuth) {
        return res.status(401).json({
            success: false,
            message: "Token requerido"
        });
    }

    const tokenParts = headerAuth.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({
            success: false,
            message: "Formato de token inválido"
        });
    }

    const token = tokenParts[1];

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "Token inválido o expirado"
            });
        }

        // Verificación completa de las propiedades esperadas
        if (!decoded || !decoded.username || !decoded.role || !decoded.userId) {
            return res.status(401).json({
                success: false,
                message: "Token mal formado"
            });
        }

        // Asignamos los valores decodificados al request
        req.user = {
            username: decoded.username,
            role: decoded.role,
            userId: decoded.userId,
            sedeId: decoded.sedeId || null // Opcional, si está disponible
        };
        
        next();
    });
};


module.exports = verifyToken