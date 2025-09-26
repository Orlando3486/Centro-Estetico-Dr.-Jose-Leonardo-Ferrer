export const turnoValidate = (values) => {
  const errors = {};

  if (!values.date) {
    errors.date = "Requerido";
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date)) {
    errors.date = "Formato inválido (use YYYY-MM-DD)";
  }

  if (!values.time) {
    errors.time = "Requerido";
  } else if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(values.time)) {
    errors.time = "Formato inválido (use HH:MM en 24 horas)";
  }

  if (!values.userId) {
    errors.userId = "Requerido";
  } else {
    const loggedUserId = localStorage.getItem("userId");
    if (values.userId !== loggedUserId) {
      errors.userId = "El ID no coincide con el usuario logueado";
    }
  }

  return errors;
};
