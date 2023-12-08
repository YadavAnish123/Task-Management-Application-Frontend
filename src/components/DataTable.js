import React, { useContext } from 'react';
import './DataTable.css'
import dataContext from '../context/dataContext'

const DataTable = () => {
  //let remind_id = [];
  const context = useContext(dataContext)
  const { email, full_name, setFullName, setEmail, password, setPassword, showRegistration, setShowRegistration, formData, setFormData, isLoggedIn, setIsLoggedIn, reminder, setReminder, reminderId, setReminderId,userId } = context
  const data = reminder
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handelfilter = () => {
    var myHeaders = new Headers();
     myHeaders.append("Authorization", localStorage.getItem('token'));

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`http://localhost:5000/api/v1/auth/getremfilter/${userId}/${formData.status}`, requestOptions)
    .then(response => response.json())
    .then((result) => {
      if (result.status === true) {
        setReminder(result.message)
        // setUserId(result.data._id)
        //console.log(result)
        //navigate('/');
      } else {
        //setErrorMessage(result.message);
      }
    })
    .catch(error => console.log('error', error));
  }

  const handeleditclick = (_id) => {
    var myHeaders = new Headers();
    localStorage.getItem('token')
    myHeaders.append("Authorization", localStorage.getItem('token'));

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`http://localhost:5000/api/v1/auth/getParticularReminder/${_id}`, requestOptions)
      .then(response => response.json())
      .then(result => setFormData(result.message))
      .catch(error => console.log('error', error));

    setReminderId(_id)
  }

  const handeldeleteclick = (_id) => {
    var myHeaders = new Headers();
    console.log(localStorage.getItem('token'))
    myHeaders.append("Authorization", localStorage.getItem('token'));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "_id": _id
    });

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:5000/api/v1/auth/deleterem", requestOptions)
      .then(response => response.json())
      .then((result) => {
        if (result.status === true) {
          setReminder(result.message)
          // setUserId(result.data._id)
          //console.log(result)
          //navigate('/');
        } else {
          //setErrorMessage(result.message);
        }
      })
      .catch(error => console.log('error', error));
  }



  console.log(Array.isArray(data), 1);
  return (
    <div>

      <table>
        <thead>
          <tr>
            <th>Title</th>

            <th>Description</th>
            <th>Status</th>
            <th>
              <div className='filt'>
                <label>Filter:</label>

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
            </th>
            <button className="filter" onClick={handelfilter}>🔍</button>

          </tr>
        </thead>
        <tbody>
          {/* {data.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.subject}</td>
              <td>{item.description}</td>
              <td>{item.email}</td>
              <td>{item.contact}</td>
              <td>{item.sms}</td>
              <td>{item.recurfornext}</td>
              <button className="edit" >Edit</button>
              <button className="delete">Delete</button>
            </tr>
          ))} */}

          {
            Array.isArray(data) && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.status}</td>
                  <td>
                    <button className="edit" onClick={() => handeleditclick(item._id)}>Edit</button>
                  </td>
                  <td>
                    <button className="delete" onClick={() => handeldeleteclick(item._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <p>List is empty</p>
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
