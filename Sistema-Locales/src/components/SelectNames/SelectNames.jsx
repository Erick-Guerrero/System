import { Select } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import "../SelectNames/SelectNames.css"
import { getNameLottery } from '../Redux/Actions';
import { dataName } from '../Constantes/Constantes';

export default function SelectInput() {

  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const [nameLottery, hr] = selectedValue.split('|');
    dispatch(getNameLottery(nameLottery, hr));
    setSelectedOption(selectedValue);
  };

  return (
    <div className="max-w-md bg-red" id="select">
      <div className="mb-2 block bg-red">
        <Select id="lotteries"  required onChange={handleSelectChange} value={selectedOption} style={{ backgroundColor: '#005643' , border: '0.25px solid #0d473b' , color: "white", width:"230px" }}>
          <option value="" disabled={selectedOption ? false : true}>
            Seleccione su lotería
          </option>
          {dataName?.map((item) => (
            <option key={item.id} value={`${item.nameLottery}|${item.hr}`} style={{ padding: '8px',fontSize:"15px"  }}>
              {/* Agrega padding para aumentar el espacio entre las opciones */}
              {item.nameLottery} {item.hr}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
