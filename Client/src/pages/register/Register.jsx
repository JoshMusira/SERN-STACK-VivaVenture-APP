// import React from "react"
// import "../login/login.css"
// import back from "../../assets/my-account.jpg"
// // import { Link } from "react-router-dom"
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import Axios from 'axios';
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useNavigate } from "react-router-dom";
// // import { useState } from "react";
// const Register = () => {
//   const navigate = useNavigate();
//   const schema = yup.object().shape({
//     username: yup
//       .string()
//       .required('Username is required')
//       .min(3, 'Username must be at least 3 characters long')
//       .max(20, 'Username must not exceed 20 characters')
//       .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain alphanumeric characters and underscores'),
//     email: yup
//       .string()
//       .required('Email is required')
//       .email('Invalid email address')
//       .matches(
//         /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/,
//         'Invalid email address'
//       ),
//     password: yup
//       .string()
//       .required('Password is required')
//       .min(6, 'Password must be at least 6 characters long')
//       .matches(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
//         'Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'
//       ),
//     confirmPassword: yup
//       .string()
//       .oneOf([yup.ref("password"), null], "Passwords must match"),
//   });

//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const saveDataToDatabase = (imageUrl) => {
//     const formData = new FormData(document.querySelector("form")); // Access the form data
//     const data = {
//       username: formData.get("username"),
//       email: formData.get("email"),
//       password: formData.get("password"),
//       image_Url: imageUrl
//     };
//     console.log(data)

//     Axios.post("http://localhost:8081/auth/register", data)
//       .then((response) => {
//         response.data.message && alert(response.data.message);
//         navigate("/login");
//       })
//       .catch(({ response }) => {
//         alert(response.data.error);
//       });
//   };

//   const onSubmit = (formData) => {
//     console.log(formData);
//     uploadImage();
//   };


//   return (
//     <>
//       <section className='login'>
//         <div className='container'>
//           <div className='backImg'>
//             <img src={back} alt='' />
//             <div className='text'>
//               <h3>Register</h3>
//               <h1>My ACcount</h1>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} >
//             <span>Email address</span>
//             <p className='error'>{errors.email?.message}</p>
//             <input {...register("email")} type='text' placeholder="Enter your email..." required />
//             <span>Username * </span>
//             <p className='error'>{errors.username?.message}</p>
//             <input {...register("username")} type='text' placeholder="Enter your username..." required />
//             <span>Password * </span>
//             <p className='error'>{errors.password?.message}</p>
//             <input  {...register("password")} type='text' placeholder="Enter your password..." required />
//             <span>Confirm Password * </span>
//             <p>{errors.confirmPassword?.message}</p>
//             <input placeholder="Confirm Password..." {...register("confirmPassword")} type='text' required />
//             <input type="submit" value="Register" className="button" />

//           </form>
//         </div>
//       </section>
//     </>
//   )
// }

// export default Register

import React from "react";
import "../login/login.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import back from "../../assets/my-account.jpg"

const Register = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters long')
      .max(20, 'Username must not exceed 20 characters')
      .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain alphanumeric characters and underscores'),
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email address')
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,63}$/,
        'Invalid email address'
      ),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long')
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]+$/,
        'Password must contain at least one letter, one digit, and one special character'
      ),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const saveDataToDatabase = (formData) => {
    const data = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };
    console.log(data);
    Axios.post("http://localhost:8081/auth/register", data)
      .then((response) => {
        response.data.message && alert(response.data.message);
        navigate("/login");
      })
      .catch(({ response }) => {
        alert(response.data.error);
      });
  };

  const onSubmit = (formData) => {
    console.log(formData);
    saveDataToDatabase(formData);
  };

  return (
    <>
      <section className='login'>
        <div className='container'>
          <div className='backImg'>
            <img src={back} alt='' />
            <div className='text'>
              <h3>Register</h3>
              <h1>My ACcount</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <span>Email address</span>
            <p className='error'>{errors.email?.message}</p>
            <input {...register("email")} type='text' placeholder="Enter your email..." required />

            <span>Username * </span>
            <p className='error'>{errors.username?.message}</p>
            <input {...register("username")} type='text' placeholder="Enter your username..." required />

            <span>Password * </span>
            <p className='error'>{errors.password?.message}</p>
            <input {...register("password")} type='password' placeholder="Enter your password..." required />

            <span>Confirm Password * </span>
            <p>{errors.confirmPassword?.message}</p>
            <input placeholder="Confirm Password..." {...register("confirmPassword")} type='password' required />

            <input type="submit" value="Register" className="button" />
          </form>
        </div>

      </section>
    </>
  );
};

export default Register;

