const conexion = require("../database");

const obtenerTurnos = (callback) => {
  conexion.query("SELECT * FROM turnos ORDER BY fecha, hora", callback);
};

const obtenerTurnoPorId = (id, callback) => {
  conexion.query(
    "SELECT * FROM turnos WHERE id = ?",
    [id],
    callback
  );
};

const crearTurno = (datos, callback) => {
  const sql = `
    INSERT INTO turnos
    (nombre, apellido, dni, telefono, domicilio, tramite, categoria, fecha, hora, estado)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  conexion.query(
    sql,
    [
      datos.nombre,
      datos.apellido,
      datos.dni,
      datos.telefono,
      datos.domicilio,
      datos.tramite,
      datos.categoria,
      datos.fecha,
      datos.hora,
      "Pendiente",
    ],
    callback
  );
};

const actualizarEstado = (id, estado, callback) => {
  conexion.query(
    "UPDATE turnos SET estado=? WHERE id=?",
    [estado, id],
    callback
  );
};

const eliminarTurno = (id, callback) => {
  conexion.query(
    "DELETE FROM turnos WHERE id=?",
    [id],
    callback
  );
};

module.exports = {
  obtenerTurnos,
  obtenerTurnoPorId,
  crearTurno,
  actualizarEstado,
  eliminarTurno,
};