import styles from "../styles/Login.module.css";
import { useState } from "react";

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  console.log(userData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    alert(`Username: ${userData.username} y Password: ${userData.password}`);
    setUserData({ username: "", password: "" });
  };

  return (
    <div className={styles.contenedor_formulario}>
      <form className={styles.formulario} onSubmit={handleOnSubmit}>
        <h2>Login</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={userData.username}
            name="username"
            onChange={handleInputChange}
            className={styles.inputs_formulario}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={userData.password}
            name="password"
            onChange={handleInputChange}
            className={styles.inputs_formulario}
          />
        </div>
        <button className={styles.boton_formulario}>Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
