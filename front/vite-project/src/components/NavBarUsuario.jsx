import Logo from "./Logo";
import styles from "../styles/NavBarUsuario.module.css";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";

export const NavBarUsuario = () => {
  // const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  // const hideInicio = location.pathname === "/home" || location.pathname === "/";
  // const hideAvatar = location.pathname === "/login";
  // const hideRegister = location.pathname === "/register";
  // const hideAboutUs = location.pathname === "/aboutus";

  const handleLogout = () => {
    logout();
    Swal.fire("Sesión cerrada", "Has cerrado sesión con éxito", "success");
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <Logo />

      <h1 className={styles.nombre_estetica}>
        Centro Estetico <br className={styles.mobile_break} /> Dr. Jose Leonardo
        Ferrer
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
            <Link to="/perfil" className={styles.link} onClick={toggleMenu}>
              Mi Perfil
            </Link>
            {/* )} */}
          </li>
          <li>
            <Link to="/agendar" className={styles.link} onClick={toggleMenu}>
              Agendar
            </Link>
          </li>
          <li>
            <Link to="/turnos" className={styles.link} onClick={toggleMenu}>
              Mis Turnos
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className={styles.boton}>
              Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
