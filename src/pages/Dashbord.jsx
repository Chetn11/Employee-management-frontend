import React, { useContext, useEffect, useState } from 'react'
import {AuthContext} from "../context/AuthContext";


function Dashbord() {

    const {providerState}=useContext(AuthContext);
    const[data,setData]=useState([]);
    const[page,setPage]=useState(1);
    const[limit,setLimit]=useState(5);
    const token=providerState.state.token;

    const fetchData= (page,limit)=>{
        let url=`https://defiant-jade-blackbuck.cyclic.app/employees?page=${page}&&limit=${limit}`;
        fetch(`${url}`,{
            method:"GET",
            headers:{
              'Authorization':`Bearer ${token}`
            }
          }).then((res)=>res.json()).then((res)=>setData(res.employee)).catch((err)=>console.log(err));

        
    }

    console.log(data)
    useEffect(()=>{
        fetchData(page,limit);
    },[page])

  return (
    <div>
      <h1>Employee Management Software</h1>
      <div>
        <button>Add Employee</button>
      </div>
      <table className='table'>
         <thead>
         <tr>
            <th>No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Department</th>
            <th>Action</th>
        </tr>
         </thead>
         <tbody>
         {data?.map((ele,index)=>(
            <tr key={ele._id}>
                <th>{index+1}</th>
                <th>{ele.first_name}</th>
                <th>{ele.last_name}</th>
                <th>{ele.email}</th>
                <th>{ele.salary}</th>
                <th>{ele.department}</th>
                <th><button>Edit</button> <button>Delete</button></th>
            </tr>
         ))}
         </tbody>
      </table>
     
    </div>
  )
}

export default Dashbord
