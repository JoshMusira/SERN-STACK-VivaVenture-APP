import React from "react";
import "./login.css";
import back from "../../assets/my-account.jpg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/userContext/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    Axios.post("http://localhost:8081/auth/login", data)
      .then(({ data }) => {
        if (data.token) {
          dispatch({ type: "LOGIN_SUCCESS", payload: data });

          if (data.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }
      })
      .catch(({ response }) => {
        toast.error(response.data.error); // Display toast notification with the error message
      });
  };

  return (
    <>
      <ToastContainer /> {/* Add the ToastContainer component */}
      <section className="login">
        <div className="login-container">
          <div className="backImg">
            <img src={back} alt="" />
            <div className="text">
              <h3>Login</h3>
              <h1>My Account</h1>
            </div>
          </div>

          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <span>Username</span>
            <p className="error">{errors.username?.message}</p>
            <input
              type="text"
              {...register("username")}
              className="loginInput"
              placeholder="Enter your Username ..."
              required
            />
            <span>Password *</span>
            <p className="error">{errors.password?.message}</p>
            <input
              {...register("password")}
              className="loginInput"
              type="password"
              placeholder="Enter your password ..."
              required
            />
            <input type="submit" value="Login" className="buttonl" />
            <p className="morelogin">
              Have no account?<Link to='/register'><b> Register </b></Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
