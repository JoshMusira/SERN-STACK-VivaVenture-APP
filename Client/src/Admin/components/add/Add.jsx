import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../../context/userContext/Context";
import './add.css';
import { FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiDomain } from '../../../utils/utilsDomain'

const Add = ({ setOpen }) => {
  const { user } = useContext(Context);
  const [success, setSuccess] = useState(false);

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
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/,
        'Invalid email address'
      ),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long')
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]+$/,
        'Password must contain at least one letter, one digit, and one special character'
      )
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // const { errors } = formState;
  const saveDataToDatabase = (formData) => {
    const data = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role
    };
    axios
      .post(`${apiDomain}/auth/register`, data)
      .then((response) => {
        if (response.data.success) {
          toast.success("Registration Successful", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setSuccess(true);
        } else {
          toast.success("User created successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("User already exists", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });


  };

  const onSubmit = (formData) => {
    saveDataToDatabase(formData);
  };
  // Reset success state and form after successful creation
  if (success) {
    setTimeout(() => {
      setSuccess(false);
      handleSubmit(onSubmit)();
    }, 3000);
  }

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          <FaTimes />
        </span>
        <h2>Add new User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="allItems">
            <label className="label" htmlFor="username">Username</label>
            <p className='error'>{errors.username?.message}</p>
            <input type='text' {...register("username")} placeholder="Enter username..." required />
            <label htmlFor="email">Email</label>
            <p className='error'>{errors.email?.message}</p>
            <input type='email'  {...register("email")} placeholder="Enter Email..." required />
            <label htmlFor="password">Password</label>
            <p className='error'>{errors.password?.message}</p>
            <input type='password' {...register("password")} placeholder="Enter Password..." required />
            <label htmlFor="role">Select Role</label>
            <p className='error'>{errors.role?.message}</p>
            <select className="rolename" {...register("role")} required>
              <option value="">Select one</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <button type="submit">Send</button>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </form>
      </div>
    </div>
  );
};

export default Add;
