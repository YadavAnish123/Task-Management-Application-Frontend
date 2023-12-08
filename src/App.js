 
import Registation from './components/Registation';
import Navebar from './components/Navebar';
import Login from './components/Login';
import Home from './components/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import React ,{useState}from 'react'
import DataState from './context/DataState';

function App() {
  
  
  return (
    <DataState>
    <Router>
    <div>
  
    <Navebar />
      <Routes>
      <Route exact path='/' element={<Home/>}></Route>
      <Route exact path='/Login' element={<Login/>}></Route>
      <Route exact path='/Registration' element={<Registation/>}></Route>
       
      </Routes>
    </div>
  </Router>
  </DataState>



  );
}

export default App;
