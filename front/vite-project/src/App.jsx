import "./App.css";
import Home from "./views/Home/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./views/Login/Login";
import RegisterForm from "./views/RegisterForm/RegisterForm";
import { NavBarUsuario } from "./components/NavBarUsuario.jsx";
import Footer from "./components/Footer.jsx";
import MisTurnos from "./views/MisTurnos/MisTurnos.jsx";
import AboutUs from "./views/AboutUs/AboutUs.jsx";
import { NavBarInicio } from "./components/NavBarInicio.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Perfil from "./views/Perfil/Perfil.jsx";
import Turnero from "./views/Turnero/Turnero.jsx";
import ProtectedRoute from "./context/ProtectedRoute.jsx";

function App() {
  const location = useLocation();
  return (
    <>
      <header>
        <nav>
          {location.pathname === "/" ||
          location.pathname === "/home" ||
          location.pathname === "/register" ||
          location.pathname === "/aboutus" ||
          location.pathname === "/login" ||
          location.pathname === "/*" ? (
            <NavBarInicio />
          ) : (
            <NavBarUsuario />
          )}
        </nav>
      </header>
      <main className="layout">
        <section className="imagen"></section>
        <section className="compartido">
          <article className="contenido"></article>
          <article className="informacion">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="*" element={<ErrorPage />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/perfil"
                element={
                  <ProtectedRoute>
                    <Perfil />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/turnos"
                element={
                  <ProtectedRoute>
                    <MisTurnos />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/agendar"
                element={
                  <ProtectedRoute>
                    <Turnero />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </article>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
