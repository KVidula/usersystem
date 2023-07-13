import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

function Page1() {
  const [allusers, setAllusers] = useState([]);

  const navigate = useNavigate();

  function addbtn(){
    localStorage.removeItem("userid");
    navigate('/page2');
  }

  const editUser = (id) =>{
    localStorage.setItem("userid",id);
    navigate('/page2');
  }

  const viewUser = (id) => {
    localStorage.setItem("userid",id);
    navigate('/page3');
  }  
   
   //get all Users
  const getAllUsers = async() => {
    const response = await axios.get(`${API_BASE_URL}/allusers`);
    if (response.status === 200){
      setAllusers(response.data.users);
    }
  } 

  useEffect(()=>{
    getAllUsers();
  }, []);

   //delete user
   const deleteUser = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/deleteuser/${id}`);
    if(response.status === 200){
      getAllUsers();
    }
   }


  return (
    <div className='container p-4 listcontainer'>
        <button className='btn btn-primary' onClick={addbtn}>Add User</button>
        <h2 className="text-center py-2">List of Users</h2>
      <table className="table">
        <thead>
          <tr className="fs-5">
            <th scope="col">#</th>
            <th scope="col">User Id</th>
            <th scope="col">User Name</th>
            <th>#</th>
            <th>#</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {allusers.map((currElem,index)=>{
          return(
            <tr>
                <td>{index + 1}</td>
                <td>{currElem._id}</td>
                <td>{currElem.userName}</td> 
                <td><button onClick={()=>viewUser(currElem._id)} className='btn btn-primary'>View</button></td>
                <td><button onClick={()=>editUser(currElem._id)} className='btn btn-primary'>Edit</button></td>
                <td><button onClick={()=>deleteUser(currElem._id)} className='btn btn-primary'>Delete</button></td> 
            </tr>
           )
          })
        } 
        </tbody>

      </table>
    </div>  
  )
}

export default Page1;