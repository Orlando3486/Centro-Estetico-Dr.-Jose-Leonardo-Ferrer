import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../hooks/useAuth";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    logout();
    localStorage.removeItem("userId");
    window.dispatchEvent(new Event("user-logout"));

    await Swal.fire({
      icon: "success",
      title: "Sesión finalizada",
      text: "Su sesión ha finalizado correctamente.",
      confirmButtonText: "OK",
    });

    navigate("/home");
  };

  return <button onClick={handleLogout}>Cerrar sesión</button>;
};

export default LogoutButton;
