import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCash } from "../../../redux/actions";
import "./ViewsHome.css";

function ViewsHome() {

  const dispatch = useDispatch()

  const cash = useSelector((state) => state.cash)

  console.log(cash);

  useEffect(() => {
  dispatch(getCash());
  }, [dispatch]);

  return (
    <>
      <div className="containerHome">
        <div className="contenerdorColumn">
            <div className="contenedorRow">
              <h1 className="titulos">Ventas: </h1>
            <div className="containerDays">
              <p className="days"> {Math.round(cash.data?.todayTotalQuantity)} </p>
              <p className="days"> {Math.round(cash.data?.lastWeekTotalQuantity)} </p>
              <p className="days3"> {Math.round(cash.data?.lastMonthTotalQuantity)} </p>
              </div> 
              </div>

            <div className="contenedorRow">
              <h1 className="titulos">Com. Vta: </h1>
            <div className="containerDays">
              <p className="days"> {Math.round(cash.data?.todayTotalSalesCommission)} </p>
              <p className="days"> {Math.round(cash.data?.lastWeekTotalSalesCommission)} </p>
              <p className="days3"> {Math.round(cash.data?.lastMonthTotalSalesCommission)} </p>
            </div>
            </div>
            <div className="contenedorRow">
              <h1 className="titulos">Com. Pgo: </h1>
            <div className="containerDays">
              <p className="days"> {Math.round(cash.data?.todayTotalPaymentCommission)} </p>
              <p className="days"> {Math.round(cash.data?.lastWeekTotalPaymentCommission)} </p>
              <p className="days3"> {Math.round(cash.data?.lastMonthTotalPaymentCommission)} </p>
            </div>
            </div>
          
        </div>

      </div>
    </>
  );
}

export default ViewsHome;
