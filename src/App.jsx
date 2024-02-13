import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MiPerfil from './components/MiPerfil/MiPerfil';
import ClientForm from './components/Form/Form';
import Clientes from './components/Clientes/Clientes';
import ApuestaForm from './components/Tickets/Tickets';
import Caja from './components/Caja/Caja';
import TicketView from './components/TicketsView/TicketView';
import AuthGuard from './components/AuthGuard/AuthGuard';


function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />

        <Route element={<AuthGuard />}>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/perfil" element={<MiPerfil />} />
          <Route exact path="/form" element={<ClientForm />} />
          <Route exact path="/tickets" element={<ApuestaForm />} />
          <Route exact path="/clientes" element={<Clientes />} />
          <Route exact path="/caja" element={<Caja />} />
          <Route exact path="/ticketView" element={<TicketView />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
