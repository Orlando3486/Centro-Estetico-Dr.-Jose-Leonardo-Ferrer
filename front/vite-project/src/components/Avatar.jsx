import styles from "../styles/avatar.module.css";
import avatar from "../assets/login-avatar.png";
const Avatar = () => {
  return (
    <>
      <img
        className={styles.avatar}
        src={avatar}
        alt="Avatar de inicio de sesion"
      />
    </>
  );
};
export default Avatar;
