const servicio = require("./turnoservice");

exports.listar = (req, res) => {
  servicio.obtenerTurnos((err, datos) => {
    if (err) return res.status(500).json(err);
    res.json(datos);
  });
};

exports.obtener = (req, res) => {
  servicio.obtenerTurnoPorId(req.params.id, (err, datos) => {
    if (err) return res.status(500).json(err);
    res.json(datos[0]);
  });
};

exports.crear = (req, res) => {
  servicio.crearTurno(req.body, (err) => {
    if (err) return res.status(500).json(err);

    res.json({
      mensaje: "Turno creado correctamente",
    });
  });
};

exports.actualizarEstado = (req, res) => {
  servicio.actualizarEstado(
    req.params.id,
    req.body.estado,
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        mensaje: "Estado actualizado",
      });
    }
  );
};

exports.eliminar = (req, res) => {
  servicio.eliminarTurno(req.params.id, (err) => {
    if (err) return res.status(500).json(err);

    res.json({
      mensaje: "Turno eliminado",
    });
  });
};