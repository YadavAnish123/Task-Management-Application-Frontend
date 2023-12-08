import React, { useState, useContext } from 'react'
import "./Home.css"
import dataContext from '../context/dataContext'
import DataTable from './DataTable'
// const jwt = require('jsonwebtoken');
// const secretKey ='MusicApp@123';

const Home = () => {
  const context = useContext(dataContext)
  const { email, full_name, setFullName, setEmail, password, setPassword, showLoginForm, setShowLoginForm, showRegistration, setShowRegistration, formData, setFormData, errorMessage, setErrorMessage, reminder, setReminder, isLoggedIn, setIsLoggedIn, userId, setUserId, reminderId, setReminderId } = context
   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("setdata is calling")
    // Add your form submission logic here using 'formData'
    //  console.log(formData.status,formData.title,formData.description)
    var myHeaders = new Headers();
     console.log(localStorage.getItem('token'))
    myHeaders.append("Authorization",localStorage.getItem('token') );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "createdby": userId,
      "title": formData.title,
      "status": formData.status,
      "description": formData.description

    });
    
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:5000/api/v1/auth/set", requestOptions)
      .then(response => response.json())
      .then((result) => {
        if (result.status === true) {
          setReminder(result.message)
          console.log(formData.title+0)
          setFormData({  // Reset form data after editing

            "title": '',
            "status":'' ,
            "description":''
          });
        } else {
          setErrorMessage(result.message);
        }
      })
      .catch(error => console.log('error', error));
  }


  const handledi = () => {
    var myHeaders = new Headers();
    console.log(localStorage.getItem(localStorage.getItem('token')))
    myHeaders.append("Authorization", localStorage.getItem('token'));
    myHeaders.append("Content-Type", "application/json");

    var raw1 = JSON.stringify({
      "_id": reminderId,
      "title": formData.title,
      "status": formData.status,
      "description": formData.description
    });
    console.log(raw1)

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw1,
      redirect: 'follow'
    };

    fetch("http://localhost:5000/api/v1/auth/edit", requestOptions)
      .then(response => response.json())
      .then((result) => {
        if (result.status === true) {
          setReminder(result.data)
          setFormData({  // Reset form data after editing

            "title": '',
            "status":'' ,
            "description":''
          });

        } else {
          setErrorMessage(result.message);
          console.log(result.message)
        }
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div className="main">
      <div className="form-container">
        <h2>My Form</h2>
        {/* <form onSubmit={handleSubmit}> */}
        <div>
          <label>Title:</label>
          
          <input
            type="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="btn1">
                 <button  type="submit" onClick={handleSubmit}>Submit</button>
                 
        </div>
        <div className="btn2">
           <button type="submit1" onClick={handledi}>edit</button> 
        </div>
          
         
        {/* </form>   */}
      </div>
      <DataTable />
    </div>



  )
}

export default Home