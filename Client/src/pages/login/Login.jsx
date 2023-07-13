import React from "react"
import "./login.css"
import back from "../../assets/my-account.jpg"
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../../context/userContext/Context'

const Login = () => {
  const { dispatch } = useContext(Context);
  // console.log(user);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required")
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    Axios.post("http://localhost:8081/auth/login", data)
      .then(({ data }) => {
        if (data.token) {
          dispatch({ type: "LOGIN_SUCCESS", payload: data });

          if (data.role === "admin") {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }
      })
      .catch(({ response }) => {
        alert(response.data.error);
      });
  }

  return (
    <>
      <section className='login'>
        <div className='container'>
          <div className='backImg'>
            <img src={back} alt='' />
            <div className='text'>
              <h3>Login</h3>
              <h1>My ACcount</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} >
            <span>Username</span>
            <p className='error'>{errors.username?.message}</p>
            <input type='text'  {...register("username")} className='loginInput' placeholder='Enter your Username ...' required />
            <span>Password * </span>
            <p className='error'>{errors.password?.message}</p>
            <input {...register("password")} className='loginInput' type="password" placeholder='Enter your password ...' required />
            <input type="submit" value="Login" className="button" />

          </form>
        </div>
      </section>
    </>
  )
}
export default Login