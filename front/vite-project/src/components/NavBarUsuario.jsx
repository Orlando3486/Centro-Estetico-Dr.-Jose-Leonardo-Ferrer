import styles from "../styles/NavBarUsuario.module.css";
import Logo from "./Logo.jsx";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const NavBarUsuario = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    Swal.fire("Sesión cerrada", "Has cerrado sesión con éxito", "success");
    navigate("/");
  };

  const hidePerfil = location.pathname === "/perfil";
  const hideAgendar = location.pathname === "/agendar";
  const hideTurnos = location.pathname === "/turnos";

  return (
    <header className={styles.contenedorPrincipal}>
      <div className={styles.contenedor}>
        <Logo />
        <h1 className={styles.nombre_estetica}>
          Centro Estetico Dr. Jose Leonardo Ferrer
        </h1>
        <nav>
          <ul className={styles.lista}>
            <li>
              {!hidePerfil && (
                <Link to="/perfil" className={styles.link}>
                  Mi Perfil
                </Link>
              )}
            </li>
            <li>
              {!hideAgendar && (
                <Link to="/agendar" className={styles.link}>
                  Agendar
                </Link>
              )}
            </li>
            <li>
              {!hideTurnos && (
                <Link to="/turnos" className={styles.link}>
                  Mis Turnos
                </Link>
              )}
            </li>
            <li>
              <button onClick={handleLogout} className={styles.boton}>
                Cerrar sesión
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
