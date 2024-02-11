import { useEffect, useState } from 'react';
import { Label, Modal, TextInput, Select } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { putUsuario } from '../../../redux/actions';
import './PutUser.css';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function PutUser({ open, onClose, id }) {
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.usuarios);
  const navigate = useNavigate();

  useEffect(() => {
    // Actualizar el estado formData cuando la prop open cambie
    if (open && id) {
      const selectedUser = usuarios.data.find((c) => c.id === id);

      if (selectedUser) {
        // Establecer la información del cliente en el estado formData
        setFormData({
          id: id,
          name: selectedUser.name,
          email: selectedUser.email,
          role: selectedUser.role,
        });
      }
    }
  }, [open, id, usuarios.data]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });

  // console.log(id);
  // console.log(formData);
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    console.log('Formulario enviado:', formData);
    await dispatch(putUsuario(id, formData)).then(() => {
      navigate(`/usuarios`);
    });
    // window.location.reload();
    onClose();
  };
  return (
    <>
      <Modal
        show={open}
        isopen={open.toString()}
        size="md"
        onClose={onClose}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div
            className="space-y-6 mx-auto text-center"
            style={{ width: '200px' }}
          >
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Información del Usuario
            </h3>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div className="mb-2 ml-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput
                style={{
                  paddingLeft: '0.5rem',
                  marginLeft: '0.5rem',
                  width: '200px',
                  height: '40px',
                  borderRadius: '10px',
                }}
                id="name"
                value={formData.name}
                onChange={(event) =>
                  handleInputChange('name', event.target.value)
                }
                required
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div className="mb-2 ml-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                style={{
                  paddingLeft: '0.5rem',
                  marginLeft: '0.5rem',
                  width: '200px',
                  height: '40px',
                  borderRadius: '10px',
                }}
                id="email"
                value={formData.email}
                onChange={(event) =>
                  handleInputChange('email', event.target.value)
                }
                required
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div className="mb-2 ml-2  block">
                <Label htmlFor="role" value="role" />
              </div>
              <Select
                style={{
                  marginLeft: '0.5rem',
                  width: '200px',
                  height: '40px',
                  borderRadius: '10px',
                }}
                id="role"
                value={formData.role}
                onChange={(event) =>
                  handleInputChange('role', event.target.value)
                }
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </Select>
            </div>

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
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PutUser;
