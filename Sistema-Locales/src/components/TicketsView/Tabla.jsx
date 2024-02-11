import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearClientDetail, getClientId, getClientes } from "../../../redux/actions";
import edit from "../../assets/edit.png";
import PutClients from "../PutClients/PutClients";
import DialogClient from "../../DialogClient/DialogClient";

export default function Table() {
  const dispatch = useDispatch();
  const clientes = useSelector((state) => state.clientes);
  const [selectedUserName, setSelectedUserName] = useState('');
  const [selectedPhone, setSelectedPhone] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [selectedClientId1, setSelectedClientId1] = useState(null);

  const handleNameClear = () => {
    setSelectedUserName('');
  };

  const handlePhoneClear = () => {
    setSelectedPhone('');
  };


  function formatFecha(fecha) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(fecha).toLocaleDateString(undefined, options);
  }

  const handleNameChange = (e) => {
    setSelectedUserName(e.target.value);
  };


  const handlePhoneChange = (e) => {
    setSelectedPhone(e.target.value);
  };

  const handleEditClick = (clientId) => {
    setSelectedClientId(clientId);
    setShowDialog(true);
  };

  const handleClientId = (clientId) => {
    setShowDialog(true);
    setSelectedClientId1(clientId);
    dispatch(getClientId(clientId))
  }

  const handleCloseDialog = () => {
    dispatch(clearClientDetail());
    setShowDialog(false);
    setSelectedClientId(null);
    setSelectedClientId1(null);
  };

  const getLastFourDigits = (phoneNumber) => {
    const lastFour = phoneNumber.slice(-4); 
    return `****${lastFour}`; 
  };
  
  useEffect(() => {
    dispatch(getClientes());
  }, [dispatch]);

  const filteredClients = clientes.data?.filter((cliente) => {
    return (
      cliente.phone.toLowerCase().includes(selectedPhone.toLowerCase()) &&
      (cliente.name.toLowerCase().includes(selectedUserName.toLowerCase()) ||
      cliente.surname.toLowerCase().includes(selectedUserName.toLowerCase()) )
    );
  });

  return (
    <>
 {showDialog && (
  <>
    {selectedClientId ? (
      <PutClients
        open={showDialog}
        clientId={selectedClientId}
        onClose={handleCloseDialog}
      />
    ) : (
      selectedClientId1 && (
        <DialogClient
          open1={showDialog}
          onClose1={handleCloseDialog}
          clientId1={selectedClientId1}  
        />
      )
    )}
  </>
)}
      <br />
      <div className='titleContainer'>
        <h1>LISTADO DE CLIENTES</h1>
      </div>

      <div className='selectContainer'>
        

        <label className='filtroClientes' htmlFor="name-input">Filtrar por cliente</label>
        <div className='relative inline-block'>
          <input
            id="name-input"
            type="text"
            value={selectedUserName}
            onChange={handleNameChange}
            className='letrasSelect'
            placeholder="Filtrar por cliente"
          />
          {selectedUserName && <button onClick={handleNameClear} className='absolute right-2 text-xl font-thin top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer'>x</button>}
        </div>


        <label className='filtroClientes' htmlFor="phone-input">Filtrar por teléfono</label>
        <div className='relative inline-block'>
          <input
            id="phone-input"
            type="text"
            value={selectedPhone}
            onChange={handlePhoneChange}
            className='letrasSelect'
            placeholder="Filtrar por teléfono"
          />
          {selectedPhone && <button onClick={handlePhoneClear} className='absolute right-2 text-xl font-thin top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer'>x</button>}
        </div>

      </div>

      <div className='contenedorTable'>
        <table className='content-table tabla-clientes'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Telefono</th>
              <th>Creado</th>
              <th>Tickets</th>
              <th>Monto</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients?.length > 0 ? (
              filteredClients.map((c, index) => (
                <tr key={c.clientId} style={{ backgroundColor: 'white' }}>
                  <td>{index + 1}</td>
                  <td>{c.name} {c.surname}</td>
                  <td>{getLastFourDigits(c.phone)}</td>
                  <td>{formatFecha(c.createdAt)}</td>
                  <td>
                    <button onClick={() => {handleClientId(c.clientId)}}style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                      {c.totalTickets}
                    </button>
                  </td>
                  <td>S/ {c.totalAmountSpent}</td>
                  <td style={{ display: "flex", justifyContent: "center" }}>
                    <button onClick={() => handleEditClick(c.clientId)}>
                      <img
                        style={{ width: "20px", height: "20px", cursor: "pointer" }}
                        src={edit}
                        alt="Edit"
                      />
                    </button>
                  </td>
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
    </>
  );
}
