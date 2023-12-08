import React,{useContext}from 'react';
import "./Navebar.css"
import Login from './Login';
import dataContext from '../context/dataContext'
import Registation from './Registation';


const Navebar = () => {
  const handleLoginClick = () => {
    setShowLoginForm(true);
  }
  const handleRegistrationClick = () => {
    setShowRegistration(true);
  }
  const context = useContext(dataContext)
   const {email, full_name,setFullName,setEmail,password, setPassword,showLoginForm, setShowLoginForm,showRegistration, setShowRegistration} = context
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h1>Task-Management-Application</h1>
      </div>
      <div className="navbar-right">
        <a className="navbar-button"   href="/">Home</a>
         <a className="navbar-button" onClick={handleRegistrationClick} href="Registration">Registration</a>
        <a className="navbar-button" onClick={handleLoginClick} href="Login">Login</a>
      </div>
      {showLoginForm && <Login/>}
      {showRegistration&& <Registation/>}
    </div>
  );
}

export default Navebar;
