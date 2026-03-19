import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import styles from "../../styles/Login.module.css";
import { turnoValidate } from "../../helpers/turnoValidate";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const Turnero = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/appointments/schedule`,
        values,
        {
          headers: { token: "proyectoM3" },
        }
      );
      if (response.status === 201) {
        await Swal.fire({
          icon: "success",
          title: `Turno agendado con Exito`,
          confirmButtonText: "Ver turnos",
        });
      }

      resetForm();
      navigate("/turnos");
    } catch (error) {
      if (error.response?.status === 400) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.msg || "No se pudo agendar el turno",
          confirmButtonText: "Intentar de nuevo",
        });
      }
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className={styles.contenedor_formulario}>
      <div className={styles.contenedorLoader}>
        {loading && <div className={styles.loader}></div>}
      </div>
      <Formik
        initialValues={{
          date: "",
          time: "",
          userId: localStorage.getItem("userId"),
        }}
        validate={turnoValidate}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className={styles.formulario}>
            <h2 className={styles.tituloH2}>Agendar Turno</h2>

            <div className={styles.inputError}>
              <label>Fecha:</label>

              <Field
                type="date"
                name="date"
                className={styles.inputs_formulario}
              />
              <ErrorMessage
                name="date"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div className={styles.inputError}>
              <label>Hora:</label>
              <Field
                type="time"
                name="time"
                className={styles.inputs_formulario}
              />
              <ErrorMessage
                name="time"
                component="div"
                style={{ color: "red" }}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.boton_formulario}>
              Agendar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Turnero;
