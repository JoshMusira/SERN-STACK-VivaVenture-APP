
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Context } from "../../../context/userContext/Context";
import './add.css';
import { FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiDomain } from '../../../utils/utilsDomain';

const Add = ({ setOpen }) => {
  const { user } = useContext(Context);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [success, setSuccess] = useState(false);
  const [data, setUserData] = useState([]);
  const id = JSON.parse(localStorage.getItem('id'))

  useEffect(() => {
    const handleUpdate = async () => {
      try {
        const response = await axios.get(`${apiDomain}/user/${id}`, {
          headers: {
            Authorization: `${user.token}`,
          },
        });

        setUserData(response.data);
        setUsername(response.data[0]?.username);
        setEmail(response.data[0]?.email);
        setPassword(response.data[0]?.password);
        setRole(response.data[0]?.role);
      } catch (error) {
        console.log(error);
        console.error('Error fetching user data:', error);
      }
    };

    handleUpdate();
  }, [id, user.token, success]);

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

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const saveDataToDatabase = (formData) => {
    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role
    };

    const requestOptions = {
      headers: {
        Authorization: `${user.token}`,
      },
    };

    if (id) {
      // Update operation
      axios.put(`${apiDomain}/user/${id}`, userData, requestOptions)
        .then((response) => {
          toast.success("User updated successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setSuccess(true);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error updating user", {
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
    } else {
      // Create operation
      axios.post(`${apiDomain}/auth/register`, userData, requestOptions)
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
    }
  };

  const onSubmit = (formData) => {
    saveDataToDatabase(formData);
  };

  // Reset success state and form after successful creation/update
  useEffect(() => {
    if (success) {
      // reset();
      setOpen(false);
    }
  }, [success, setOpen]);

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          <FaTimes />
        </span>
        <h2>{id ? 'Edit User' : 'Add New User'}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="allItems">
            <label className="label" htmlFor="username">Username</label>
            <p className='error'>{errors.username?.message}</p>
            <input type='text' {...register("username")} value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username..." required />
            <label htmlFor="email">Email</label>
            <p className='error'>{errors.email?.message}</p>
            <input type='email' {...register("email")} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email..." required />
            <label htmlFor="password">Password</label>
            <p className='error'>{errors.password?.message}</p>
            <input type='password' {...register("password")} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password..." required />
            <label htmlFor="role">Select Role</label>
            <p className='error'>{errors.role?.message}</p>
            <select className="rolename" onChange={(e) => setRole(e.target.value)} value={role} {...register("role")} required>
              <option value="">Select one</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <button type="submit">{id ? 'Update' : 'Send'}</button>
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
