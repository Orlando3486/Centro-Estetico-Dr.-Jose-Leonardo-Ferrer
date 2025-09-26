export const loginValidate = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = "Requerido";
  } else if (!/^(?=.*[A-Z])[a-zA-Z0-9]{4,20}$/.test(values.username)) {
    errors.username =
      "Usuario inválido (4-20 caracteres, sin espacios, debe incluir al menos una mayúscula y un número)";
  }

  if (!values.password) {
    errors.password = "Requerido";
  } else if (
    !/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(values.password)
  ) {
    errors.password =
      "Debe tener mínimo 6 caracteres, una mayúscula, un número y un carácter especial";
  }

  return errors;
};
