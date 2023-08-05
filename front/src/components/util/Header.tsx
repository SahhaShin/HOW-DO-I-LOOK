//redux
import React from "react";

import UtilStyle from "./Util.module.css";

import { getCookie, setCookie } from "../hook/Cookie";

//redux
import { useSelector, useDispatch } from "react-redux";
import { action } from "../../store/UserSlice";

const Header = () => {
  const id = useSelector((state) => state.id);
  const nickname = useSelector((state) => state.nickname);
  let dispatch = useDispatch();

  if(typeof id == undefined){
    //만약 id가 없다면 회원정보 불러오기 
  }

  const logout = () => {
    console.log("div clicked")
        dispatch(
          action.Logout('1')
        )
  }

  return (
    <div>
      {/* 로고 */}
      <div>
        <img src={"이미지소스"} alt="로고" />
      </div>
      {/* 로그인 상태라면 */}
      <div>
        <a href="#마이페이지">환영합니다. {nickname}님</a>
        <img src={"프로필사진"} alt="프로필 사진" />
        <div 
          onClick={(e) => {logout(e);}}
        >로그아웃</div>
      </div>
      {/* 로그아웃 상태라면 */}
      <div>
        <a href={process.env.REACT_APP_FRONT + `/user/log-in`}>로그인</a>
      </div>
    </div>
  );
};

export default Header;




