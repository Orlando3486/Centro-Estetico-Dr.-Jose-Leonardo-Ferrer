import Carousel from "../../components/Carousel";
import Botones from "../../components/Botones";
import styles from "../../styles/Home.module.css";
import { useState, useEffect } from "react";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <>
      <main>
        <section className={styles.contenedorPrincipal}>
          <Carousel />
          {!isMobile && <Botones />}
        </section>
      </main>
    </>
  );
};

export default Home;
