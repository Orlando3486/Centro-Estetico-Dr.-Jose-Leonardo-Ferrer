export const validar = (values) => {
  let errores = {};

  if (!values.username) {
    errores.username = "Por favor ingrese un email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.username)) {
    errores.username = "Ingrese un email válido";
  }

  if (!values.password) {
    errores.password = "Por favor ingrese una contraseña";
  } else if (values.password.length < 6) {
    errores.password = "La contraseña debe tener al menos 6 caracteres";
  }

  return errores;
};
