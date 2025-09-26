export const formValidate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Requerido";
  } else if (!/^[a-zA-Z\s]{2,50}$/.test(values.name)) {
    errors.name = "Nombre inválido (solo letras, 2-50 caracteres)";
  }

  if (!values.email) {
    errors.email = "Requerido";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Email inválido (formato incorrecto)";
  }

  if (!values.birthdate) {
    errors.birthdate = "Requerido";
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.birthdate)) {
    errors.birthdate = "Fecha inválida (use formato YYYY-MM-DD)";
  } else {
    const birthDate = new Date(values.birthdate);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < 18) {
      errors.birthdate = "Debes ser mayor de edad (mínimo 18 años)";
    }
  }

  if (!values.nDni) {
    errors.nDni = "Requerido";
  } else if (!/^\d{7,10}$/.test(values.nDni)) {
    errors.nDni = "DNI inválido(7-10 numeros, sin espacios)";
  }

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
