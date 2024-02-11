import React from "react";
import { Modal } from 'flowbite-react';
import { useSelector } from "react-redux";
import "./DialogClient.css";
import loading from "../assets/Loading.gif"

function DialogClient({ open1, onClose1 }) {
  const clientDetail = useSelector((state) => state.ClientDetail);

  const isMobile = window.innerWidth <= 768; // Verifica si el ancho de la ventana es menor o igual a 768px (puedes ajustar este valor)

  return (
    <>
      <Modal dismissible show={open1} isOpen={open1} size="5xl" onClose={onClose1} popup  style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", }}>
      <Modal.Body>
  <Modal.Header style={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px" }} />
  <div className="table-container" style={{ display: "flex", justifyContent: "center", maxHeight: "600px", overflowY: "auto" }}>
            {clientDetail === null || clientDetail === undefined ? ( // Verifica si clientDetail es null o undefined y muestra un mensaje de "Cargando información"
              <img style={{width:"50px",height:"50px", marginBottom:"20px",display:"flex",alignItems:"center"}} src={loading} alt="Loading..." />
            ) : (
              <table className='content-table tabla-clientes' style={{ margin: "20px" }}>
                <thead>
                  <tr>
                    <th>ID Ticket</th>
                    <th>Lottery Name</th>
                    <th>Lottery Hour</th>
                    {!isMobile && <th>Números</th>}
                    {!isMobile && <th>Apuestas</th>}
                    {/* <th>Monto</th> */}
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {clientDetail?.data.Tickets?.length > 0 ? ( // Verifica si hay datos en clientDetail.data.Tickets
                    clientDetail?.data.Tickets?.map((ticket) => (
                      <tr key={ticket.idTicket}>
                        <td>{ticket.idTicket}</td>
                        <td>{ticket.lotteryName}</td>
                        <td>{ticket.lotteryHr}</td>
                        {!isMobile && (
                          <>
                            <td style={{ display: "flex", justifyContent: "center" }}>
                              <table>
                                <tbody>
                                  <tr>
                                    {ticket.TicketNumbers.map((numberInfo, index) => (
                                      <td style={{ border: "1px solid #0e8a7181" }} key={index}>
                                        {numberInfo.number}
                                      </td>
                                    ))}
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <td>
                              <table style={{ display: "flex", justifyContent: "center" }}>
                                <tbody>
                                  <tr>
                                    {ticket.TicketNumbers.map((numberInfo, index) => (
                                      <td style={{ border: "1px solid #0e8a7181" }} key={index}>
                                        S/{numberInfo.bet}
                                      </td>
                                    ))}
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </>
                        )}
                        {/* <td>S/ {ticket.total}</td> */}
                        <td>{ticket.state}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No hay resultados que coincidan con el filtro.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DialogClient;
