import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import DialogTicket from '../DialogTicket/DialogTicket.jsx';
import { checkTicket, cleanUpDataInCheck } from '../../../redux/actions/index.js';
import "./InputTicket.css"

const InputTicket = () => {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.check) || '';

  const [data, setData] = useState({
    validationCode: '',
  });

  const [winningTicketInfo, setWinningTicketInfo] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    setData({
      ...data,
      validationCode: e.target.value,
    });
  };

  const handleCloseDialog = () => {
    setWinningTicketInfo(null);
    setData({ validationCode: '' }); // Vaciar el campo de validación al cerrar el Swal
    // dispatch(cleanUpDataInCheck()); // Llamar a la acción para limpiar 'data' en 'check'
    window.location.reload(); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(checkTicket(data));
    setData({ validationCode: '' }); // Limpiar el campo de validación después de enviar
  };
  
  useEffect(() => {
    const processTicketInfo = () => {
      if (info && info.data) {
        if (info.data === 'Ticket inexistente') {
          swal({
            title: 'Error',
            text: 'Ticket Inexistente',
            icon: 'error',
            button: 'Aceptar',
          });
        } else if (info.data === "Ticket ya Pagado") {
          swal({
            title: 'Felicidades',
            text: "Ticket ya Pagado",
            icon: 'success',
            button: 'Aceptar',
          });
        } else if (info.data === 'Ticket Expirado') {
          swal({
            title: 'Lo Siento',
            text: 'Ticket Expirado',
            icon: 'error',
            button: 'Aceptar',
          });
        } else if (info.data && info.data.ticket) {
          const ticket = info.data;
          setWinningTicketInfo(ticket);
        }
      }
    };

    processTicketInfo();
  }, [info]);

  useEffect(() => {
    // Limpieza del estado 'info' al desmontar el componente o salir de la página
    return () => {
      dispatch(cleanUpDataInCheck()); // Acción que limpia el estado 'info'
    };
  }, []);

  return (
    <div className='centerContainerButton'>
      <div className="container11">
        <div className="search-container">
          <input
            className="input"
            style={{ backgroundColor: '#d1efe9' }}
            type="text"
            placeholder="Pagar Ticket"
            name="validationCode"
            value={data.validationCode}
            onChange={handleChange}
          />
          <svg viewBox="0 0 24 24" className="search__icon" onClick={handleSubmit}>
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
        </div>
      </div>
      {winningTicketInfo && (
        <DialogTicket open1={true} onClose1={handleCloseDialog} ticketInfo={winningTicketInfo} />
      )}
    </div>
  );
};

export default InputTicket;
