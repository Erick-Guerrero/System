import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsuarios } from "../../../redux/actions";
import DateFilter from "../DateFilter/DateFilter.jsx";
import "./CashTable.css"

export default function CashTable() {
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.usuarios);
  const cashData = useSelector((state) => state.cash);
  const filterCashData = useSelector((state) => state.filterCash);
  const [selectedUserName, setSelectedUserName] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderCellValue = (value) => {
    return value !== null ? value.toFixed(1) : '-';
  };

  const handleStartDateChange = (dateString) => {
    // Parsear la cadena de fecha al formato de objeto Date
    const formattedDate = dateString ? new Date(`${dateString}T23:59:59`) : null;

    if (formattedDate) {
      // Ajustar la fecha para evitar diferencias horarias
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

  const handleEditClick = (id) => {
    setSelectedUserId(id);
    setShowDialog(true);
  };

  useEffect(() => {
    dispatch(getAllUsuarios());
    
  }, [dispatch]);

  let dataToRender = filterCashData?.data?.cash.length > 0 ? filterCashData.data?.cash : cashData?.data?.cash;

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

 
  return (
    <>

      <br />
      <div className='titleContainer'>
        <h1>DETALLE CAJA</h1>
      </div>

      <div className='selectContainer'>

        {/* <label className='filtroClientes' htmlFor="state-select">Filtrar por estado</label>
        <select
          id="state-select"
          value={selectedState}
          onChange={handleStateChange}
          className='letrasSelect'
        >
          <option value="">Filtrar por estado</option>
          <option value="INGRESO">Ingreso</option>
          <option value="EGRESO">Egreso</option>
        </select> */}
        <DateFilter
          startDate={startDate}
          endDate={endDate}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
        />

      </div>

      <div className='contenedorTable'>
        <table className='content-table tabla-cash'>
          <thead>
            <tr>
              <th>ID Ticket</th>
              <th className="columnaRender">ID Local</th>
              <th  className="columnaRender">Tipo</th>
              <th>Monto</th>
              <th  className="columnaRender">Detalle</th>
              <th  className="columnaRender">Pago</th>
              <th>Estado</th>
              <th className="columnaRender">Comisión de Ventas</th>
              <th className="columnaRender">Comisión de Pago</th>
              <th>Premio Total</th>
              <th className="columnaRender">Creado</th>
              <th className="columnaRender">Estado</th>
            </tr>
          </thead>
          <tbody>
        {dataToRender?.length > 0 ? (
              dataToRender.map((item, index) => (
                <tr key={item.id} style={{backgroundColor:"white"}}>
                  <td>{item.idTicket}</td>
                  <td  className="columnaRender">{item.userId}</td>
                  <td  className="columnaRender" style={{ color: item.type === "INGRESO" ? '#81bd13' : item.type === "EGRESO" ? 'red' : 'inherit' }} >{item.type}</td>
                  <td style={{ color: item.quantity > 0 ? '#81bd13' : item.quantity < 0 ? 'red' : 'inherit' }}>{item.quantity}</td>
                  <td  className="columnaRender">{item.detail}</td>
                  <td  className="columnaRender">{item.paymentMethod}</td>
                  <td>{item.state}</td>
                  <td  className="columnaRender">{renderCellValue(item.salesCommissionPercentage)}</td>
                  <td  className="columnaRender">{renderCellValue(item.paymentCommissionPercentage)}</td>
                  <td>
                    {((item.firstPrize !== null ? parseInt(item.firstPrize) : 0) +
                      (item.SecondPrize !== null ? parseInt(item.SecondPrize) : 0) +
                      (item.ThirdPrize !== null ? parseInt(item.ThirdPrize) : 0)) || '-'}
                  </td>
                  <td className="columnaRender">{formatDate(item.createdAt)}</td>
                  <td className="columnaRender">{item.Ticket && item.Ticket.state}</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14">No hay resultados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
