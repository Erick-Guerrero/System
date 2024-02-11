// SelectDate.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTickets } from '../../../redux/actions';
import { dataName } from '../Constantes/Constantes';
import { Select } from 'flowbite-react';
import filter from "../../assets/filter.png"

function SelectDate({ onSelect, onSelectAll }) {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState('');
  const [selectLottery, setSelectLottery] = useState('');
  const [selectHr, setSelectHr] = useState('');

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const [nameLottery, hr] = selectedValue.split('|');
    setSelectHr(hr);
    setSelectLottery(nameLottery);
    onSelect(nameLottery, hr); // Notificar al componente padre sobre el cambio de selección
  };

  // Resto del código...

  const handleResetSelection = () => {
    window.location.reload()
  };
  

  return (
    <>
      <div>
        <label htmlFor="date" className="text-gray-300 m-2">
          <input className='rounded-md bg-white' style={{ border: '0.5px solid #0d473b', color: "green" }} type="date" id="date" name="date" />
        </label>
      </div>

      <br />

      <div className="max-w-md bg-red" id="select" style={{ display: 'flex', alignItems: 'center' }}>
  <div className="mb-2 block bg-red" style={{ display: 'flex', alignItems: 'center' }}>
    <Select id="lotteries" required onChange={handleSelectChange} value={selectedOption} style={{display:"flex",justifyContent:"center",marginLeft:"40px",marginBottom:"10px", backgroundColor: '#005643', border: '0.25px solid #0d473b', color: 'white', width: '230px' }}>
      <option value="" disabled={!selectedOption}>
        Seleccione su lotería
      </option>
      {dataName?.map((item, index) => (
        <option key={index} value={`${item.nameLottery}|${item.hr}`} style={{ padding: '8px', fontSize: '15px' }}>
          {item.nameLottery} {item.hr}
        </option>
      ))}
    </Select>
    <button onClick={handleResetSelection}   title="Limpiar Filtro" style={{ marginLeft: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>
      <img style={{ width: '30px', height: '30px', marginBottom:"15px" }} src={filter} alt="Filter" />
    </button>
  </div>
</div>
    </>
  );
}

export default SelectDate;
