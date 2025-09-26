import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../../styles/Perfil.module.css";

const Perfil = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.principal}>
      <section className={styles.contenido}>
        <h2 className={styles.tituloH2}>Bienvenido</h2>
        <p className={styles.parrafo}>
          <strong>Perfil de:</strong> {user.name}
        </p>
        <p className={styles.parrafo}>
          <strong>ID de Usuario:</strong> {user.id}
        </p>
        <p className={styles.parrafo}>
          <strong>Correo Electrónico:</strong> {user.email}
        </p>
        <p className={styles.parrafo}>
          <strong>Fecha de Nacimiento:</strong> {user.birthday}
        </p>
        <p className={styles.parrafo}>
          <strong>Número de Documento:</strong> {user.nDni}
        </p>
        <p className={styles.parrafo}>
          <strong>Registrado en:</strong> {user.updateAt}
        </p>
        <p>
          ¿Deseas agendar un turno?{" "}
          <Link to="/agendar" className={styles.link}>
            Agendar
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Perfil;
