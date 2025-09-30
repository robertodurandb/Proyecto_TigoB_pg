const authorize = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(401).json({
                success: false,
                message: "Usuario no autenticado"
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "No tienes permisos para esta acción"
            });
        }

        next();
    };
};

// Roles definidos
const ROLES = {
    ADMIN: 'Admin',
    TECNICO: 'Tecnico',
    ESPECIALISTA: 'Especialista',
    VENTAS: 'Ventas'
};

// Middlewares específicos
const requireAdmin = authorize([ROLES.ADMIN]);
const requireTecnico = authorize([ROLES.TECNICO]);
const requireEspecialista = authorize([ROLES.ESPECIALISTA]);
const requireVentas = authorize([ROLES.VENTAS]);
const requireAdminOrVentas = authorize([ROLES.ADMIN, ROLES.VENTAS]);
const requireAdminOrTecnico = authorize([ROLES.ADMIN, ROLES.TECNICO]);

module.exports = {
    authorize,
    requireAdmin,
    requireTecnico,
    requireEspecialista,
    requireVentas,
    requireAdminOrVentas,
    requireAdminOrTecnico,
    ROLES
};