import React from 'react';
import './CardHome.css'; 
import { Link } from 'react-router-dom';

const CardComponent = ({ nombre, detalle, link }) => {
  return (

    <div className='containerCard'>
    <div className="e-card playing">
      <Link to={link}>
        <div className="image"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="infotop">
        <br />
        {nombre}
        <br />
       <p className='name' >{detalle}</p>
        </div>
      </Link>
    </div>
    </div>
  );
};

export default CardComponent;
