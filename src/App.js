import './App.css';
import React, { useState } from 'react';import Header from './Header.js';
import Main from './Main.jsx';
import Footer from './Footer.js';

const App=()=>{
  const [history, setHistory] = useState(false);

  const handleHistory = () => {
    setHistory(!history);
  };
   return(<>
    <Header onClickAdd={handleHistory}></Header>
    <Main historyShow={history}></Main>
    <Footer></Footer>
   </>)
}

export default App;
