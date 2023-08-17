import React, { useState } from "react";

import UtilStyle from "./Util.module.css";


const Footer = () => {
  return (
    <div className={`${UtilStyle.footer}`}>
      <div className={`${UtilStyle.logos}`}>
        <img className={`${UtilStyle.butterfly}`} src={process.env.PUBLIC_URL + `/img/BR.png`} alt="HDIL" />
        {/* <img className={`${UtilStyle.butterfly}`} src={process.env.PUBLIC_URL + `/img/badge/Modern_colored.png`} alt="HDIL" />
        <img className={`${UtilStyle.butterfly}`} src={process.env.PUBLIC_URL + `/img/badge/Natural_colored.png`} alt="HDIL" />
        <img className={`${UtilStyle.butterfly}`} src={process.env.PUBLIC_URL + `/img/badge/Sexy_colored.png`} alt="HDIL" />
         */}
        
      </div>
      {/* <img className={`${UtilStyle.logo}`} src={process.env.PUBLIC_URL + `/img/LOGO.png`} alt="HDIL" /> */}
      <div className={`${UtilStyle.name}`}>신산하 | 김은서 | 박세윤 | 손정민 | 정형준 | 유태영</div>
    </div>
  );
};

export default Footer;
