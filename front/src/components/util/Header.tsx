//redux
import React from "react";
import { useSelector } from "react-redux";

import UtilStyle from "./Util.module.css";


const Header = () => {

  return (
    <div className={`${UtilStyle.header_total}`}>
      <div className={`${UtilStyle.header_logo}`}><img src={process.env.PUBLIC_URL + `/img/logo.png`} alt="HDIL" /></div>
      <div className={`${UtilStyle.etcMenu}`}>
        <div>내 옷장</div>
        <div>마이페이지</div>
      </div>
    </div>
  );
};

export default Header;




