import styles from "../../styles/AboutUs.module.css";

const AboutUs = () => {
  return (
    <>
      <article className={styles.article}>
        <h3 className={styles.hola}>¡HOLA!</h3>
        <p className={styles.parrafo}>
          <span className={styles.resaltar}>
            Nos apasiona ayudar a las personas a lograr los objetivos de
            estética y salud que buscan.
          </span>
          <br />
          Somos el Centro Estetico Dr. Jose Leonardo Ferrer, centro de estética
          integral formado por un equipo de profesionales médicos que trabaja
          para ayudar a mujeres y hombres a lograr los resultados que buscan
          estéticos y saludables. Liderados por nuestro director médico; el Dr.
          Jose Leonardo Ferrer, trabajamos con métodos que poseen basamento
          científico y nos han llevado a ser un referente del sector con más de
          2 años de trayectoria. Para nosotros esto significa un compromiso que
          afrontamos con responsabilidad, trabajo y actualización constante
          tanto médica como tecnológica.
        </p>
      </article>
    </>
  );
};
export default AboutUs;
