import React from 'react';
import style from "./RefreshButton.module.css"

function RefreshButton() {
    const handleRefresh = () => {
      window.location.reload();
    };
  
    return (
        <div className={style.btForm}>
      <button onClick={handleRefresh}  >
        Actualizar
      </button>
      </div>
    );
  };

  export default RefreshButton;