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

// Controlador de turnos
const turno = require("../controllers/turnocontroller");

const router = express.Router();


// =======================
// USUARIOS
// =======================

router.get("/usuarios/:id", verificarToken, verificarAdmin, buscarUsuarios);
router.get("/usuarios", verificarToken, verificarAdmin, obtenerUsuarios);
router.post("/usuarios", verificarToken, verificarAdmin, crearUsuario);
router.put("/usuarios/:id", verificarToken, verificarAdmin, actualizarUsuario);
router.delete("/usuarios/:id", verificarToken, verificarAdmin, eliminarUsuario);


// =======================
// LOGIN
// =======================

router.post("/login", login);
router.post("/registro", registro);


// =======================
// TURNOS LICENCIA
// =======================

router.get("/turnos", verificarToken, turno.listar);

router.get("/turnos/:id", verificarToken, turno.obtener);

router.post("/turnos", verificarToken, turno.crear);

router.put("/turnos/:id", verificarToken, turno.actualizarEstado);

router.delete("/turnos/:id", verificarToken, turno.eliminar);


module.exports = router;
