import React from "react"
import "./login.css"
import back from "../../assets/my-account.jpg"

const Login = () => {

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

          <form >
            <span>Username or Email address</span>
            <input type='text' required />
            <span>Password * </span>
            <input type='password' required />
            <button className='button'>Login </button>
          </form>
        </div>
      </section>
    </>
  )
}
export default Login