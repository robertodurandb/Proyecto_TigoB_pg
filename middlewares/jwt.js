const jwt = require("jsonwebtoken")

 const verifyToken = (req, res, next) => {
    try {
        const headerAuth = req.headers['authorization'];
        
        // Validación más robusta del header
        if (!headerAuth || !headerAuth.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Formato de token inválido. Se espera 'Bearer [token]'"
            });
        }

        const token = headerAuth.split(' ')[1];
        
        // Verificación síncrona con manejo de errores
        const decoded = jwt.verify(token, process.env.SECRET);
        
        // Validación de la estructura del payload
        if (!decoded.username || !decoded.role) {
            return res.status(401).json({
                success: false,
                message: "Token no contiene la estructura esperada"
            });
        }

        // Adjuntar información al request
        req.username = decoded.username;
        req.role = decoded.role;
        
        next();
    } catch (err) {
        // Manejo específico de diferentes errores JWT
        let message = "Token inválido";
        if (err.name === 'TokenExpiredError') {
            message = "Token expirado";
        } else if (err.name === 'JsonWebTokenError') {
            message = "Token malformado";
        }

        return res.status(401).json({
            success: false,
            message: message
        });
};

module.exports = verifyToken