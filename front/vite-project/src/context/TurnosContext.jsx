import { createContext, useState } from "react";

const TurnosContext = createContext({
  turnos: [],
  setTurnos: () => {},
});

export const TurnosProvider = ({ childen }) => {
  const [turnos, setTurnos] = useState([]);
  const value = {
    turnos,
    setTurnos,
  };

  return (
    <TurnosContext.Provider value={value}>{childen}</TurnosContext.Provider>
  );
};

export default TurnosContext;
