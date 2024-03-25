import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { postTicket, getClientes } from "../../../redux/actions";
import { lotteriesDictionary } from "../../../helpers/lotteriesDictionary";
import swal from "sweetalert";
import "./Tickets.css";
import moment from "moment-timezone";

const getCurrentHour = () => {
  return moment().format("HH:mm");
};

const getCurrentTime = () => {
  const now = new Date();
  return now;
};

const today = new Date();
const currentDay = today.getDay();

const ApuestaForm = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.clientes);
  const [isValid, setIsValid] = useState(false);
  const [isClientSelected, setIsClientSelected] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedPhone, setSelectedPhone] = useState("");
  const currentHour = getCurrentHour();
  // const initialPaymentMethod = '';
  const [formData, setFormData] = useState({
    clientId: 0,
    paymentMethod: "",
    hrClient: "",
    apuestas: [
      {
        number: ["", "", ""],
        bet: ["", "", ""],
        hr: "",
        lottery: "",
        hrLottery: "",
      },
    ],
  });
  console.log(formData.apuestas[0]);


  const calcularMontoTotal = () => {
    let total = 0;
    formData.apuestas.forEach((apuesta) => {
      apuesta.bet.forEach((monto) => {
        // Verificar si el valor es numérico antes de sumarlo
        const parsedMonto = parseInt(monto, 10);
        if (!isNaN(parsedMonto)) {
          total += parsedMonto;
        }
      });
    });
    return total;
  };

  const filteredData = data?.filter((c) => {
    return (
      c.phone.toLowerCase().includes(selectedPhone.toLowerCase()) &&
      (c.name.toLowerCase().includes(selectedUserName.toLowerCase()) ||
        c.surname.toLowerCase().includes(selectedUserName.toLowerCase()))
    );
  });
  const handleNameChange = (e) => {
    const inputUserName = e.target.value;
    setSelectedUserName(inputUserName);

    const foundClient = data.find(
      (c) =>
        c.name.toLowerCase().includes(inputUserName.toLowerCase()) ||
        c.surname.toLowerCase().includes(inputUserName.toLowerCase())
    );

    if (foundClient) {
      setFormData({
        ...formData,
        clientId: foundClient.clientId, // Asignar el clientId del cliente encontrado al formData
      });
    } else {
      setFormData({
        ...formData,
        clientId: 0, // Si no se encuentra el cliente, asignar un valor por defecto al clientId
      });
    }
  };
  const handlePhoneClear = () => {
    setSelectedPhone("");
  };
  const handleNameClear = () => {
    setSelectedUserName("");
  };
  const handlePhoneChange = (e) => {
    const inputPhone = e.target.value;
    setSelectedPhone(inputPhone);

    const foundClient = data.find((c) => c.phone.includes(inputPhone));

    if (foundClient) {
      setFormData({
        ...formData,
        clientId: foundClient.clientId, // Asignar el clientId del cliente encontrado al formData
      });
    } else {
      setFormData({
        ...formData,
        clientId: 0, // Si no se encuentra el cliente, asignar un valor por defecto al clientId
      });
    }
  };

  const handleClientChange = (e) => {
    const selectedValue = e.target.value;
    setIsClientSelected(selectedValue !== "");
    setFormData({
      ...formData,
      clientId: selectedValue,
    });

    const isAnyPaymentMethodEmpty = formData.apuestas.some(
      (apuesta) => apuesta.paymentMethod === ""
    );

    const isValid = formData.apuestas.every(
      (apuesta) =>
        apuesta.number.every((num) => num !== "") &&
        apuesta.bet.every((b) => b !== "") &&
        apuesta.lottery !== "" &&
        apuesta.hr !== "" &&
        formData.clientId !== 0 &&
        !isAnyPaymentMethodEmpty // Comprueba si hay algún paymentMethod vacío
    );
    setIsValid(isValid && selectedValue !== "");
  };
  const handleInputChange = (e, index, subIndex, type) => {
    const { value } = e.target;
    const parsedValue = value === "00" ? 100 : parseInt(value, 10);
  
    // Limitar el valor ingresado a un máximo de 100
    const clampedValue = Math.min(parsedValue, 100);
  
    const updatedApuestas = [...formData.apuestas];
  
    updatedApuestas[index][type][subIndex] = clampedValue;
  
    setFormData((prevState) => ({
      ...prevState,
      apuestas: updatedApuestas,
    }));

    // Verifica si hay al menos una apuesta con el campo paymentMethod vacío
    const isAnyPaymentMethodEmpty = updatedApuestas.some(
      (apuesta) => apuesta.paymentMethod === ""
    );

    const isValid = updatedApuestas.every(
      (apuesta) =>
        apuesta.number.every((num) => num !== "") &&
        apuesta.bet.every((b) => b !== "") &&
        apuesta.lottery !== "" &&
        apuesta.hr !== ""
    );

    // El botón se deshabilitará si isValid es falso o hay al menos un paymentMethod vacío
    setIsValid(isValid && formData.clientId !== 0 && !isAnyPaymentMethodEmpty);
  };
  const handleInputChangeLot = (e, index) => {
    const { name, value } = e.target;
    const updatedApuestas = [...formData.apuestas];
    updatedApuestas[index][name] = value;

    if (name === "hr") {
      // Realizar la conversión de la hora a la zona horaria del cliente
      const hourCliente = formatTime(value);

      // Actualizar hrLottery dentro del objeto apuestas en el índice correspondiente
      updatedApuestas[index].hrLottery = hourCliente;


    }

    // Actualizar el estado con las apuestas actualizadas
    setFormData({
      ...formData,
      apuestas: updatedApuestas,
      hrClient: getCurrentTime(),

    });

    const isValid = updatedApuestas.every(
      (apuesta) =>
        apuesta.number.every((num) => num !== "") &&
        apuesta.bet.every((b) => b !== "") &&
        apuesta.lottery !== "" &&
        apuesta.hr !== ""
    );
    setIsValid(isValid && formData.clientId !== 0);
  };

  const handlePaymentMethodChange = (e) => {
    const selectedPaymentMethod = e.target.value.toUpperCase();
    setFormData({
      ...formData,
      paymentMethod: selectedPaymentMethod,
    });
  };
  const addApuesta = () => {
    const newApuesta = {
      number: ["", "", ""],
      bet: ["", "", ""],
      paymentMethod: "",
      hr: "",
      lottery: "",
    };
    setFormData((prevState) => ({
      ...prevState,
      apuestas: [...formData.apuestas, newApuesta],
    }));
  };
  const handleDeleteApuesta = (index) => {
    const updatedApuestas = [...formData.apuestas];
    updatedApuestas.splice(index, 1);
    setFormData({
      ...formData,
      apuestas: updatedApuestas,
    });
    setIsValid(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(postTicket(formData));

    if (response) {
      swal("Éxito", "Sus tickets se crearon con éxito", "success")
        .then(() => {
          setFormData({
            clientId: 0,
            paymentMethod: "",
            apuestas: [
              {
                number: [0, 0, 0],
                bet: [0, 0, 0],
                hr: "",
                lottery: "",
              },
            ],
          });

          setIsValid(false);
          setIsClientSelected(false);
        })
        .catch((error) => {
          console.error("Error mostrando alerta:", error);
        });
    }
  };

  const getLastFourDigits = (phoneNumber) => {
    const lastFour = phoneNumber.slice(-4);
    return `****${lastFour}`;
  };

  useEffect(() => {
    dispatch(getClientes());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHour = getCurrentHour();
      // Comparar si la nueva hora es igual o posterior a "01:00"
      if (newHour >= "01:00") {
        setFormData((prevState) => ({
          ...prevState,
          apuestas: prevState.apuestas.map((apuesta) => ({
            ...apuesta,
            hr: "", // Reiniciar las horas después de la 01:00
          })),
        }));
      }
    }, 60000); // Verificar cada minuto si es posterior a la 01:00

    return () => clearInterval(interval);
  }, []);

  const isPaymentMethodEmpty = formData.paymentMethod === "";
  const isClientEmpty = formData.clientId === 0;

  function obtenerZonaHorariaCliente() {
    // Intenta obtener la zona horaria del cliente usando Intl.DateTimeFormat
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return timeZone || "UTC"; // Si no se puede determinar, devuelve 'UTC'
    } catch (error) {
      console.error("Error al obtener la zona horaria del cliente:", error);
      return "UTC"; // En caso de error, devuelve 'UTC'
    }
  }

  function formatTime(timeString) {
    // Convertir la hora original a la zona horaria del cliente
    const zonaHorariaCliente = obtenerZonaHorariaCliente();
    const horaCliente = moment
      .tz(timeString, "HH:mm", "America/Santo_Domingo")
      .tz(zonaHorariaCliente);

    if (!horaCliente.isValid()) {
      return "Invalid Date";
    }
    const formattedTime = horaCliente.format("HH:mm");

    return formattedTime;
  }

  const isLotteryHourValid = (lottery) => {
    const currentHourFormatted = currentHour;
    const currentHourMoment = moment(currentHourFormatted, "HH:mm");

    return lottery.hr.some((hour) => {
      const hourClienteMoment = moment(hour, "HH:mm");
      return hourClienteMoment.isAfter(currentHourMoment);
    });
  };

  const zonaHorariaCliente = obtenerZonaHorariaCliente();

  return (
    <>
      <Navbar />
      <div className="w-1/2 mt-6 mx-auto">
        <form onSubmit={handleSubmit} className="ContainerForm">
          <div className="ContainerCenter">
            <div>
              <input
                id="name-input"
                type="text"
                value={selectedUserName}
                onChange={handleNameChange}
                className="letrasSelect"
                placeholder="Filtrar por cliente"
              />
              {selectedUserName && (
                <button
                  onClick={handleNameClear}
                  className="absolute right-2 text-xl font-thin top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                >
                  x
                </button>
              )}
            </div>
            <div>
              <input
                id="phone-input"
                type="number"
                value={selectedPhone}
                onChange={handlePhoneChange}
                className="letrasSelect"
                placeholder="Filtrar por teléfono"
                style={{
                  WebkitAppearance: "none",
                  margin: 0,
                  MozAppearance: "textfield",
                }}
              />
              {selectedPhone && (
                <button
                  onClick={handlePhoneClear}
                  className="absolute right-2 text-xl font-thin top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                >
                  x
                </button>
              )}
            </div>

            <select
              className="letrasSelect"
              style={{ height: "44px" }}
              value={formData.clientId}
              onChange={handleClientChange}
              // onBlur={handleClientChange}
            >
              {/* {filteredData?.length > 1 ? ( */}
              <option value="">Seleccionar cliente</option>
              {/* // ) : null} */}
              {filteredData?.map((c) => (
                <option key={c.clientId} value={c.clientId}>
                  {c.name} {c.surname} || Tel: {getLastFourDigits(c.phone)}
                </option>
              ))}
            </select>
            <select
              className="letrasSelect"
              style={{ height: "44px" }}
              value={formData.paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <option value="">Método de pago</option>
              <option value="EFECTIVO">EFECTIVO</option>
              <option value="OTROS">OTROS</option>
            </select>
          </div>
          <br></br>
          <div className="ContainerCenter">
            <div className="totalAmount">
              <div className="totalAmountValue">
                <h1>Total Apuestas:</h1>
                <p>{calcularMontoTotal()}</p>
              </div>
            </div>
          </div>{" "}
          {formData.apuestas.map((apuesta, index) => (
            <div key={index} className="contenedorGlobal">
              <div
                className="btForm1"
                style={{
                  display: "flex",
                  float: "right",
                  margin: "0.5rem",
                  borderRadius: "50px",
                  padding: "0px",
                }}
              >
                <button onClick={() => handleDeleteApuesta(index)}>x</button>
              </div>
              <br />
              {Array.from({ length: 3 }).map((_, subIndex) => (
                <div key={subIndex} className="container">
                  <div className="contenedorInput">
                    <label className="titleInfo" htmlFor="name">
                      Numero {subIndex + 1}
                    </label>
                    <input
                      type="number"
                      id="input"
                      name={`number_${index}_${subIndex}`}
                      value={apuesta.number[subIndex]}
                      onInput={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,2}$/.test(value)) {
                          handleInputChange(e, index, subIndex, "number");
                        }
                      }}
                      className="letras"
                    />
                  </div>
                  <div className="contenedorInput">
                    <label className="titleInfo" htmlFor="name">
                      Apuesta {subIndex + 1}
                    </label>
                    <input
                      id="input"
                      type="number"
                      name={`bet_${index}_${subIndex}`}
                      value={apuesta.bet[subIndex]}
                      onChange={(e) =>
                        handleInputChange(e, index, subIndex, "bet")
                      }
                      className="letras"
                      max={100}
                    />
                  </div>
                </div>
              ))}
              <div className="ContainerCenter">
                <select
                  className="selectLot"
                  name={`lottery`}
                  value={apuesta.lottery}
                  onChange={(e) => handleInputChangeLot(e, index)}
                >
                  <option value="">Seleccionar lotería</option>
                  {lotteriesDictionary
                    .filter(isLotteryHourValid)
                    .map((lottery) => (
                      <option key={lottery.name} value={lottery.name}>
                        {lottery.name}
                      </option>
                    ))}
                </select>
                <select
                  className="selectLot"
                  name={`hr`}
                  value={apuesta.hr}
                  onChange={(e) => handleInputChangeLot(e, index)}
                >
                  <option value="">Seleccionar hora</option>
                  {lotteriesDictionary
                    .find((lottery) => lottery.name === apuesta.lottery)
                    ?.hr.map((hour) => {
                      const hourCliente = formatTime(hour, zonaHorariaCliente);
                      // const currentHourFormatted = formatTime(currentHour,zonaHorariaCliente);
                      // const currentHourFormattedCliente =currentHourMoment.format("HH:mm");
                      const horaClienteMoment = moment(hourCliente, "HH:mm");
                      const currentHourMoment = moment().tz(zonaHorariaCliente);
                      // Renderizar la opción solo si la hora cliente es posterior o igual a la hora actual
                      if (horaClienteMoment.isSameOrAfter(currentHourMoment) || hourCliente === "00:30") {
                        return (
                          <option key={hour} value={hour}>
                            {hourCliente}
                          </option>
                        );
                      }
                      return null;
                    })}
                </select>
              </div>
            </div>
          ))}
          <br />
          <div className="ContainerCenterButtons">
            <div className={"btForm"}>
              <button type="button" onClick={addApuesta}>
                Agregar apuesta
              </button>
            </div>
            <div
              className={
                isPaymentMethodEmpty || !isValid || isClientEmpty
                  ? "btFormDis"
                  : "btForm"
              }
            >
              <button
                className={
                  isPaymentMethodEmpty || !isValid || isClientEmpty
                    ? "btFormDis"
                    : "btForm"
                }
                type="submit"
                disabled={isPaymentMethodEmpty || !isValid || isClientEmpty}
              >
                Enviar apuestas
              </button>
            </div>
          </div>
        </form>
      </div>
      <br></br>
    </>
  );
};

export default ApuestaForm;
