import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import styles from "../../styles/Login.module.css";
import { turnoValidate } from "../../helpers/turnoValidate";
import { useNavigate } from "react-router-dom";

const Turnero = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/appointments/schedule",
        values,
        {
          headers: { token: "proyectoM3" },
        }
      );
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: `Tuno agendado con Exito`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
      navigate("/turnos");

      resetForm();
    } catch (error) {
      if (error.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.msg || "No se pudo agendar el turno",
          confirmButtonText: "Intentar de nuevo",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.contenedor_formulario}>
      <Formik
        initialValues={{ date: "", time: "", userId: "" }}
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
                type="text"
                name="time"
                className={styles.inputs_formulario}
              />
              <ErrorMessage
                name="time"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div className={styles.inputError}>
              <label>Id de Usuario:</label>
              <Field
                type="text"
                name="userId"
                className={styles.inputs_formulario}
              />
              <ErrorMessage
                name="userId"
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
