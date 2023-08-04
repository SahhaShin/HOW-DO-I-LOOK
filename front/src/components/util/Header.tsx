//redux
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import UtilStyle from "./Util.module.css";


const Header = () => {

  const navigate = useNavigate();

  return (
    <div className={`${UtilStyle.header_total}`}>
      <div onClick={()=>{navigate(`/`)}} className={`${UtilStyle.header_logo}`}><img src={process.env.PUBLIC_URL + `/img/logo.png`} alt="HDIL" /></div>
      <div className={`${UtilStyle.etcMenu}`}>
        <div onClick={()=>{navigate(`/closet`)}}>내 옷장</div>
        <div onClick={()=>{navigate(`/mypage`)}}>마이페이지</div>
      </div>
    </div>
  );
};

export default Header;




