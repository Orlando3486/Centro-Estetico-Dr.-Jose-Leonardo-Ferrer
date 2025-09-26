import { Formik, Form, Field, ErrorMessage } from "formik";
import { validar } from "../helpers/validate";
import styles from "../styles/FormikLogin.module.css";

function FormikLogin() {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validate={validar}
      onSubmit={(values) => {
        alert(`username: ${values.username} password: ${values.password}`);
      }}>
      <div className={styles.contenedor_formulario}>
        <Form className={styles.formulario}>
          <h2>Acceso</h2>
          <div>
            <label>Usuario:</label>
            <Field
              type="text"
              name="username"
              placeholder="example@gmail.com"
              className={styles.inputs_formulario}
            />
            <br />
            <ErrorMessage name="username" />
          </div>
          <div>
            <label>Contraseña:</label>
            <Field
              type="password"
              name="password"
              placeholder="********"
              className={styles.inputs_formulario}
            />
            <br />
            <ErrorMessage name="password" />
          </div>
          <button type="submit" className={styles.boton_formulario}>
            Ingresar
          </button>
        </Form>
      </div>
    </Formik>
  );
}
export default FormikLogin;
