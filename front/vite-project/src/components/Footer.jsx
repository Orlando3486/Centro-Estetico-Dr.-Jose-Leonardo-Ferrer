import styles from "../styles/Footer.module.css";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.centroEstetico}>
        Centro Estetico Dr. Jose Leonardo Ferrer
      </p>
      <p> Palermo - San Fernando - Mar del Plata </p>

      <div className={styles.imagenes}>
        <p>Contactanos:</p>
        <a
          href="https://www.instagram.com/#"
          target="_blank"
          rel="noopener noreferrer">
          <img
            src="/instagram-logo-instagram-icon-transparent-free-png.webp"
            className={styles.imagen1}
          />
        </a>
        <a href="https://wa.me/#" target="_blank" rel="noopener noreferrer">
          <img src="/WhatsApp-icone.png" className={styles.imagen2} />
        </a>
      </div>
      <p>Todos los derechos reservados. &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};
export default Footer;
