import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

function Page3() {
   const [user, setUser] = useState([]);
   const navigate = useNavigate();
   const userId = localStorage.getItem("userid");

  //get User
  const getUser = async() => {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
    if (response.status === 200){
      setUser(response.data.userdetails);
    }
  } 

  useEffect(()=>{
    getUser();
    // eslint-disable-next-line 
  }, []);

  function gotohome(){
    navigate('/');
  }

  return (
    <div className='container p-4'>
        <button className='btn btn-primary' onClick={gotohome}>Home</button>
        <h2 className="text-center py-2">User Details</h2>
      <table className="table">
        <thead>
          <tr className="fs-5">
            <th scope="col">User Id</th>
            <th scope="col">User Name</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td>{user._id}</td>
                <td>{user.userName}</td> 
                <td>{user.email}</td>
                <td>{user.phone}</td>
            </tr>
        </tbody>

      </table>
    </div>
  )
}

export default Page3;