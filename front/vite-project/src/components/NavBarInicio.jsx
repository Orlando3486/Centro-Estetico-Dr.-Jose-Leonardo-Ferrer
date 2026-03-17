import Logo from "./Logo";
import styles from "../styles/NavBarInicio.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export const NavBarInicio = () => {
  // const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  // const hideInicio = location.pathname === "/home" || location.pathname === "/";
  // const hideAvatar = location.pathname === "/login";
  // const hideRegister = location.pathname === "/register";
  // const hideAboutUs = location.pathname === "/aboutus";

  return (
    <header className={styles.header}>
      <Logo />

      <h1 className={styles.nombre_estetica}>
        Centro Estetico Dr. Jose Leonardo Ferrer
      </h1>

      {/* BOTON HAMBURGUESA */}
      <div className={styles.hamburguesa} onClick={toggleMenu}>
        ☰
      </div>

      <nav
        className={`${styles.contenedor} ${menuAbierto ? styles.activo : ""}`}>
        <ul className={styles.lista}>
          <li>
            {/* {!hideInicio && ( */}
            <Link to="/home" className={styles.link} onClick={toggleMenu}>
              Inicio
            </Link>
            {/* )} */}
          </li>

          <li>
            <Link to="/register" className={styles.link} onClick={toggleMenu}>
              Registro
            </Link>
          </li>

          <li>
            <Link to="/login" className={styles.link} onClick={toggleMenu}>
              Acceso
            </Link>
          </li>

          <li>
            <Link to="/aboutus" className={styles.link} onClick={toggleMenu}>
              Sobre Nosotros
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
