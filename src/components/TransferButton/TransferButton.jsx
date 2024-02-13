import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './TransferButton.css';
import { newTransfer } from '../../../redux/actions';

const TransferButton = ({ saldoCajaValue, todayTotalQuantityValue }) => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    quantity: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    setData({
      ...data,
      quantity: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(newTransfer(data));
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const isTransferPossible = parseFloat(todayTotalQuantityValue) >= parseFloat(data.quantity);
  const buttonClassName = `transfer__button ${isTransferPossible ? 'enabled' : 'disabled'}`;

  return (
    <>
      <div className="containerTransfer">
        <div className="search-container">
          <input
            className="input"
            style={{ backgroundColor: '#d1efe9' }}
            type="number"
            placeholder="Cantidad"
            name="quantity"
            value={data.quantity}
            onChange={handleChange}
          />
          <button className={buttonClassName} onClick={handleSubmit} disabled={!isTransferPossible} title='Excede la cantidad de Caja'>
            Transferir
          </button>
        </div>
      </div>
    </>
  );
};

export default TransferButton;
