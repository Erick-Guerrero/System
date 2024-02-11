import ViewsHome from "../ViewsHome/ViewsHome";
import Navbar from "../Navbar/Navbar.jsx";
import CashTable from "../CashTable/CashTable.jsx";
import CajaComponent from '../CajaComponent/CajaComponent.jsx'
import InputTicket from "../InputTicket/InputTicket.jsx";
import RefreshButton from "../RefreshButton/RefreshButton.jsx";

function Caja(){

    return(
        <>
        <Navbar/>
        <br></br>

        <InputTicket/>
        <RefreshButton/>
   
        <CajaComponent />
        <CashTable/>
        </>
    )
}

 export default Caja;