function verificarAdmin(req, res, next) {
    if (!req.usuario) {
        return res.status(401).json({
            error: "Usuario no autenticado"
        });
    }

    if (req.usuario.rol === "admin") {
        next();
    } else {
        res.status(403).json({
            error: "Acceso denegado: se requiere rol de administrador"
        });
    }
}

module.exports = verificarAdmin;