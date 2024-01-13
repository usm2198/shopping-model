import React, { useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'
// import Validation from './LoginValidation'
import axios from 'axios'

function Login(){
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
     const navigate = useNavigate();
    const [errors] = useState({})
    // const handleInput =(event) =>{
    //     setValues(prev => ({...prev, [event.target.name] : [event.target.value]}))

    // }
    const handleSubmit =(event) =>{
        event.preventDefault();
        // setErrors(Validation(values));
        axios.post('http://localhost:5000/api/user/login', values)
                .then(({data}) => {
                    if(data){
                        console.log(data);
                        alert("Logged In User Sucessfully...!!!")
                        localStorage.setItem('token',data.data.token)
                        navigate('/');
                    }
                })
                .catch(err => console.log(err));
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
            <h2>Sign-In</h2>
                <form  onSubmit={(e)=>{handleSubmit(e)}}>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type='email' placeholder='Enter Email' name='email' required onChange={(e)=>{setValues({...values,email:e.target.value})}} className='form-control rounded-0'/>
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type='password' placeholder='Enter Password' name='password' pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" onChange={(e)=>{setValues({...values,password:e.target.value})}} className='form-control rounded-0'/>
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
                    <p>You are agree to our terms and conditions</p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login