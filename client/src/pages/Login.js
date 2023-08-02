import React, { useEffect } from 'react'
import {Button, Form} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'


import "./style.css"
import { signin, signup } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const {errors: err, isAuth ,userList} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {console.log(data);
        dispatch(signin(data))
}
  console.log("errors", errors);
  console.log("err",err);
useEffect(() => {
    if(isAuth) navigate('/')
}, [isAuth])

  return (
    <Form className="form" onSubmit={handleSubmit(onSubmit)}>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"
        {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
        />
        <p className='error'>{errors.email && " email is not valid "}</p>
        <p className='error'>{err && "email does not exit, please try to register" }</p>
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
        login
      </Button>
    </Form>
  )
}

export default Login