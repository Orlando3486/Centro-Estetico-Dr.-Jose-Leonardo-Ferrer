import styles from "../styles/Logo.module.css";
import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <>
      <img
        className={styles.logo}
        src={logo}
        alt="logo de la estecica Dr. Jose Leonardo Ferrer"
      />
    </>
  );
};
export default Logo;
