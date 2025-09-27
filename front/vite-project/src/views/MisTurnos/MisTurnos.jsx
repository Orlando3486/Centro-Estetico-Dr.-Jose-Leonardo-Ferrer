import { useState, useEffect } from "react";
import Turno from "../../components/Turno";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../../styles/MisTurnos.module.css";
const API_URL = import.meta.env.VITE_API_URL;

const MisTurnos = () => {
  const [citas, setCitas] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setCitas([]);
      return;
    }
    axios
      .get(`${API_URL}/appointments/user/${userId}`, {
        headers: { token: "proyectoM3" },
      })
      .then((response) => {
        setCitas(response.data.data);
      })
      .catch((error) => {
        console.error(
          "Error en la request:",
          error.response?.data || error.message
        );
      });
  }, [userId]);

  const actualizarEstado = (id, nuevoEstado) => {
    setCitas((prev) =>
      prev.map((cita) =>
        cita.id === id ? { ...cita, status: nuevoEstado } : cita
      )
    );
  };
  return (
    <>
      <h2 className={styles.tituloH2}>Mis Turnos:</h2>
      <h3 className={styles.tituloH3}>Listado de turnos:</h3>
      <div>
        {citas.length > 0 ? (
          citas.map((turno) => (
            <Turno
              key={turno.id}
              id={turno.id}
              date={turno.date}
              time={turno.time}
              status={turno.status}
              onUpdate={actualizarEstado}
            />
          ))
        ) : (
          <p>No hay turnos disponibles</p>
        )}
      </div>
      <p>
        ¿Deseas agendar un nuevo turno?{" "}
        <Link to="/agendar" className={styles.link}>
          Agendar
        </Link>
      </p>
    </>
  );
};
export default MisTurnos;
