import React, { useState } from "react";

import UtilStyle from "./Util.module.css";


const Footer = () => {
  return (
    <div className={`${UtilStyle.footer}`}>
      <div className={`${UtilStyle.logos}`}>
        <img className={`${UtilStyle.butterfly}`} src={process.env.PUBLIC_URL + `/img/logo2.png`} alt="HDIL" />
        <img className={`${UtilStyle.logo}`} src={process.env.PUBLIC_URL + `/img/logo.png`} alt="HDIL" />
      </div>
      <div className={`${UtilStyle.name}`}>신산하 | 김은서 | 박세윤 | 손정민 | 정형준 | 유태영</div>
    <div>
      <div><img src="#" alt="로고" /></div>
      <div>How do I look</div>
    </div>
  );
};

export default Footer;
