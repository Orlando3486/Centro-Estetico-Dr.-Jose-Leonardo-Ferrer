import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import axios from "axios";
import styles from "../../styles/RegisterForm.module.css";
import Swal from "sweetalert2";
import { formValidate } from "../../helpers/formValidate";
import { useNavigate, Link } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    password: "",
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setForm(values);
    axios
      .post("http://localhost:3000/users/register", values, {
        headers: {
          token: "proyectoM3",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Registro exitoso",
            text: `Bienvenido/a ${values.name}!`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
        resetForm();
        navigate("/login");
      })
      .catch((error) => {
        if (error.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text:
              error.response?.data?.msg || "No se pudo registrar el usuario",
            confirmButtonText: "Intentar de nuevo",
          });
        }
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className={styles.contenedor_formulario}>
      <Formik
        initialValues={form}
        validate={formValidate}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className={styles.formulario}>
            <h2 className={styles.tituloH2}>Registro de Usuario</h2>
            <div className={styles.inputError}>
              <label>Nombres:</label>
              <Field
                name="name"
                type="text"
                className={styles.inputs_formulario}
              />
              <ErrorMessage
                name="name"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div className={styles.inputError}>
              <label>Email:</label>
              <Field
                name="email"
                type="email"
                className={styles.inputs_formulario}
              />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div className={styles.inputError}>
              <label>Fecha de Nacimiento:</label>
              <Field
                name="birthdate"
                type="date"
                className={styles.inputs_formulario}
              />
              <ErrorMessage
                name="birthdate"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div className={styles.inputError}>
              <label>DNI:</label>
              <Field
                name="nDni"
                type="text"
                className={styles.inputs_formulario}
              />
              <ErrorMessage
                name="nDni"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div className={styles.inputError}>
              <label>Usuario:</label>
              <Field
                name="username"
                type="text"
                className={styles.inputs_formulario}
              />
              <ErrorMessage
                name="username"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div className={styles.inputError}>
              <label>Contraseña:</label>
              <Field
                name="password"
                type="password"
                className={styles.inputs_formulario}
              />
              <ErrorMessage
                name="password"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.boton_formulario}>
              Registrarse
            </button>
            <p>
              ¿Ya te encuentras registrado?{" "}
              <Link to="/login" className={styles.link}>
                Acceder
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
