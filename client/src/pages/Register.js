import React, { useEffect } from 'react'
import {Button, Form} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'


import "./style.css"
import { signup } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  
    const {errors: err, isAuth } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {console.log(data);
        dispatch(signup(data))
}
  console.log("errors", errors);
  console.log("err",err);
useEffect(() => {
    if(isAuth) navigate('/')
}, [isAuth])

  return (
    <Form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" 
          {...register("name", {required: true})}
        />
         <p className='error'>{errors.name && "this field if required "}</p>

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"
        {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
        />
        <p className='error'>{errors.email && " email is not valid "}</p>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
        <p className='error'>{err && "email exit, please try to login" }</p>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"
        {...register("password", {required: true})}
        />
         <p className='error'>{errors.password && " password error "}</p>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default Register