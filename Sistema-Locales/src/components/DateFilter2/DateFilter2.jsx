import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTicketDate } from "../../../redux/actions";

function DateFilter2({ startDate, endDate, handleStartDateChange, handleEndDateChange }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (startDate && endDate) {
      const formattedStartDate = startDate;
      const formattedEndDate = endDate;
      dispatch(getTicketDate({ formattedStartDate, formattedEndDate }));
    }
  }, [dispatch, startDate, endDate]);

  const handleStartDateChange1 = (dateString) => {
    handleStartDateChange(dateString);
  };

  const handleEndDateChange1 = (dateString) => {
    handleEndDateChange(dateString);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label className='filtroClientes' htmlFor="start-date-picker">Fecha Inicio</label>
          <input
            id="start-date-picker"
            type="date"
            defaultValue={startDate}
            onChange={(e) => { handleStartDateChange1(e.target.value); }}
            className='letrasSelect'
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label className='filtroClientes' htmlFor="end-date-picker">Fecha Fin</label>

          <input
            id="end-date-picker"
            type="date"
            defaultValue={endDate}
            onChange={(e) => { handleEndDateChange1(e.target.value); }}
            className='letrasSelect'
          />
        </div>
      </div>
    </>
  );
}

export default DateFilter2;
