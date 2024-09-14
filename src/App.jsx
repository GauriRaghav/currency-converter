import { useState,useEffect,useId } from 'react'
// import './App.css'
import CurrencyConverter from './Components/CurrencyConverter'


const bgImageStyle = {
  backgroundImage: 'url(map-world-currency-dollar-bills.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

function App() {
  return <div className='min-h-screen flex flex-col items-center justify-center' style={bgImageStyle}> 
  <div className='container'>

  <CurrencyConverter/></div> 
  </div>
}

 export default App
