const authorizeSede = (options = {}) => {
    return async (req, res, next) => {
        try {
            const user = req.user;
            
            // ADMIN tiene acceso total
            if (user.role === 'Admin') {
                if (req.body.sedecli && options.allowAdminOverride) {
                    req.sedeFilter = req.body.sedecli;
                } else {
                    req.sedeFilter = null;
                }
                return next();
            }

            // Para otros roles, usar sedeId del token
            if (!user.sedeId) {
                return res.status(403).json({
                    success: false,
                    message: "Usuario no tiene sede asignada"
                });
            }

            // Ventas: siempre usa su sede
            if (user.role === 'Ventas') {
                req.body.sedecli = user.sedeId;
                req.sedeFilter = user.sedeId;
            }
            
            // Técnico: solo ve datos de su sede
            if (user.role === 'Tecnico') {
                req.sedeFilter = user.sedeId;
            }

            req.userSede = user.sedeId;
            next();
            
        } catch (error) {
            console.error("Error en autorización de sede:", error);
            return res.status(500).json({
                success: false,
                message: "Error interno del servidor"
            });
        }
    };
};

module.exports = { authorizeSede };