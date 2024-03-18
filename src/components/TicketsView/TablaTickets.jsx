import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { patchTicketState, getTicketDate } from "../../../redux/actions";
import sandClock from "../../assets/sand.png"
import styles from "./TablaTickets.module.css"
import DateFilter2 from '../DateFilter2/DateFilter2'
import ViewData from './ViewData/ViewData'
import { lotteriesDictionary } from "../../../helpers/lotteriesDictionary";
import { formatTime } from "../../../helpers/helpers";

export default function Table() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets);
  const filtertickets = useSelector((state) => state.filterTicket);
  const [selectedState, setSelectedState] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isExpired, setIsExpired] = useState(false);

  const renderCellValue = (value) => {
    return value !== null ? value.toFixed(1) : '-';
  };

  console.log(filtertickets);

  const handleStartDateChange = (dateString) => {
    const formattedDate = dateString ? new Date(`${dateString}T23:59:59`) : null;
    if (formattedDate) {
      const utcDate = new Date(Date.UTC(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate(), 23, 59, 59));
      setStartDate(utcDate);
    } else {
      setStartDate(null);
    }
  };

  const handleEndDateChange = (dateString) => {
    const formattedDate = dateString ? new Date(`${dateString}T23:59:59.999`) : null;

    if (formattedDate) {
      const utcDate = new Date(Date.UTC(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate(), 23, 59, 59, 999));
      setEndDate(utcDate);
    } else {
      setEndDate(null);
    }
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  let dataToRender = filtertickets?.data?.data?.length > 0 ? filtertickets?.data?.data : tickets.data;

  if (startDate && endDate) {
    const startDateTime = new Date(startDate).setHours(0, 0, 0, 0);
    const endDateTime = new Date(endDate).setHours(23, 59, 59, 999);

    dataToRender = dataToRender?.filter((item) => {
      const itemDate = new Date(item.createdAt).getTime();
      const lotteryName = item.lotteryName ? String(item.lotteryName) : '';

      return (
        itemDate >= startDateTime &&
        itemDate <= endDateTime &&
        (selectedState ? lotteryName === selectedState : true)
      );
    });
  }

  function formatFecha(fecha) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(fecha).toLocaleDateString(undefined, options);
  }
  const isCodeExpired = (createdAt) => {
    const tenMinutesInMillis = 60 * 1000; // 10 minutos en milisegundos
    const currentTime = new Date().getTime();
    const validationCodeTime = new Date(createdAt).getTime();
    const difference = currentTime - validationCodeTime;

    return difference >= tenMinutesInMillis;
  };
  const handleChangeTicketState = (ticketId) => {
    swal({
      title: '¿Estás seguro?',
      text: '¿Quiere solicitar la anulación del ticket?',
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
    }).then(() => {
      // Recargar la página después de cerrar SweetAlert
      window.location.reload();
    })
  };

  useEffect(() => {
    dispatch(getTicketDate());
  }, [dispatch]);

  return (
    <>
      <br></br>
      <div className={styles.titleContainer}>
        <h1>LISTADO DE TICKETS</h1>
      </div>
      {/* <ViewData /> */}
      <div className='selectContainer'>
        <label className='filtroClientes' htmlFor="state-select">Filtrar por Loteria</label>
        <select
          id="state-select"
          value={selectedState}
          onChange={handleStateChange}
          className='letrasSelect'
        >
          <option value="">Filtrar por Loteria</option>
           {lotteriesDictionary.map((lottery, index) => (
            <option key={index} value={lottery.name}>
              {lottery.name}
            </option>
          ))}
        </select>
        <DateFilter2
          startDate={startDate}
          endDate={endDate}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
        />

      </div>
      <div className={styles.contenedorTable}>
        <table className={`${styles["content-table"]} ${styles["tabla-tickets"]}`}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Validación</th>
              <th>Loteria</th>
              <th className={styles.columnaRenderTicket}>Cliente</th> 
              <th className={styles.columnaRenderTicket}>Creado</th>
              <th className={styles.columnaRenderTicket}>Hora</th>
              <th className={styles.columnaRenderTicket}>Estado</th>
              <th className={styles.columnaRenderTicket}>Números</th>
              <th className={styles.columnaRenderTicket}>Apuestas</th>
              <th>Total</th>
              <th className={styles.columnaRenderTicket}>Pendiente</th>
            </tr>
          </thead>
          <tbody>
            {dataToRender?.length > 0 ? (
              dataToRender?.map((c, index) => (
                <tr key={c.idTicket} style={{ backgroundColor: 'white' }}>
                  <td>{c.idTicket}</td>
                  <td>{isCodeExpired(c.createdAt) ? '******' : c.validationCode}</td>
                  <td>{c.lotteryName} - {formatTime(c.lotteryHr)}</td>
                  <td className={styles.columnaRenderTicket}>{c.Client.name} {c.Client.surname}</td>
                  <td className={styles.columnaRenderTicket}>{formatFecha(c.createdAt)}</td>
                  <td className={styles.columnaRenderTicket}>{new Date(c.createdAt).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })}</td>
                  <td className={styles.columnaRenderTicket}>{c.state}</td>
                  <td className={styles.columnaRenderTicket}>
                    <table style={{ display: "flex", justifyContent: "center" }}>
                      <tbody>
                        <tr>
                          {c.TicketNumbers.map((numberInfo, index) => (
                            <td className={styles.columnaRenderTicket} style={{ borderRight: "1px solid #0e8a7181", borderLeft: "1px solid #0e8a7181", borderTop: "1px solid #0e8a7181", width: "46px" }} key={index}>
                           {numberInfo.number === 100 ? '00' : numberInfo.number >= 1 && numberInfo.number < 10 ? `0${numberInfo.number}` : numberInfo.number}
                          </td>
                          
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td className={styles.columnaRenderTicket}>
                    <table style={{ display: "flex", justifyContent: "center" }}>
                      <tbody>
                        <tr>
                          {c.TicketNumbers.map((numberInfo, index) => (
                            <td className={styles.columnaRenderTicket} style={{ borderRight: "1px solid #0e8a7181", borderLeft: "1px solid #0e8a7181", borderTop: "1px solid #0e8a7181", width:"70px" }} key={index}>
                              S/{numberInfo.bet}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td>S/ {c.total}</td>
                  <td className={styles.columnaRenderTicket}>
                    <button
                      onClick={() => handleChangeTicketState(c.idTicket)}
                      title="Pendiente"
                      className={isCodeExpired(c.createdAt) ? styles.buttonDisabled : ''}
                      disabled={isCodeExpired(c.createdAt)}
                    >

                      <img
                        style={{ width: '20px', height: '20px' }}
                        src={sandClock}
                        alt="Filter"
                      />
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