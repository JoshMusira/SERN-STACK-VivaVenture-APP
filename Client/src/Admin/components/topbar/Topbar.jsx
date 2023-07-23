import React from "react";
import "./topbar.css";
import { IoMdNotifications } from 'react-icons/io'
import { AiTwotoneSetting } from 'react-icons/ai'
import AdminUser from "../../../components/profile/AdminUser";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">

        <div className="topRight">
          <div className="topbarIconContainer">
            <IoMdNotifications />
            <span className="topIconBadge">4</span>
          </div>

          <div className="topbarIconContainer">
            <AiTwotoneSetting />
          </div>
          <div className="topbarIconContainer">

            <AdminUser />
          </div>
        </div>
      </div>
    </div>
  );
}
