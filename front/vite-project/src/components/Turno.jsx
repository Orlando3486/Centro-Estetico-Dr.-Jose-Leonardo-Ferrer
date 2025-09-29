import axios from "axios";
import Swal from "sweetalert2";
import styles from "../styles/Turno.module.css";
import statusStyle from "../helpers/statusStyle";
const API_URL = import.meta.env.VITE_API_URL;

const Turno = ({ id, date, time, status, onUpdate }) => {
  const cancelarTurno = async () => {
    // Paso 1: mostrar confirmación
    const result = await Swal.fire({
      title: "¿Cancelar turno?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No, mantener",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await axios.put(
          `${API_URL}/appointments/cancel/${id}`,
          { status: "cancelled" },
          {
            headers: {
              token: "proyectoM3",
            },
          }
        );

        onUpdate(id, "cancelled");

        Swal.fire({
          title: "¡Turno cancelado!",
          text: "Tu turno fue cancelado con éxito.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } catch (error) {
        console.error(
          "Error al cancelar turno:",
          error.response?.data || error.message
        );

        Swal.fire({
          title: "Error",
          text: "No se pudo cancelar el turno. Intenta nuevamente.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }
    }
  };

  return (
    <div className={styles.turno}>
      <h4>Id: {id}</h4>
      <h4>Fecha: {date}</h4>
      <h4>Hora: {time}</h4>
      <h4>
        Status: <span style={statusStyle(status)}>{status}</span>
      </h4>

      {status !== "cancelled" && (
        <button
          className={styles.boton}
          onClick={cancelarTurno}
          disabled={status === "cancelled"}>
          Cancelar
        </button>
      )}
    </div>
  );
};

export default Turno;
