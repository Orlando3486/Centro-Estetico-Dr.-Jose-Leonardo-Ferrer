import Carousel from "../../components/Carousel";
import Botones from "../../components/Botones";
import styles from "../../styles/Home.module.css";

const Home = () => {
  return (
    <>
      <main>
        <section className={styles.contenedorPrincipal}>
          <Carousel />
          <Botones />
        </section>
      </main>
    </>
  );
};

export default Home;
