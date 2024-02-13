import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { emailRegex } from '../../../helpers/helpers';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/actions/index.js';
import swal from 'sweetalert';
import './Login.css';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [showPassword, setShowPassword] = useState(false);
  //   const [emailError, setEmailError] = useState(false);

  // const toggleShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };
  const submitHandler = async (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      swal({
        title: 'Los campos no pueden estar vacíos',
        icon: 'warning',
      });
      return;
    }

    if (!emailRegex.test(email)) {
      swal({
        title: 'Debe ingresar un email válido',
        icon: 'warning',
      });
      return;
    }

    // console.log(email, password);

    dispatch(login(email, password)).then(() => {
      if (localStorage.getItem('token')) {
        navigate('/home');
      } else {
        swal({
          title: 'Los datos de inicio de sesion no son validos!',
          icon: 'warning',
        });
      }
    });
  };

  return (
    <div className="fondo">
      <div className="contenedor">
        <form onSubmit={submitHandler} className="loginForm">
          <div className="flexRow">
            <label className="lfLabel" htmlFor="username">
              <svg width="12px" height="13px" fill="#000000">
                <path d="M8.9,7.2C9,6.9,9,6.7,9,6.5v-4C9,1.1,7.9,0,6.5,0h-1C4.1,0,3,1.1,3,2.5v4c0,0.2,0,0.4,0.1,0.7 C1.3,7.8,0,9.5,0,11.5V13h12v-1.5C12,9.5,10.7,7.8,8.9,7.2z M4,2.5C4,1.7,4.7,1,5.5,1h1C7.3,1,8,1.7,8,2.5v4c0,0.2,0,0.4-0.1,0.6 l0.1,0L7.9,7.3C7.6,7.8,7.1,8.2,6.5,8.2h-1c-0.6,0-1.1-0.4-1.4-0.9L4.1,7.1l0.1,0C4,6.9,4,6.7,4,6.5V2.5z M11,12H1v-0.5 c0-1.6,1-2.9,2.4-3.4c0.5,0.7,1.2,1.1,2.1,1.1h1c0.8,0,1.6-0.4,2.1-1.1C10,8.5,11,9.9,11,11.5V12z" />
              </svg>
            </label>
            <input
              id="username"
              className="lfInput"
              placeholder="Ingrese su Mail"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="flexRow">
            <label className="lfLabel" htmlFor="password">
              <svg width="15px" height="5px" fill="#000000">
                <path d="M6,2L6,2c0-1.1-1-2-2.1-2H2.1C1,0,0,0.9,0,2.1v0.8C0,4.1,1,5,2.1,5h1.7C5,5,6,4.1,6,2.9V3h5v1h1V3h1v2h1V3h1 V2H6z M5.1,2.9c0,0.7-0.6,1.2-1.3,1.2H2.1c-0.7,0-1.3-0.6-1.3-1.2V2.1c0-0.7,0.6-1.2,1.3-1.2h1.7c0.7,0,1.3,0.6,1.3,1.2V2.9z" />
              </svg>
            </label>
            <input
              id="password"
              className="lfInput"
              // required
              // type={showPassword ? 'text' : 'password'}
              type="password"
              name="password"
              placeholder="Ingrese su contraseña..."
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="buttonContainer">
            <button
              className="button2"
              type="submit"
              value="LOGIN"
              // disabled={!email || !password}
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
        <a className="lfForgot" href="#">
          Forgot password?
        </a>
      </div>
    </div>
  );
}

export default Login;
