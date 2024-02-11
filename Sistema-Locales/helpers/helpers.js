import moment from 'moment-timezone';

export const emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/

function validate(input) {
  let errors = {};
  if (!input.name || /[^a-zA-Z, ]/g.test(input.name)) {
    errors.name = 'Name is not valid';
  } else if (!input.number || /^[0-9]+([,][0-9]+)?$/g.test(input.number)) {
    errors.number = 'ingresa un número válido';
  } else if (
    !input.email ||
    /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/g.test(input.email)
  ) {
    errors.email = 'email is required';
  } else if (!input.season) {
    errors.season = 'season is required';
  }
  return errors;
}


function obtenerZonaHorariaCliente() {
  // Intenta obtener la zona horaria del cliente usando Intl.DateTimeFormat
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timeZone || 'UTC'; // Si no se puede determinar, devuelve 'UTC'
  } catch (error) {
    console.error('Error al obtener la zona horaria del cliente:', error);
    return 'UTC'; // En caso de error, devuelve 'UTC'
  }
}


export const formatTime = (timeString) =>  {
  // Convertir la hora original a la zona horaria del cliente
  const zonaHorariaCliente = obtenerZonaHorariaCliente();
  const horaCliente = moment.tz(timeString, 'HH:mm', 'America/Lima').tz(zonaHorariaCliente);

  if (!horaCliente.isValid()) {
    return 'Invalid Date';
  }
  const formattedTime = horaCliente.format('HH:mm');

  return formattedTime;
}

export default { validate,obtenerZonaHorariaCliente };



