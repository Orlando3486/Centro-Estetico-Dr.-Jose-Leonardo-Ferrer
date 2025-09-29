import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import styles from "../../styles/Login.module.css";
import { loginValidate } from "../../helpers/loginValidate";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/login`, values, {
        headers: { token: "proyectoM3" },
      });

      if (response.status === 200) {
        const user = response.data.user || null;
        const token = response.data.token || null;

        localStorage.setItem("userId", user.id);

        login(user, token);

        await Swal.fire({
          icon: "success",
          title: `Bienvenido/a ${user?.name || "usuario"}`,
          showConfirmButton: false,
          timer: 1500,
        });

        resetForm();
        navigate("/perfil");
      } else {
        Swal.fire("Error", "Respuesta inesperada del servidor", "error");
      }
    } catch (error) {
      const status = error.response?.status;
      const msg =
        error.response?.data?.msg ||
        "Usuario no registrado o credenciales inválidas";

      if (status === 400 || status === 401) {
        Swal.fire({
          icon: "error",
          title: "Error de autenticación",
          text: msg,
          confirmButtonText: "Intentar de nuevo",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error en el servidor. Intente más tarde.",
        });
        console.error(error);
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
        initialValues={{ username: "", password: "" }}
        validate={loginValidate}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className={styles.formulario}>
            <h2 className={styles.tituloH2}>Acceso</h2>

            <div className={styles.inputError}>
              <label>Usuario:</label>

              <Field
                type="text"
                name="username"
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
                type="password"
                name="password"
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
              Ingresar
            </button>
            <p>
              ¿Aun no estas registrado?{" "}
              <Link to="/register" className={styles.link}>
                Registrarme
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
