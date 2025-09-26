import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/SearchBar.module.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Buscando:", query);
  };

  const handleSelect = (e) => {
    const value = e.target.value;
    if (value !== "") {
      navigate(value);
    }
  };

  return (
    <form onSubmit={handleSearch} className={styles.searchBar}>
      <input
        type="text"
        placeholder="Buscar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.input}
      />

      <select className={styles.select} onChange={handleSelect} defaultValue="">
        <option value="" disabled>
          Opciones
        </option>
        <option value="/home">Inicio</option>
        <option value="/aboutus">Sobre Nosotros</option>
        <option value="/register">Registrarme</option>
        <option value="/login">Acceder</option>
        <option value="/perfil">Perfil</option>
      </select>

      <button type="submit" className={styles.button}>
        🔍
      </button>
    </form>
  );
};

export default SearchBar;
