import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import './style.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Page2() {
  const userId = localStorage.getItem("userid");

  const [userName,setUserName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");

  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();
 
  //get User
  const getUser = async() => {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
    if (response.status === 200){
      setUserName(response.data.userdetails.userName);
      setEmail(response.data.userdetails.email);
      setPhone(response.data.userdetails.phone);
    }
  } 

  useEffect(()=>{
    if(userId !== null){
      getUser();
    }
    // eslint-disable-next-line  
  }, []);

  
  //add user
  const addUser = async(event) => {
    event.preventDefault();
    setLoading(true);
    const requestData = {userName,email,phone};
    axios.post(`${API_BASE_URL}/adduser`, requestData)
    .then((result)=>{
      if(result.status === 201){
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "User Added Successfully!"
        })
      }
      setUserName('');
      setEmail('');
      setPhone('');
    })
    .catch((error)=>{
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Some error occured please try again later!"
      })
    })
  };

   //edit user
   const editUser = async() => {
    const request = { userName, email, phone };
    if( !userName || !email || !phone){
      Swal.fire({
        icon: 'error',
        title: 'one or more mandatory fields are empty!'
      })
    }
    const response = await axios.put(`${API_BASE_URL}/edituser/${userId}`, request);
    if(response.status === 200){
      Swal.fire({
        icon: "success",
        title: "User Updated Successfully!"
      })
    }
 }

 function gotohome(){
   navigate('/');
 }
 
    
  return (
    <div className='container shadow formcontainer p-4'>
       <button className='btn btn-primary' onClick={gotohome}>Home</button>
       {/*spinner is loading if loading is true*/}  
       { loading ? <div className='col-md-12 mt-3 text-center'>
              <div class="spinner-border text-primary" role="status">
                 <span class="visually-hidden">Loading...</span>
              </div>
        </div> : '' } 

       {userId !== null ?   
        <h2 className='text-center py-2'>UPDATE USER</h2>
       : <h2 className='text-center py-2'>CREATE USER</h2>}
         
          <form className='mx-2'>  
            <div className="mb-3">
                <label className="form-label text-muted fs-5">User Name</label>
                <input value={userName} onChange={(ev)=>setUserName(ev.target.value)} type="text" className="form-control" required/>
            </div>
            <div className="mb-3">
                <label className="form-label text-muted fs-5">Email</label>
                <input value={email} onChange={(ev)=>setEmail(ev.target.value)} type="text" className="form-control" required/>
            </div>
            <div className="mb-3">
                <label className="form-label text-muted fs-5">Phone</label>
                <input value={phone} onChange={(ev)=>setPhone(ev.target.value)} type="text" className="form-control" required/>
            </div>
            <div className="d-grid">
               {userId !== null ?   
                <button type="button" className="btn btn-primary fs-5" onClick={(e)=>editUser(e)}>Update</button>
              : <button type="button" className="btn btn-primary fs-5" onClick={(e)=>addUser(e)}>Create</button>}
            </div>
          </form>
          
    </div>
  )
}

export default Page2;