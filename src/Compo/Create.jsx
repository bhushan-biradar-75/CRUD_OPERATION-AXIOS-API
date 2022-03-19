import React, { useState } from 'react'
import axios from 'axios';


const Create = () => {
    const [state,setstate] = useState({
      fname: "",
      lname:"",
      email:""
    })

    const posts = () => {
        axios.post(`https://6206272f92dd6600171c0867.mockapi.io/crud-operation`,state).then(data => {
            setstate(data['data'])
        }).catch(err => {
            console.log(err)
        }) 
    }
    console.log(state)

    const handlechange = (e) => {
        setstate({...state,[e.target.name]:e.target.value})
    }

  return (
    <div>
        <div class="container-fluid">
            <label><b>NAME</b></label>
            <input className='form-control mt-4'  name='fname' onChange={handlechange} type="text" placeholder='enter your name' minLength={6} required/>
            <br/>
            <label><b>LAST NAME</b></label>
            <input className='form-control mt-4' name='lname' onChange={handlechange} type="text" placeholder='enter your last name' minLength={6} required/>
            <br/>
            <label><b>EMAIL</b></label>
            <input className='form-control mt-4' name='email' onChange={handlechange} type="email" placeholder='enter your email' required />
            <br/>   
            <button onClick={posts} className='btn-dark' type="submit">SUBMIT</button>
        </div>
    </div>
  )
}

export default Create