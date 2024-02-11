import React, { useState,useEffect } from 'react';
import {  useSelector,useDispatch } from 'react-redux';
import "./CajaComponent.css";
import TransferButton from '../TransferButton/TransferButton';
import { getCash } from '../../../redux/actions';

const CajaComponent = () => {
  const cashData = useSelector((state) => state.cash);
  const [saldoCaja, setSaldoCaja] = useState("");
  const [cajaTotal, setCajaTotal] = useState("");

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCash());
    }, [dispatch]);

console.log(cashData);
  const saldoCajaValue = cashData.data?.balance ?? 0;
  const todayTotalQuantityValue = cashData.data?.todayTotalQuantityIn ?? 0;
  const todayTotalQuantityValueOutT = cashData.data?.todayTotalQuantityOutT ?? 0;
  const todayTotalQuantityValueOutP = cashData.data?.todayTotalQuantityOutP ?? 0;
  const todayTotalQuantityCashValue = cashData.data?.todayTotalQuantityCash ?? 0;
  const todayTotalQuantityOthersValue = cashData.data?.todayTotalQuantityOthers ?? 0;
  const todayTotalSalesCommissionValue = cashData.data?.todayTotalSalesCommission ?? 0;
  const todayTotalpaymentCommissionValue = cashData.data?.todayTotalPaymentCommission ?? 0;

  return (
    <div className='centerCajaCont'>
      <div className='caja'>
        <h2 className='tituloCaja'>Control de Caja</h2>
        <div className='contenidoCaja'>
          <div>
            <h1 className='saldoCaja'>Caja Inicial: S/ {Math.floor(saldoCajaValue)}</h1>
            <h1 className='saldoCaja'>Ventas: S/ {Math.floor(todayTotalQuantityValue)} (Efec:S/ {Math.floor(todayTotalQuantityCashValue)} - Otros:S/ {Math.floor(todayTotalQuantityOthersValue)})</h1>
            <h1 className='saldoCaja'>Transferencias: S/ {Math.floor(todayTotalQuantityValueOutT)}</h1>         
          </div>
          <div>
            <h1 className='saldoCaja'>Comision Vta: S/ {Math.floor(todayTotalSalesCommissionValue)}</h1>
            <h1 className='saldoCaja'>Comision Pgo: S/ {Math.floor(todayTotalpaymentCommissionValue)}</h1>
            <h1 className='saldoCaja'>Premios Pagados: S/ {-Math.floor(todayTotalQuantityValueOutP)}</h1>
          </div>
        </div>
        <h1 className='saldoCaja'>Caja al corte: S/ {Math.floor(saldoCajaValue + todayTotalQuantityValue - todayTotalSalesCommissionValue - todayTotalpaymentCommissionValue + todayTotalQuantityValueOutT + todayTotalQuantityValueOutP)}</h1>
        <div className='Tbutton'>
          <TransferButton saldoCajaValue={Math.floor(saldoCajaValue)} todayTotalQuantityValue={Math.floor(saldoCajaValue + todayTotalQuantityValue - todayTotalSalesCommissionValue - todayTotalpaymentCommissionValue + todayTotalQuantityValueOutT + todayTotalQuantityValueOutP)} />
        </div>
      </div>
    </div>
  );
  
};

export default CajaComponent;
