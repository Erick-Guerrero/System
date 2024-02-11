import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { postTicket, getClientes } from '../../../redux/actions';
import { lotteriesDictionary } from '../../../helpers/lotteriesDictionary';
import './Tickets.css';

const ApuestaForm = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.clientes);
  const [isValid, setIsValid] = useState(false);
  const [isClientSelected, setIsClientSelected] = useState(false); // Nuevo estado
  const [selectedUserName, setSelectedUserName] = useState('');
  const [selectedPhone, setSelectedPhone] = useState('');
  const [selectedClientId, setSelectedClientId] = useState(null);

  const selectedClient = data?.find((c) => c.clientId === selectedClientId);
  
  const initialPaymentMethod = ''; // Establecer el valor inicial aquí si es diferente a una cadena vacía
  
  const [formData, setFormData] = useState({
    clientId: 0,
    paymentMethod: initialPaymentMethod, // Asegurarse de que el valor inicial esté en mayúsculas
    apuestas: [
      {
        number: ['', '', ''],
        bet: ['', '', ''],
        hr: '',
        lottery: '',
      },
    ],
  });

  const filteredData = data?.filter((c) => {
    return (
      c.phone.toLowerCase().includes(selectedPhone.toLowerCase()) &&
      (c.name.toLowerCase().includes(selectedUserName.toLowerCase()) ||
        c.surname.toLowerCase().includes(selectedUserName.toLowerCase()))
        );
      });

  useEffect(() => {
      // Actualiza el formulario con los detalles del cliente cuando selectedClientId cambie
      if (selectedClientId && selectedClient) {
          setFormData({
              ...formData,
              clientId: selectedClientId,
              // Añade aquí cualquier otro campo que necesites prellenar
          });
      }
  }, [formData, selectedClientId]);

  const handleNameChange = (e) => {
    setSelectedUserName(e.target.value);
  };

  const handlePhoneClear = () => {
    setSelectedPhone('');
  };

  const handleNameClear = () => {
    setSelectedUserName('');
  };

  const handlePhoneChange = (e) => {
    setSelectedPhone(e.target.value);
  };

  // const handleClientChange = (selectedClientId) => {
  //   selectedClientId.preventDefault()
  //   setFormData({
  //     ...formData,
  //     clientId: selectedClientId,
  //   });
  //   const isValid = formData.apuestas.every(
  //     (apuesta) =>
  //       apuesta.number.every((num) => num !== '') &&
  //       apuesta.bet.every((b) => b !== '') &&
  //       apuesta.lottery !== '' &&
  //       apuesta.hr !== ''
  //   );
  //   setIsValid(isValid && selectedClientId !== '');
  // };

  const handleInputChange = (e, index, subIndex, type) => {
    const { value } = e.target;
    const updatedApuestas = [...formData.apuestas];
    updatedApuestas[index][type][subIndex] = parseInt(value, 10);
    setFormData((prevState) => ({
      ...prevState,
      apuestas: updatedApuestas,
    }));

    const isValid = updatedApuestas.every(
      (apuesta) =>
        apuesta.number.every((num) => num !== '') &&
        apuesta.bet.every((b) => b !== '') &&
        apuesta.lottery !== '' &&
        apuesta.hr !== ''
    );
    setIsValid(isValid && formData.clientId !== 0);
  };

  const handleInputChangeLot = (e, index) => {
    const { name, value } = e.target;
    const updatedApuestas = [...formData.apuestas];
    updatedApuestas[index][name] = value;
    setFormData({
      ...formData,
      apuestas: updatedApuestas,
    });
    const isValid = updatedApuestas.every(
      (apuesta) =>
        apuesta.number.every((num) => num !== '') &&
        apuesta.bet.every((b) => b !== '') &&
        apuesta.lottery !== '' &&
        apuesta.hr !== ''
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
      number: ['', '', ''],
      bet: ['', '', ''],
      paymentMethod: '',
      hr: '',
      lottery: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postTicket(formData));
    setFormData({
      clientId: 0,
      paymentMethod: '',
      apuestas: [
        {
          number: [0, 0, 0],
          bet: [0, 0, 0],
          hr: '',
          lottery: '',
        },
      ],
    });
    setIsValid(false);
    setIsClientSelected(false);
  };

  useEffect(() => {
    dispatch(getClientes());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="w-1/2 mt-6 mx-auto" >
        <form onSubmit={handleSubmit} className="ContainerForm">
          {/* <input type="hidden" name="clientId" value={formData.clientId} /> */}

          <div className='flex justify-center flex-col gap-7 sm:flex-row sm:gap-7'>
            <div className="relative inline-block">
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
                >x</button>
              )}
            </div>

            <div className="relative inline-block">
              <input
                id="phone-input"
                type="number"
                value={selectedPhone}
                onChange={handlePhoneChange}
                className="letrasSelect"
                placeholder="Filtrar por teléfono"
                style={{
                  WebkitAppearance: 'none',
                  margin: 0,
                  MozAppearance: 'textfield'
                }}
              />
              {selectedPhone && (
                <button
                  onClick={handlePhoneClear}
                  className="absolute right-2 text-xl font-thin top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                >x</button>
              )}
            </div>
          </div>


          <div className='contenedorTable'>
            <table className='content-table tabla-clientes'>
              <tbody>
                {filteredData?.length > 0 ? (
                  filteredData.map((c, index) => (
                    <tr key={c.clientId} style={{ backgroundColor: 'white' }}>
                     <button
  onClick={() => setSelectedClientId(c.clientId)}
>
                      <td>{index + 1}</td>
                      <td>{c.name} {c.surname}</td>
                      <td>{c.phone}</td>              
                      </button>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No hay resultados que coincidan con el filtro.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
      
          <div className="ContainerCenter">
            <select
              className="w-64 rounded-tl-md rounded-tr-md m-2"
              value={formData.paymentMethod} // Establecer el valor seleccionado desde el estado formData
              onChange={handlePaymentMethodChange} // Manejar el cambio del select
            >
              <option value="">Método de pago</option>
              <option value="EFECTIVO">EFECTIVO</option>
              <option value="OTROS">OTROS</option>
              {/* Agregar más opciones según sea necesario */}
            </select>
          </div>
          
          {formData.apuestas.map((apuesta, index) => (
            <div key={index} className="contenedorGlobal">
              <div
                className="btForm1"
                style={{
                  display: 'flex',
                  float: 'right',
                  margin: '0.5rem',
                  borderRadius: '50px',
                  padding: '0px',
                }}
              >
                <button
                  // className="bg-white rounded-3xl px-2 m-1 border border-black font-extrabold hover:bg-red-400 flex float-right"
                  onClick={() => handleDeleteApuesta(index)}
                >
                  x
                </button>
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
                      // onChange={(e) =>
                      //   handleInputChange(e, index, subIndex, 'number')
                      // }
                      onInput={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,2}$/.test(value)) {
                          handleInputChange(e, index, subIndex, 'number');
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
                        handleInputChange(e, index, subIndex, 'bet')
                      }
                      className="letras"
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
                  {lotteriesDictionary.map((l) => (
                    <option key={l.name} value={l.name}>
                      {l.name}
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
                  {lotteriesDictionary.flatMap((lottery) =>
                    lottery.name === apuesta.lottery
                      ? lottery.hr.map((hour) => (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ))
                      : []
                  )}
                </select>
              </div>
            </div>
          ))}
          <br />

          <div className="ContainerCenterButtons">
            <div className={'btForm'}>
              <button type="button" onClick={addApuesta}>
                Agregar apuesta
              </button>
            </div>

            <div
              className={isValid && isClientSelected ? 'btForm' : 'btFormDis'}
            >
              <button className="btForm" type="submit" disabled={!isValid}>
                Enviar apuestas
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ApuestaForm;
