import styles from "../../styles/AboutUs.module.css";

// const AboutUs = () => {
//   return (
//     <>
//       <article className={styles.article}>
//         <h3 className={styles.hola}>¡HOLA!</h3>
//         <p className={styles.parrafo}>
//           <span className={styles.resaltar}>
//             Nos apasiona ayudar a las personas a lograr los objetivos de
//             estética y salud que buscan.
//           </span>
//           <br />
//           <br />
//           Somos el <strong>Centro Estético Dr. José Leonardo Ferrer</strong>, un
//           centro de estética integral formado por un equipo de profesionales
//           médicos comprometidos con brindar tratamientos seguros, personalizados
//           y basados en evidencia científica.
//           <br />
//           <br />
//           Nuestro equipo, liderado por nuestro director médico,
//           <strong> Dr. José Leonardo Ferrer</strong>, trabaja para ayudar tanto
//           a mujeres como a hombres a alcanzar los resultados estéticos y
//           saludables que desean, siempre priorizando la naturalidad, el
//           bienestar y la seguridad del paciente.
//           <br />
//           <br />
//           Gracias a nuestros métodos, respaldados por fundamentos científicos, y
//           a nuestro compromiso con la actualización constante tanto médica como
//           tecnológica, nos hemos consolidado como un referente en el sector con
//           más de
//           <strong> 2 años de trayectoria</strong>.
//           <br />
//           <br />
//           Para nosotros, cada paciente representa un compromiso que afrontamos
//           con responsabilidad, profesionalismo y dedicación.
//         </p>
//       </article>
//     </>
//   );
// };
// export default AboutUs;

const SobreNosotros = () => {
  return (
    <section className={styles.sobreNosotros}>
      <div className={styles.contenido}>
        <div className={styles.imagenContainer}>
          <img
            src="/foto-portada-estetica1.jpg"
            alt="Dr. Jose Leonardo Ferrer"
            className={styles.imagen}
          />
        </div>

        <div className={styles.texto}>
          <h2>Centro Estético Dr. José Leonardo Ferrer</h2>

          <p className={styles.resaltar}>
            Nos apasiona ayudar a las personas a lograr los objetivos de
            estética y salud que buscan.
          </p>

          <p>
            Somos un centro de estética integral formado por un equipo de
            profesionales médicos comprometidos con brindar tratamientos
            seguros, personalizados y basados en evidencia científica.
          </p>

          <p>
            Liderados por nuestro director médico, el Dr. José Leonardo Ferrer,
            trabajamos para ayudar a mujeres y hombres a lograr los resultados
            estéticos y saludables que desean.
          </p>

          <p>
            Nuestro compromiso es brindar atención profesional, tecnología
            avanzada y resultados naturales.
          </p>
        </div>
      </div>

      <div className={styles.valores}>
        <div className={styles.card}>
          <h3>Profesionalismo</h3>
          <p>Equipo médico capacitado y en constante actualización.</p>
        </div>

        <div className={styles.card}>
          <h3>Tecnología</h3>
          <p>Equipamiento moderno para tratamientos seguros y efectivos.</p>
        </div>

        <div className={styles.card}>
          <h3>Resultados Naturales</h3>
          <p>Buscamos realzar la belleza respetando la armonía natural.</p>
        </div>
      </div>
    </section>
  );
};

export default SobreNosotros;
