import Logo from "./Logo";
import styles from "../styles/NavBarInicio.module.css";
import { Link, useLocation } from "react-router-dom";

export const NavBarInicio = () => {
  const location = useLocation();

  const hideInicio = location.pathname === "/home" || location.pathname === "/";
  const hideAvatar = location.pathname === "/login";
  const hideRegister = location.pathname === "/register";

  return (
    <header className={styles.header}>
      <Logo />
      <h1 className={styles.nombre_estetica}>
        Centro Estetico Dr. Jose Leonardo Ferrer
      </h1>
      <nav>
        <ul className={styles.lista}>
          <li>
            {!hideInicio && (
              <Link to="/home" className={styles.link}>
                Inicio
              </Link>
            )}
          </li>
          <li>
            {!hideRegister && (
              <Link to="/register" className={styles.link}>
                Registro
              </Link>
            )}
          </li>
          <li>
            {!hideAvatar && (
              <Link to="/login" className={styles.link}>
                Acceso
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
