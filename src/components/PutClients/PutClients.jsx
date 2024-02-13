import React, { useEffect, useState } from "react";
import { Button, Label, Modal, TextInput, Select } from 'flowbite-react';
import { useDispatch, useSelector } from "react-redux";
import { putClient, putUsuario } from "../../../redux/actions";
import "./PutClients.css"

function PutClients({ open, onClose,clientId }) {

  const dispatch = useDispatch()
  const clientes = useSelector((state) => state.clientes);

  const getLastFourDigits = (phoneNumber) => {
    const lastFour = phoneNumber.slice(-4); 
    return `****${lastFour}`; 
  };

  const getLastFourCharacters = (email) => {
    const atIndex = email.indexOf('@');
    
    if (atIndex !== -1) {
      const asterisks = '*'.repeat(atIndex);
      const lastPart = email.substring(atIndex);
      return `${asterisks}${lastPart}`;
    } else {
      // Handle the case where '@' is not present in the email
      return email;
    }
  };
  
  

  useEffect(() => {
    // Actualizar el estado formData cuando la prop open cambie
    if (open && clientId) {
      const selectedClient = clientes.data.find((c) => c.clientId === clientId);
  
      if (selectedClient) {
        // Establecer la información del cliente en el estado formData
        setFormData({
          clientId:clientId,
          name: selectedClient.name,
          surname: selectedClient.surname,
          email: getLastFourCharacters(selectedClient.email),
          phone: getLastFourDigits(selectedClient.phone),
          genre: selectedClient.genre,
          birthDate: selectedClient.birthDate,
        });
      }
    }
  }, [open, clientId]);

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    genre: 'M',
    birthDate: '1998-07-01',
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

const handleSubmit = async () => {
  console.log('Formulario enviado:', formData);
  await dispatch(putClient(clientId, formData));
  // window.location.reload()
  onClose(); 
};
  return (
    <>
    <Modal dismissible  show={open} isOpen={open} size="md" onClose={onClose} popup className="flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80" style={{marginTop:"50px"}}>
        <Modal.Header />
        <Modal.Body>
        <div className="space-y-6 mx-auto text-center"  style={{width:"200px" }}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Client Information</h3>
            <div style={{display:"flex", justifyContent:"center", flexDirection:"column",alignItems:"center"}}>
              <div className="mb-2 ml-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput
              style={{ marginLeft: '0.5rem', width:"200px", height:"40px", borderRadius:"10px" }} 
              
                id="name"
                placeholder="John"
                value={formData.name}
                onChange={(event) => handleInputChange('name', event.target.value)}
                required
              />
            </div>
            <div style={{display:"flex", justifyContent:"center", flexDirection:"column",alignItems:"center"}}>
              <div className="mb-2 ml-2 block">
                <Label htmlFor="surname" value="Surname" />
              </div>
              <TextInput
              style={{ marginLeft: '0.5rem', width:"200px", height:"40px", borderRadius:"10px" }} 
                id="surname"
                placeholder="Doe"
                value={formData.surname}
                onChange={(event) => handleInputChange('surname', event.target.value)}
                required
              />
            </div>
            <div style={{display:"flex", justifyContent:"center", flexDirection:"column",alignItems:"center"}}>
              <div className="mb-2 ml-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
              style={{ marginLeft: '0.5rem', width:"200px", height:"40px", borderRadius:"10px" }} 
                id="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={(event) => handleInputChange('email', event.target.value)}
                required
              />
            </div>
            <div style={{display:"flex", justifyContent:"center", flexDirection:"column",alignItems:"center"}}>
              <div className="mb-2 ml-2 block">
                <Label htmlFor="phone" value="Phone" />
              </div>
              <TextInput
              style={{ marginLeft: '0.5rem', width:"200px", height:"40px", borderRadius:"10px" }} 
                id="phone"
                placeholder="123-456-7890"
                value={formData.phone}
                onChange={(event) => handleInputChange('phone', event.target.value)}
                required
              />
            </div>
            <div style={{display:"flex", justifyContent:"center", flexDirection:"column",alignItems:"center"}}>
              <div className="mb-2 ml-2  block">
                <Label htmlFor="genre" value="Genre" />
              </div>
              <Select
              style={{ marginLeft: '0.5rem', width:"200px", height:"40px", borderRadius:"10px" }} 
                id="genre"
                value={formData.genre}
                onChange={(event) => handleInputChange('genre', event.target.value)}
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </Select>
            </div>
            <div style={{display:"flex", justifyContent:"center", flexDirection:"column",alignItems:"center"}}>
              <div className="mb-2 ml-2 block ">
                <Label htmlFor="birthDate" value="Birth Date" />
              </div>
              <TextInput
                style={{ marginLeft: '0.5rem', width:"200px" }} 
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(event) => handleInputChange('birthDate', event.target.value)}
                required
              />
            </div>
            <div style={{display:"flex", justifyContent:"center", flexDirection:"column",alignItems:"center", color:"black"}}>
            <button className="botonAct" onClick={handleSubmit}>
              <span className="transition"></span>
              <span className="gradient"></span>
              <span className="label">Actualizar</span>
            </button>
            
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PutClients;
