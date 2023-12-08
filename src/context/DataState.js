import React from 'react'
import dataContext from "./dataContext";
import { useState } from "react";
//import PropTypes from 'prop-types'

const DataState=(props)=> {
  const [email, setEmail] = useState("");
  const[reminderId,setReminderId]=useState("")
  const[userId,setUserId]=useState("")
  const [password, setPassword] = useState("");
  const [full_name, setFullName] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const[reminder,setReminder]=useState();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);
  console.log('isLoggedIn:',localStorage.getItem('token') ); 
  const [formData, setFormData] = useState({
    //createdby:'',
    title: '',
    status: '',
    description: '',
    
  });
// const [isLoggedIn, setLoggedIn] = useState(false);
// const login = () => setLoggedIn(true);
// const logout = () => setLoggedIn(false);
  return (
      <dataContext.Provider value={{email, full_name,setFullName,setEmail,password, setPassword,showLoginForm, setShowLoginForm,showRegistration, setShowRegistration,formData, setFormData,errorMessage, setErrorMessage,reminder,setReminder,isLoggedIn, setIsLoggedIn,userId,setUserId,reminderId,setReminderId}}>
      {props.children}
    </dataContext.Provider>
     
  )
}
 

export default  DataState