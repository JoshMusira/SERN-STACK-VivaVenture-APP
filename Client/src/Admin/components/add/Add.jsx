import { useContext } from "react";
import axios from "axios";
import { Context } from "../../../context/userContext/Context";
import './add.css'
import { FaTimes } from 'react-icons/fa'
const Add = ({ setOpen }) => {
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setOpen(false);
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          <FaTimes />
        </span>
        <h1>Add new User</h1>
        <form onSubmit={handleSubmit}>
          <div className="allItems">
            <label className="label" htmlFor="">Username</label>
            <input type='text' placeholder="Enter username..." />
            <label htmlFor="">Email</label>
            <input type='text' placeholder="Enter Email..." />
            <label htmlFor="">Password</label>
            <input type='text' placeholder="Enter Password..." />
            <label htmlFor="">Select Role</label>
            <select className="rolename">
              <option value="">Select one</option>
              <option value="">Admin</option>
              <option value="">User</option>
            </select>
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
