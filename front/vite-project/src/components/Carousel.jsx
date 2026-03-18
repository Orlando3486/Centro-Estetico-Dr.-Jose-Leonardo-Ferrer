// import { useState, useEffect } from "react";
// import styles from "../styles/Carousel.module.css";
// import { Link } from "react-router-dom";

// <Link to="/login" className={styles.link}>
//   Acceder
// </Link>;

// const images = [
//   {
//     src: "/estetica2.jpg",
//     text: "Bienvenido a nuestra estética",
//     link: "/aboutus",
//   },
//   {
//     src: "/estetica4.jpg",
//     text: "Descubrí nuestros servicios",
//     link: "/register",
//   },
//   { src: "/estetica5.jpg", text: "Reservá tu turno", link: "/login" },
// ];

// const Carousel = () => {
//   const [index, setIndex] = useState(0);
//   const [fade, setFade] = useState(true);
//   const [current, setCurrent] = useState(0);

//   const nextImage = () => {
//     setCurrent((prev) => (prev + 1) % images.length);
//   };

//   const prevImage = () => {
//     setCurrent((prev) => (prev - 1 + images.length) % images.length);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setFade(false);

//       setTimeout(() => {
//         setIndex((prev) => (prev + 1) % images.length);
//         setFade(true);
//       }, 1000);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className={styles.carousel}>
//       {/* <a href="https://wa.me/549XXXXXXXX" className={styles.botonWhatsapp}>
//         Reservar turno
//       </a>; */}

//       {/* Flecha izquierda */}
//       <button className={styles.leftArrow} onClick={prevImage}>
//         ❮
//       </button>

//       <Link to={images[index].link}>
//         {/* Flecha izquierda */}
//         <button className={styles.leftArrow} onClick={prevImage}>
//           ❮
//         </button>
//         <img
//           src={images[index].src}
//           alt={`slide-${index}`}
//           className={`${styles.imagen} ${
//             fade ? styles.fadeIn : styles.fadeOut
//           }`}
//         />
//         <button className={styles.rightArrow} onClick={nextImage}>
//           ❯
//         </button>
//         <p className={styles.text}>{images[index].text}</p>
//       </Link>

//       <button className={styles.rightArrow} onClick={nextImage}>
//         ❯
//       </button>
//     </div>
//   );
// };

// export default Carousel;

import { useState, useEffect } from "react";
import styles from "../styles/Carousel.module.css";
import { Link } from "react-router-dom";

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
  {
    src: "/estetica5.jpg",
    text: "Reservá tu turno",
    link: "/login",
  },
];

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        nextImage();
        setFade(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.carousel}>
      {/* Flecha izquierda */}
      <button className={styles.leftArrow} onClick={prevImage}>
        ❮
      </button>

      {/* Imagen clickeable */}
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

      {/* Flecha derecha */}
      <button className={styles.rightArrow} onClick={nextImage}>
        ❯
      </button>
    </div>
  );
};

export default Carousel;
