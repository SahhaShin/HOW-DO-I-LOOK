import React, { useEffect, useState } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { action } from "../../store/UserSlice";

import { getCookie } from "../../hook/Cookie";
import { getUserInfo, CheckToken } from "../../hook/UserApi";

import Header from "../../components/util/Header";

// import { isVisible } from "@testing-library/user-event/dist/types/utils";

const Home: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("페이지 로드");

    //회원정보 가져오기
    const sEmail = getCookie("new_social_user_email");
    const bEmail = getCookie("new_basic_user_email");
    if (typeof sEmail != "undefined") {
      console.log("sEmail");
      dispatch(action.GetUserInfo(sEmail));
    } else if (typeof bEmail != "undefined") {
      console.log("bEmail");
      dispatch(action.GetUserInfo(bEmail));
    } else {
      //window.location.href = `${process.env.REACT_APP_FRONT}/user/log-in`;
    }
  }, []);

  const tokenTest = () => {
    console.log("button clicked");
    CheckToken().then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <Header></Header>

      <h1>홈</h1>
      <div>
        <button onClick={tokenTest}>토큰 테스트 </button>
      </div>
    </div>
  );
};

export default Home;
