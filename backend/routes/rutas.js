const express = require("express");
const verificarToken = require("../middleware/authMiddleware");
const verificarAdmin = require("../middleware/adminMiddleware");
const {
    buscarUsuarios,
    obtenerUsuarios,
    crearUsuario,
    eliminarUsuario,
    actualizarUsuario,
    login,
    registro
} = require("../controllers/controller");

const router = express.Router();

// CRUD de Usuarios (requiere autenticación y rol admin)
router.get("/usuarios/:id", verificarToken, verificarAdmin, buscarUsuarios);
router.get("/usuarios", verificarToken, verificarAdmin, obtenerUsuarios);
router.post("/usuarios", verificarToken, verificarAdmin, crearUsuario);
router.put("/usuarios/:id", verificarToken, verificarAdmin, actualizarUsuario);
router.delete("/usuarios/:id", verificarToken, verificarAdmin, eliminarUsuario);

// Autenticación (sin requerimientos de token)
router.post("/login", login);
router.post("/registro", registro);

module.exports = router;
