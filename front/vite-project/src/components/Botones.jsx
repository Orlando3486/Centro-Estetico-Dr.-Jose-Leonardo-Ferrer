import { Link } from "react-router-dom";
import styles from "../styles/Botones.module.css";

function Botones() {
  return (
    <div>
      <Link to="/register">
        <button className={styles.boton_home}>Registrarme</button>
      </Link>

      <Link to="/aboutus">
        <button className={styles.boton_home}>Sobre Nosotros</button>
      </Link>
    </div>
  );
}

export default Botones;
