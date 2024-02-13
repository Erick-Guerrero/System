import React, { useState } from "react";
import { Modal } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { prizePay } from "../../../redux/actions";
import swal from 'sweetalert';
import "./DialogTicket.css";

function DialogTicket({ open1, onClose1, ticketInfo }) {
  const [validationCode, setValidationCode] = useState(''); 
  const [paymentMethod, setPaymentMethod] = useState('');
  const dispatch = useDispatch();

  const handlePay = async () => {
    if (paymentMethod && validationCode) {
      const value = { validationCode, paymentMethod };
      dispatch(prizePay(value))
        .then(() => {
          swal('Ticket pagado con éxito', '', 'success');
        })
        .catch((error) => {
          console.error('Error al pagar el ticket:', error);
        });
    } else {
      console.error('Debe seleccionar un método de pago y establecer el código de validación.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString();
  };

  return (
    <Modal dismissible show={open1} isOpen={open1} size="5xl" onClose={onClose1} popup style={{borderRadius:"20px" ,display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", }}>
      <Modal.Body>
        <Modal.Header style={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px",marginTop:"20px" }} />
        <div className="ticket-info-container" size="sm" style={{ display: "flex", justifyContent: "center" }}>
          {ticketInfo ? (
            <div className="ticket-info">
              <h1>Lottery Numbers</h1>
              <p className={ticketInfo.message === 'Ticket ganador' ? 'winner-text' : 'not-winner-text'}>
                {ticketInfo.message}
              </p>
              <hr />
              <div  style={{ display: "flex", justifyContent: "space-between" }}>
                <p>{formatDate(ticketInfo.ticket.createdAt)} </p>
                <p>{formatTime(ticketInfo.ticket.createdAt)}</p>
              </div>
              <hr />
              <p>Ticket: {ticketInfo.ticket.idTicket}</p>
              <p>Código validación: {ticketInfo.ticket.validationCode}</p>
              <hr />
              <p>Lotería: {ticketInfo.ticket.lotteryName} /  {ticketInfo.ticket.lotteryHr} hr</p>
              <hr />
              <div className="ticket-numbers">
                <table>
                  <thead>
                    <tr>
                      <th>Número</th>
                      <th>Apuesta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ticketInfo.ticket.TicketNumbers.map((number, index) => (
                      <tr key={index}>
                        <td style={{width: "46px"}}>{number.number === 100 ? "00" :  number.number.toString().padStart(2, '0')}</td>
                        <td style={{width: "70px"}}>S/ {number.bet}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <hr />
              {ticketInfo.message === 'Ticket ganador' && ( // Mostrar si el ticket es ganador
              <div style={{display:"flex", flexDirection:"column"}}>
              <p className={ticketInfo.isWinner ? 'winner-amount' : 'not-winner-amount'}>

                Monto total: S/ {ticketInfo.pago}

              </p>
                <select style={{ backgroundColor:"#d1efe9"}}
                  className='filtroPayment' value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="">Método de pago</option>
                  <option value="EFECTIVO">EFECTIVO</option>
                  <option value="OTROS">OTROS</option>
                  {/* Agrega las opciones de métodos de pago que necesites */}
                </select>
                <input
                  style={{borderRadius:"10px", backgroundColor:"#d1efe9"}}
                  type="text"
                  value={validationCode}
                  onChange={(e) => setValidationCode(e.target.value)}
                  placeholder="Código de validación"
                />
                <div className= 'btForm'>
                  <button type="submit" onClick={handlePay}>
                    Pagar
                  </button>
                </div>
              </div>
            )}
            </div>
          ) : null}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DialogTicket;
