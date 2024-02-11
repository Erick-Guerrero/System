// import NavBar from '../NavBar/NavBar';
import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import Navbar from '../Navbar/Navbar';
import style from './MiPerfil.module.css';
// import {  TextField, Card, CardMedia, Typography, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material/';
import { useDispatch, useSelector } from 'react-redux';
import { checkLogin, getAllUsuarios, putOwnUsuario } from '../../../redux/actions';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import PutUser from '../PutUser/PutUser';

const MiPerfil = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { data } = useSelector((state) => state.usuarios);
  const [open, setOpen] = useState(false);
  const [openEditEmail, setOpenEditEmail] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [usuario, setUsuario] = useState(null);

  const [passwords, setPasswords] = useState({
    oldPass: '',
    newPass: '',
    newPassAgain: '',
    password: '',
  });
  const [pass, setPass] = useState({
    // email: '',
    password: '',
  });

  const [emails, setEmails] = useState({
    oldMail: '',
    newMail: '',
    newMailAgain: '',
    email: '',
  });
  const [mail, setMail] = useState({
    email: '',
  });

  // HAY 2 useEFFECT PARA QUE NO HAGA UN LOOP INFINITO!!!!!

  
  useEffect(() => {
    dispatch(getAllUsuarios());
  }, [showDialog]); // lista de dependencias vacía

  useEffect(() => {
    const usuario = data?.find((e) => e.email === ses.email);
    setUsuario(usuario);
    // setPass({email: usuario.email})
  }, [data]); // `data` en la lista de dependencias

  const token = localStorage.getItem('token');
  // const id = localStorage.getItem('userid');

  const ses = JSON.parse(Buffer.from(token.split('.')[1], 'BASE64').toString());


  const handleChange = (event) => {
    const { name, value } = event.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
    setEmails({
      ...emails,
      [name]: value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenEmail = () => {
    setOpenEditEmail(true);
  };

  const handleCloseSession = (e) => {
    e.preventDefault;
    swal({
      title: `${ses.name.split(' ')[0]} ¿Está seguro que quiere cerrar sesión?`,
      icon: 'warning',
      buttons: true,
    }).then((logout) => {
      if (logout) {
        localStorage.clear();
        swal(`La sesion de ${ses.name} fue cerrada con éxito`, {
          icon: 'success',
          timer: 1000,
          showButton: false,
        }).then(() => {
          navigate(`/`);
        });
      }
    });
  };

  const handleActualizarPass = () => {
    dispatch(checkLogin(usuario.email, passwords.oldPass))
     .then(() => {
        // const token = localStorage.getItem('token');
        setPass({ password: passwords.newPass});
        return pass;
     })
     .then((pass) => {
         dispatch(putOwnUsuario(pass));
         console.log(pass);
     })
     .then(() => {
         swal({
           title: `Su contraseña fue actualizada con éxito.`,
           text: `Ingrese a su cuenta nuevamente`,
           icon: 'success',
           showbutton: false,
         }).then(() => {
           localStorage.clear();
           navigate(`/`);
         });
         setOpen(false);
     })
     .catch((error) => console.error(error))
     swal({
      title: `Contraseña incorrecta.`,
      text: `Ingrese su contraseña nuevamente`,
      icon: 'error',
      showbutton: false,
    })
  };

  const handleActualizarEmail = () => {
      setMail({ email: emails.newMail })
      dispatch(putOwnUsuario(mail))
      .then(() => {
        swal({
          title: `Su email fue actualizado con éxito.`,
          text: `Ingrese a su cuenta nuevamente`,
          icon: 'success',
          showbutton: false,
        }).then(() => {
          localStorage.clear();
          navigate(`/`);
        });
        // console.log(pass.password);
        setOpen(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (passwords.newPass) {
      setPass({ password: passwords.newPass });
    }
    if (emails.newMail) {
      setMail({ email: emails.newMail });
    }
  }, [passwords.newPass, emails.newMail]);

  const handleClose = () => {
    setPasswords({
      oldPass: '',
      newPass: '',
      newPassAgain: '',
    });
    setOpen(false);
  };

  const handleCloseEmail = () => {
    setEmails({
      oldMail: '',
      newMail: '',
      newMailAgain: '',
    });
    setOpenEditEmail(false);
  };

  const handleEditClick = () => {
    setSelectedUserId(ses.id);
    setShowDialog(true);
  };

  return (
    <>
      {showDialog && (
        <PutUser
          open={showDialog}
          id={selectedUserId}
          userId={selectedUserId}
          onClose={() => setShowDialog(false)}
        />
      )}

      <Navbar />

      <div className="flex flex-col items-center my-6 text-white">

        <div className={style.threeButtons}>
          <div className={style.btForm} >
            <button onClick={handleClickOpen} style={{width:'182px'}}>
              Cambiar contraseña
            </button>
          </div>

          <div className={style.btForm}>
            <button onClick={handleClickOpenEmail} style={{width:'182px'}}>
              Cambiar email
            </button>
          </div>

          <div className={style.btForm}>
            <button onClick={handleEditClick} style={{width:'182px'}}>
              Editar mis datos
            </button>
          </div>
        </div>

        <div className='block sm:hidden'>
          <div className={style.btForm}>
            <button onClick={handleCloseSession} style={{width:'182px'}}>
              Cerrar sesión
            </button>
          </div>
        </div>
        
        <br />

        <div className={style.card}>
      <div className={style.titleContainer}>
        <h2>Mi perfil</h2>
      </div>
      <br />
      <div className={style.cardContent}>
        <div className={style.cardItem}>
          <h3>Usuario:</h3>
          <p>{usuario?.name}</p>
        </div>
        <div className={style.cardItem}>
          <h3>Usuario:</h3>
          <p>{usuario?.id}</p>
        </div>
        <div className={style.cardItem}>
          <h3>Email:</h3>
          <p>{usuario?.email}</p>
        </div>
        <div className={style.cardItem}>
          <h3>DNI:</h3>
          <p>{usuario?.dni}</p>
        </div>
        <div className={style.cardItem}>
          <h3>Teléfono YAPE:</h3>
          <p>{usuario?.phoneYAPE}</p>
        </div>
        <div className={style.cardItem}>
          <h3>Teléfono PLIN:</h3>
          <p>{usuario?.phonePLIN}</p>
        </div>

        <div className={style.cardItem}>
          <h3>Contacto Nombre:</h3>
          <p>{usuario?.contactName}</p>
        </div>

        <div className={style.cardItem}>
          <h3>Contacto Email:</h3>
          <p>{usuario?.contactEmail}</p>
        </div>

        <div className={style.cardItem}>
          <h3>Contacto Tel.:</h3>
          <p>{usuario?.contactPhone}</p>
        </div>

        <div className={style.cardItem}>
          <h3>Contacto DNI:</h3>
          <p>{usuario?.contactDni}</p>
        </div>

        <div className={style.cardItem}>
          <h3>Cuenta Bancaria 1:</h3>
          <p>{usuario?.bankAccount1}</p>
        </div>
        <div className={style.cardItem}>
          <h3>Cuenta Bancaria 2:</h3>
          <p>{usuario?.bankAccount2}</p>
        </div>
        <div className={style.cardItem}>
          <h3>Dirección:</h3>
          <p>{usuario?.address}</p>
        </div>
        <div className={style.cardItem}>
          <h3>Urbanización:</h3>
          <p>{usuario?.urbanization}</p>
        </div>
        <div className={style.cardItem}>
          <h3>Distrito:</h3>
          <p>{usuario?.district}</p>
        </div>
        <div className={style.cardItem}>
          <h3>Provincia:</h3>
          <p>{usuario?.province}</p>
        </div>
        <div className={style.cardItem}>
          <h3>Departamento:</h3>
          <p>{usuario?.department}</p>
        </div>
      </div>
    </div>
    

      </div>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-300 bg-opacity-75">
        <div className="flex flex-col modal-container max-w-md m-4 p-8 rounded bg-slate-300">
          <div style={{display:"flex", justifyContent:"center"}}>
            <h2 >Cambie su contraseña</h2>
            </div>
            <input
              className="rounded"
              name="oldPass"
              type="password"
              placeholder="contraseña acutal"
              label="contraseña acutal"
              onChange={handleChange}
              value={passwords.oldPass}
            />
            <br></br>

            <input
              className="rounded"
              name="newPass"
              type="password"
              placeholder="nueva contraseña"
              label="nueva contraseña"
              onChange={handleChange}
              value={passwords.newPass}
            />

            <br></br>

            <input
              className="rounded"
              name="newPassAgain"
              type="password"
              placeholder="nueva contraseña"
              label="nueva contraseña"
              onChange={handleChange}
              value={passwords.newPassAgain}
            />

            <div className="flex flex-row">
            <div className={style.btForm}>

              <button
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 m-2"
                onClick={handleClose}
                >
                Cerrar
              </button>
                </div>

              <div className={
                  !passwords.oldPass ||
                  !passwords.newPass ||
                  !passwords.newPassAgain ||
                  passwords.newPass !== passwords.newPassAgain
                  ? style.btFormDis
                  : style.btForm
                }>
              <button
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 m-2"
                disabled={
                  
                  !passwords.oldPass ||
                  !passwords.newPass ||
                  !passwords.newPassAgain ||

                  passwords.newPass !== passwords.newPassAgain
                }
                onClick={handleActualizarPass}
                >
                Actualizar
              </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {openEditEmail && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-300 bg-opacity-75">
        <div className="flex flex-col modal-container max-w-md m-4 p-8 rounded bg-slate-300">
          <div style={{display:"flex", justifyContent:"center"}}>
            <h2 >Cambie su email</h2>
            </div>
            <input
              className="rounded"
              name="oldMail"
              type="text"
              placeholder="email acutal"
              label="email acutal"
              onChange={handleChange}
              value={emails.oldMail}
            />
            <br></br>

            <input
              className="rounded"
              name="newMail"
              type="email"
              placeholder="nuevo email"
              label="nuevo email"
              onChange={handleChange}
              value={emails.newMail}
            />
            <br></br>

            <input
              className="rounded"
              name="newMailAgain"
              type="email"
              placeholder="nuevo email"
              label="nuevo email"
              onChange={handleChange}
              value={emails.newMailAgain}
            />

            <div className="flex flex-row">
            <div className={style.btForm}>

              <button
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 m-2"
                onClick={handleCloseEmail}
                >
                Cerrar
              </button>
                </div>

              <div className={ 
                  usuario.email !== emails.oldMail ||
                  !emails.oldMail ||
                  !emails.newMail ||
                  !emails.newMailAgain ||
                  emails.newMail !== emails.newMailAgain 
                  ? style.btFormDis
                  : style.btForm
                }>
                  
              <button
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 m-2"
                disabled={
                  usuario.email !== emails.oldMail ||
                  !emails.oldMail ||
                  !emails.newMail ||
                  !emails.newMailAgain ||
                  emails.newMail !== emails.newMailAgain
                }
                onClick={handleActualizarEmail}
                >
                Actualizar
              </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MiPerfil;
