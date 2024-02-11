import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postCliente, getClientes } from '../../../redux/actions';
import swal from 'sweetalert';
import Navbar from '../Navbar/Navbar';
import style from './Form.module.css';

function ClientForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientes = useSelector((state) => state.clientes);
  const [duplicatedPhone, setDuplicatedPhone] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    genre: 'M',
    birthDate: '1998-07-01',
  });

  const c = clientes.data;

  useEffect(() => {
    const isDuplicated = c?.some((client) => client.phone === formData.phone);
    setDuplicatedPhone(isDuplicated);
    setIsValid(formData.phone.length > 5);
  }, [formData.phone, c]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(postCliente(formData));
      console.log(response);

      const { name, surname } = formData;
      if (!response || response.error) {
        console.error('Error al crear el cliente:', response);
      } else {
        swal(`El cliente ${name} ${surname} fue creado con éxito`, {
          icon: 'success',
          showButton: false,
        }).then(() => {
          navigate(`/home`);
        });
      }
    } catch (error) {
      console.error('Error al crear el cliente:', error);
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <div className={style.mainContainerForm}>
        <form onSubmit={handleSubmit}>
          <div className={style.contenedorInput}>
            <label className={style.titleInfo} htmlFor="name">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={style.letras}
            />
          </div>
          <div className={style.contenedorInput}>
            <label className={style.titleInfo} htmlFor="surname">
              Apellido
            </label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
              className={style.letras}
            />
          </div>
          <div className={style.contenedorInput}>
            <label className={style.titleInfo} htmlFor="email">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={style.letras}
            />
          </div>
          <div className={style.contenedorInput}>
            <label className={style.titleInfo} htmlFor="phoneNumber">
              Teléfono 
            </label>
            <div>
              <input
                className={style.letras1}
                
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              {duplicatedPhone && (
                <p className="text-red-600 text-center">Teléfono ya registrado</p>
              )}
            </div>
          </div>
          <div className={style.contenedorInput}>
            <label className={style.titleInfo} htmlFor="genre">
              Género
            </label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              className={style.letras}
            >
              <option value="F">Femenino</option>
              <option value="M">Masculino</option>
            </select>
          </div>
          <div className={style.contenedorInput}>
            <label className={style.titleInfo} htmlFor="birthDate">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              className={style.letras}
            />
          </div>
          <div className={duplicatedPhone || !isValid ? 'btFormDis' : 'btForm'}>
            <button type="submit" disabled={duplicatedPhone || !isValid}>
              Agregar Cliente
            </button>
          </div>
        </form>
      </div>
      <br />
    </>
  );
}

export default ClientForm;
