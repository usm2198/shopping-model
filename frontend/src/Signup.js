import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
// import Validation from './SignupValidation';
import axios from 'axios'

function Signup() {

    const navigate = useNavigate()
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(values,"val");
            axios.post('http://localhost:5000/api/user', values)
                .then(({data}) => {
                    if(data){
                        console.log(data);
                        alert("Register User Sucessfully...!!!")
                        navigate('/login');
                    }
                })
                .catch(err => console.log(err));
    //    setErrors(Validation(values));
       
    }
    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-Up</h2>
                <form onSubmit={(event)=>{handleSubmit(event)}}>
                    <div className='mb-3'>
                        <label htmlFor='name'><strong>Name</strong></label>
                        <input type='text' placeholder='Enter Name' name='name' required onChange={(e)=>{setValues({...values,name:e.target.value})}} className='form-control rounded-0' />
                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type='email' placeholder='Enter Email' name='email' required onChange={(e)=>{setValues({...values,email:e.target.value})}} className='form-control rounded-0' />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type='password' placeholder='Enter Password' pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" name='password' onChange={(e)=>{setValues({...values,password:e.target.value})}} className='form-control rounded-0' />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <input type='submit' className='btn btn-success w-100 rounded-0' value={'Sign up'} />
                    <p>You are agree to our terms and conditions</p>
                    <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
                </form>
            </div>
        </div>
    )
}

export default Signup