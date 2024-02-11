import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTickets, patchTicketState } from "../../../redux/actions";
import SelectDate from "../SelectDate/SelectDate";
import sandClock from "../../assets/sand.png"
import "./TablaTickets.css"
import Swal from 'sweetalert';

export default function Table() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets);
  const cash = useSelector((state) => state.cash);
  const [selectedLottery, setSelectedLottery] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [disabledTickets, setDisabledTickets] = useState([]);

  console.log(cash);
  
  
  function formatFecha(fecha) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(fecha).toLocaleDateString(undefined, options);
  }
  
  function handleSelectChange(lottery, hour) {
    console.log("Lottery:", lottery);
    console.log("Hour:", hour);
    setSelectedLottery(lottery);
    setSelectedHour(hour);
    setIsFilterApplied(true);
  }
  const handleSelectAll = () => {
    setSelectedLottery('');
    setSelectedHour('');
    setIsFilterApplied(false);
  };

  const handleChangeTicketState = (ticketId) => {
    swal({
      title: '¿Estás seguro?',
      text: '¿Quieres confirmar poner el ticket en pendiente?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willChange) => {
      if (willChange) {
        dispatch(patchTicketState(ticketId));
        swal('¡El ticket ha sido cambiado a Pendiente!', {
          icon: 'success',
        });
      } else {
        swal('Operación cancelada', '', 'info');
      }
    });
  };
  
  const filteredTickets = isFilterApplied
  ? tickets.data.filter((ticket) => {
    return ticket.lotteryName === selectedLottery && ticket.lotteryHr === selectedHour;
  })
  : tickets.data || [];
  useEffect(() => {
    if (isFilterApplied) {
      dispatch(getTickets(selectedLottery, selectedHour));
    } else {
      dispatch(getTickets()); // Obtener todos los tickets si no hay filtro aplicado
    }
  }, [dispatch, selectedLottery, selectedHour, isFilterApplied]);
  console.log(filteredTickets)

  useEffect(() => {
    const now = new Date().getTime();
  
    const updatedDisabledTickets = filteredTickets.filter((ticket) => {
      const ticketTime = new Date(ticket.createdAt).getTime();
      const diffMinutes = (now - ticketTime) / (1000 * 60); // Diferencia en minutos
  
      return diffMinutes >= 10;
    });
  
    const disabledTicketIds = updatedDisabledTickets.map((ticket) => ticket.idTicket);
  
    setDisabledTickets(disabledTicketIds);
  }, [filteredTickets]);
  
  return (

    <>
      <br></br>
      <div className='titleContainer'>
        <h1>LISTADO DE TICKETS</h1>
      </div>
      <br></br>
      <div className='selectContainer'>
      <SelectDate onSelect={handleSelectChange} onSelectAll={handleSelectAll}/>
      {/* <button className="botonAct" >
              <span className="transition"></span>
              <span className="gradient"></span>
              <span className="label">Confirmar Ticket</span>
            </button> */}
      </div>

      <div className='contenedorTable'>
        <table className='content-table tabla-tickets'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Loteria</th>
              <th>Horario</th>
              <th>Creado</th>
              <th>Estado</th>
              <th className="hide-on-mobile">Números</th>
              <th className="hide-on-mobile">Apuestas</th>
              <th>Total</th>
              <th>Pendiente</th>
              {/* <th>Modificar</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length > 0 ? (
              filteredTickets.map((c, index) => (
                <tr key={c.clientId} style={{ backgroundColor: 'white' }}>
                  <td>{index + 1}</td>
                  <td>{c.lotteryName}</td>
                  <td>{c.lotteryHr}</td>
                  <td>{formatFecha(c.createdAt)}</td>
                  <td>{c.state}</td>
                  <td className="hide-on-mobile" >
                      <table style={{display:"flex",justifyContent:"center",}}>
                        <tbody>
                          <tr >
                            {c.TicketNumbers.map((numberInfo, index) => (
                              <td  style={{ borderRight: "1px solid #0e8a7181",borderLeft: "1px solid #0e8a7181",borderTop: "1px solid #0e8a7181"}} key={index}>
                                {numberInfo.number}
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td className="hide-on-mobile">
                      <table style={{display:"flex",justifyContent:"center"}}>
                        <tbody>
                          <tr>
                            {c.TicketNumbers.map((numberInfo, index) => (
                              <td  style={{ borderRight: "1px solid #0e8a7181",borderLeft: "1px solid #0e8a7181",borderTop: "1px solid #0e8a7181"}} key={index}>
                                S/{numberInfo.bet}
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  <td>S/ {c.total}</td>
                  <td style={{display:"flex",justifyContent:"center",alignItems:"center",height:"73px"}}>
                  <button
                onClick={() => handleChangeTicketState(c.idTicket)}
                title="Pendiente"
                style={{
                  marginLeft: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  pointerEvents: disabledTickets.includes(c.idTicket) ? 'none' : 'auto',
                  opacity: disabledTickets.includes(c.idTicket) ? 0.5 : 1,
                }}
                disabled={disabledTickets.includes(c.idTicket)}
              >
                <img style={{ width: '20px', height: '20px' }} src={sandClock} alt="Filter" />
              </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No se encontraron tickets para esta lotería y hora.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
