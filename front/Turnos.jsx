import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Turnos.css";

export default function Turnos() {

  const [turnos, setTurnos] = useState(() => {
    const guardados = localStorage.getItem("turnos");
    return guardados ? JSON.parse(guardados) : [];
  });

  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [tramite, setTramite] = useState("Primera Licencia");
  const [categoria, setCategoria] = useState("B1");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  useEffect(() => {
    localStorage.setItem("turnos", JSON.stringify(turnos));
  }, [turnos]);

  function calcularProximaCita(fecha, tramite) {
    const f = new Date(fecha);

    switch (tramite) {
      case "Primera Licencia":
        f.setDate(f.getDate() + 30);
        break;

      case "Renovación":
        f.setFullYear(f.getFullYear() + 5);
        break;

      case "Duplicado":
        f.setDate(f.getDate() + 7);
        break;

      case "Examen Teórico":
        f.setDate(f.getDate() + 10);
        break;

      case "Examen Práctico":
        f.setDate(f.getDate() + 15);
        break;

      case "Control de Vista":
        f.setFullYear(f.getFullYear() + 2);
        break;

      default:
        return "Sin próxima cita";
    }

    return f.toLocaleDateString("es-AR");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !dni || !fecha || !hora) {
      alert("Complete todos los campos.");
      return;
    }

    const nuevoTurno = {
      id: Date.now(),
      nombre,
      dni,
      tramite,
      categoria,
      fecha,
      hora,
      estado: "Pendiente",
    };

    setTurnos([...turnos, nuevoTurno]);

    setNombre("");
    setDni("");
    setFecha("");
    setHora("");
    setTramite("Primera Licencia");
    setCategoria("B1");
  };

  const eliminarTurno = (id) => {
    setTurnos(turnos.filter((t) => t.id !== id));
  };

  return (
    <div className="turnos-page">

      <header className="header">

        <div className="logo">
          <img src="imag/logoSF.png" alt="Municipalidad" />
        </div>

        <nav className="navbar">
          <Link to="/inicio"><button>Inicio</button></Link>
          <Link to="/servicios"><button>Servicios</button></Link>
          <Link to="/turnos"><button>Turnos</button></Link>
          <Link to="/login"><button>Cerrar sesión</button></Link>
        </nav>

      </header>

      <main className="turnos-main">

        <h1>Turnero Municipal</h1>

        <p>
          Solicite su turno para obtener o renovar la Licencia Nacional de
          Conducir.
        </p>

        <div className="turnos-container">

          <form className="turnos-form" onSubmit={handleSubmit}>

            <label>
              Nombre y Apellido
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </label>

            <label>
              DNI
              <input
                type="number"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
              />
            </label>

            <label>
              Trámite
              <select
                value={tramite}
                onChange={(e) => setTramite(e.target.value)}
              >
                <option>Primera Licencia</option>
                <option>Renovación</option>
                <option>Duplicado</option>
                <option>Examen Teórico</option>
                <option>Examen Práctico</option>
                <option>Control de Vista</option>
              </select>
            </label>

            <label>
              Categoría
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option>A1</option>
                <option>A2</option>
                <option>B1</option>
                <option>B2</option>
                <option>C</option>
                <option>D</option>
                <option>E</option>
                <option>G</option>
              </select>
            </label>

            <label>
              Fecha
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </label>

            <label>
              Hora
              <input
                type="time"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
              />
            </label>

            <button type="submit">
              Solicitar turno
            </button>

          </form>

        </div>

        <section className="turnos-lista">

          <h2>Turnos registrados</h2>

          {turnos.length === 0 ? (
            <p>No existen turnos cargados.</p>
          ) : (
            <ul>

              {turnos.map((t) => (
                <li key={t.id} className="turno-card">

                  <ul>

                    <li><strong>Solicitante:</strong> {t.nombre}</li>

                    <li><strong>DNI:</strong> {t.dni}</li>

                    <li><strong>Trámite:</strong> {t.tramite}</li>

                    <li><strong>Categoría:</strong> {t.categoria}</li>

                    <li><strong>Fecha:</strong> {new Date(t.fecha).toLocaleDateString("es-AR")}</li>

                    <li><strong>Hora:</strong> {t.hora}</li>

                    <li>
                      <strong>Estado:</strong>
                      <span style={{ color: "orange" }}>
                        {" "}🟡 {t.estado}
                      </span>
                    </li>

                    <li>
                      <strong>Próxima cita:</strong>{" "}
                      {calcularProximaCita(t.fecha, t.tramite)}
                    </li>

                    <li>

                      <button
                        onClick={() => eliminarTurno(t.id)}
                      >
                        Eliminar turno
                      </button>

                    </li>

                  </ul>

                </li>
              ))}

            </ul>
          )}

        </section>

      </main>

      <footer className="footer">
        © Municipalidad - Sistema de Turnos para Licencias de Conducir
      </footer>

    </div>
  );
}