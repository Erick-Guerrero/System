import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { postCash } from "../../../redux/actions";

function DateFilter({ startDate, endDate, handleStartDateChange, handleEndDateChange }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (startDate && endDate) {
      const formattedStartDate = startDate;
      const formattedEndDate = endDate;
      dispatch(postCash({ formattedStartDate, formattedEndDate }));
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
          {/* Use the 'defaultValue' prop to show the selected date */}
          <input
            id="start-date-picker"
            type="date"
            defaultValue={startDate} // Use 'defaultValue' instead of 'value'
            onChange={(e) => { handleStartDateChange1(e.target.value); }}
            className='letrasSelect'
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label className='filtroClientes' htmlFor="end-date-picker">Fecha Fin</label>
          {/* Use the 'defaultValue' prop to show the selected date */}
          <input
            id="end-date-picker"
            type="date"
            defaultValue={endDate} // Use 'defaultValue' instead of 'value'
            onChange={(e) => { handleEndDateChange1(e.target.value); }}
            className='letrasSelect'
          />
        </div>
      </div>
    </>
  );
}

export default DateFilter;
