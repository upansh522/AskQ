import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import './Header.css';

const Header = (prop) => {
  

  return (
    <div className='Header'>
      <div className='History' onClick={prop.onClickAdd}>
        <AddIcon className='Addicon' />
      </div>
      <div className='Name'>
        {/* <img src={process.env.PUBLIC_URL + '/Search logo.jpg'} className='logo' alt='Search Logo' /> */}
        <h2 className='title'>Chat AI</h2>
      </div>
    </div>
  );
};

export default Header;
