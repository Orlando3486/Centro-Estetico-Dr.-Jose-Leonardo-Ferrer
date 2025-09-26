import { useState, useEffect } from "react";
import styles from "../styles/Carousel.module.css";
import { Link } from "react-router-dom";

<Link to="/login" className={styles.link}>
  Acceder
</Link>;

const images = [
  {
    src: "/estetica2.jpg",
    text: "Bienvenido a nuestra estética",
    link: "/aboutus",
  },
  {
    src: "/estetica4.jpg",
    text: "Descubrí nuestros servicios",
    link: "/register",
  },
  { src: "/estetica5.jpg", text: "Reservá tu turno 📅", link: "/login" },
];

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.carousel}>
      <Link to={images[index].link}>
        <img
          src={images[index].src}
          alt={`slide-${index}`}
          className={`${styles.imagen} ${
            fade ? styles.fadeIn : styles.fadeOut
          }`}
        />
        <p className={styles.text}>{images[index].text}</p>
      </Link>
    </div>
  );
};

export default Carousel;
