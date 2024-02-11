import { useEffect, useState } from 'react';
import { Label, Modal, TextInput } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsuarios, putUsuario } from '../../../redux/actions';
import './PutUser.css';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function PutUser({ open, onClose, id }) {
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.usuarios);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUsuarios())
  
    // Actualizar el estado formData cuando la prop open cambie
    if (open && id) {
      const selectedUser = usuarios?.data.find((c) => c.id === id);

      if (selectedUser) {
        // Establecer la información del cliente en el estado formData
        setFormData({
          id: id,
          name: selectedUser.name,
          dni: selectedUser.dni,
          phoneYAPE: selectedUser.phoneYAPE,
          phonePLIN: selectedUser.phonePLIN,
          contactName: selectedUser.contactName,
          contactEmail: selectedUser.contactEmail,
          contactPhone: selectedUser.contactPhone,
          contactDni: selectedUser.contactDni,
          bankAccount1: selectedUser.bankAccount1,
          bankAccount2: selectedUser.bankAccount2,
          address: selectedUser.address,
          urbanization: selectedUser.urbanization,
          district: selectedUser.district,
          province: selectedUser.province,
          department: selectedUser.department,

        });
      }
    }
  }, [open, id, dispatch]);

  const [formData, setFormData] = useState({
    name: '',

    dni: '',
    phoneYAPE: '',
    phonePLIN: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactDni: '',
    bankAccount1: '',
    interbancario1: '',
    bankAccount2: '',
    interbancario2: '',
    address: '',
    urbanization: '',
    district: '',
    province: '',
    department: '',
    
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    console.log('Formulario enviado:', formData, id);
    dispatch(putUsuario(id, formData))
    dispatch(getAllUsuarios()).then(() => {
      navigate(`/perfil`);
    });
    onClose();
  };
  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'  }}>
      <div style={{ maxHeight: '80vh', }}> 

      <Modal show={open} isopen={open.toString()} size="md" onClose={onClose} popup>
        <Modal.Header />
        <Modal.Body>
          <div
            className="space-y-6 mx-auto text-center h-full "
          >
            <h3 className="text-xl font-medium text-gray-900 dark:text-white sticky">
              Editar Información del Usuario
            </h3>

            <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto',}}>
            
              
              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                <div className="items-start">
                  <Label htmlFor="name" value="Nombre"  />
                </div>
                <TextInput
                  style={{ paddingLeft: '0.5rem', marginLeft: '0.5rem', width: '200px', height: '40px', borderRadius: '10px',}}
                  id="name"
                  value={formData.name}
                  onChange={(event) =>
                    handleInputChange('name', event.target.value)
                  }
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                <div >
                  <Label htmlFor="dni" value="DNI"/>
                </div>
                <TextInput
                  style={{
                    paddingLeft: '0.5rem',
                    marginLeft: '0.5rem',
                    width: '200px',
                    height: '40px',
                    borderRadius: '10px',
                  }}
                  id="dni"
                  value={formData.dni}
                  onChange={(event) =>
                    handleInputChange('dni', event.target.value)
                  }
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                <div className="block">
                  <Label htmlFor="phonePLIN" value="Telefono PLIN" />
                </div>
                <TextInput
                  style={{
                    paddingLeft: '0.5rem',
                    marginLeft: '0.5rem',
                    width: '200px',
                    height: '40px',
                    borderRadius: '10px',
                  }}
                  id="phonePLIN"
                  value={formData.phonePLIN}
                  onChange={(event) =>
                    handleInputChange('phonePLIN', event.target.value)
                  }
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                <div className="block">
                  <Label htmlFor="phoneYAPE" value="Telefono YAPE" />
                </div>
                <TextInput
                  style={{
                    paddingLeft: '0.5rem',
                    marginLeft: '0.5rem',
                    width: '200px',
                    height: '40px',
                    borderRadius: '10px',
                  }}
                  id="phoneYAPE"
                  value={formData.phoneYAPE}
                  onChange={(event) =>
                    handleInputChange('phoneYAPE', event.target.value)
                  }
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                <div className="block">
                  <Label htmlFor="contactName" value="Contacto nombre" />
                </div>
                <TextInput
                  style={{
                    paddingLeft: '0.5rem',
                    marginLeft: '0.5rem',
                    width: '200px',
                    height: '40px',
                    borderRadius: '10px',
                  }}
                  id="contactName"
                  value={formData.contactName}
                  onChange={(event) =>
                    handleInputChange('contactName', event.target.value)
                  }
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                <div className="block">
                  <Label htmlFor="contactEmail" value="Contacto email" />
                </div>
                <TextInput
                  style={{
                    paddingLeft: '0.5rem',
                    marginLeft: '0.5rem',
                    width: '200px',
                    height: '40px',
                    borderRadius: '10px',
                  }}
                  id="contactEmail"
                  value={formData.contactEmail}
                  onChange={(event) =>
                    handleInputChange('contactEmail', event.target.value)
                  }
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                <div className="block">
                  <Label htmlFor="contactPhone" value="Contacto Tel." />
                </div>
                <TextInput
                  style={{
                    paddingLeft: '0.5rem',
                    marginLeft: '0.5rem',
                    width: '200px',
                    height: '40px',
                    borderRadius: '10px',
                  }}
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(event) =>
                    handleInputChange('contactPhone', event.target.value)
                  }
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                <div className="block">
                  <Label htmlFor="contactDni" value="Contacto DNI" />
                </div>
                <TextInput
                  style={{
                    paddingLeft: '0.5rem',
                    marginLeft: '0.5rem',
                    width: '200px',
                    height: '40px',
                    borderRadius: '10px',
                  }}
                  id="contactDni"
                  value={formData.contactDni}
                  onChange={(event) =>
                    handleInputChange('contactDni', event.target.value)
                  }
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                <div className="block">
                  <Label htmlFor="bankAccount1" value="Cuenta Bancaria 1" />
                </div>
                <TextInput
                  style={{
                    paddingLeft: '0.5rem',
                    marginLeft: '0.5rem',
                    width: '200px',
                    height: '40px',
                    borderRadius: '10px',
                  }}
                  id="bankAccount1"
                  value={formData.bankAccount1}
                  onChange={(event) =>
                    handleInputChange('bankAccount1', event.target.value)
                  }
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                <div className="block">
                  <Label htmlFor="interbancario1" value="Interbancario 1" />
                </div>
                <TextInput
                  style={{
                    paddingLeft: '0.5rem',
                    marginLeft: '0.5rem',
                    width: '200px',
                    height: '40px',
                    borderRadius: '10px',
                  }}
                  id="interbancario1"
                  value={formData.interbancario1}
                  onChange={(event) =>
                    handleInputChange('interbancario1', event.target.value)
                  }
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                <div className="block">
                  <Label htmlFor="bankAccount2" value="Cuenta Bancaria 2" />
                </div>
                <TextInput
                  style={{
                    paddingLeft: '0.5rem',
                    marginLeft: '0.5rem',
                    width: '200px',
                    height: '40px',
                    borderRadius: '10px',
                  }}
                  id="bankAccount2"
                  value={formData.bankAccount2}
                  onChange={(event) =>
                    handleInputChange('bankAccount2', event.target.value)
                  }
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                <div className="block">
                  <Label htmlFor="interbancario2" value="Interbancario 2" />
                </div>
                <TextInput
                  style={{
                    paddingLeft: '0.5rem',
                    marginLeft: '0.5rem',
                    width: '200px',
                    height: '40px',
                    borderRadius: '10px',
                  }}
                  id="interbancario2"
                  value={formData.interbancario2}
                  onChange={(event) =>
                    handleInputChange('interbancario2', event.target.value)
                  }
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                <div className="block">
                  <Label htmlFor="address" value="Direccion" />
                </div>
                <TextInput
                  style={{
                    paddingLeft: '0.5rem',
                    marginLeft: '0.5rem',
                    width: '200px',
                    height: '40px',
                    borderRadius: '10px',
                  }}
                  id="address"
                  value={formData.address}
                  onChange={(event) =>
                    handleInputChange('address', event.target.value)
                  }
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                <div className="block">
                  <Label htmlFor="urbanization" value="Urbanizacion" />
                </div>
                <TextInput
                  style={{
                    paddingLeft: '0.5rem',
                    marginLeft: '0.5rem',
                    width: '200px',
                    height: '40px',
                    borderRadius: '10px',
                  }}
                  id="urbanization"
                  value={formData.urbanization}
                  onChange={(event) =>
                    handleInputChange('urbanization', event.target.value)
                  }
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                <div className="block">
                  <Label htmlFor="district" value="Distrito" />
                </div>
                <TextInput
                  style={{
                    paddingLeft: '0.5rem',
                    marginLeft: '0.5rem',
                    width: '200px',
                    height: '40px',
                    borderRadius: '10px',
                  }}
                  id="district"
                  value={formData.district}
                  onChange={(event) =>
                    handleInputChange('district', event.target.value)
                  }
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                <div className="block">
                  <Label htmlFor="province" value="Provincia" />
                </div>
                <TextInput
                  style={{
                    paddingLeft: '0.5rem',
                    marginLeft: '0.5rem',
                    width: '200px',
                    height: '40px',
                    borderRadius: '10px',
                  }}
                  id="province"
                  value={formData.province}
                  onChange={(event) =>
                    handleInputChange('province', event.target.value)
                  }
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                <div className="block">
                  <Label htmlFor="department" value="Departamento" />
                </div>
                <TextInput
                  style={{
                    paddingLeft: '0.5rem',
                    marginLeft: '0.5rem',
                    width: '200px',
                    height: '40px',
                    borderRadius: '10px',
                  }}
                  id="department"
                  value={formData.department}
                  onChange={(event) =>
                    handleInputChange('department', event.target.value)
                  }
                  required
                />
              </div>

                <br />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: 'black',
                }}
              >
                <button className="botonAct" onClick={handleSubmit}>
                  <span className="transition"></span>
                  <span className="gradient"></span>
                  <span className="label">Actualizar</span>
                </button>
                  <br />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
          </div>
          </div>
    </>
  );
}

export default PutUser;