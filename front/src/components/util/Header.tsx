//redux
import React from "react";
import { useSelector } from "react-redux";

import UtilStyle from "./Util.module.css";


const Header = () => {
  const nickname = useSelector((state) => state.nickname);

  return (
    <div>
      <img src={"이미지소스"} alt="로고" />
      <div>
        <a href="#">환영합니다. {nickname}님</a>
        {/* 다른 JSX 요소들 */}
      </div>
    </div>
  );
};

export default Header;




