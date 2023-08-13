import React, { useEffect, useState } from "react";

//css
import homeStyle from "./Home.module.css";
import styled from 'styled-components';

//redux
import { useSelector, useDispatch } from "react-redux";
import { action_user } from "../../store/UserSlice";

import { getCookie } from "../../hook/Cookie";
import { getUserInfo, CheckToken } from "../../hook/UserApi";

import Header from "../../components/util/Header";
import About from "./About"; // About 컴포넌트를 임포트

// import { isVisible } from "@testing-library/user-event/dist/types/utils";

const Home: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("페이지 로드");

    //회원정보 가져오기
    const sEmail = getCookie("new_social_user_email");
    const bEmail = getCookie("new_basic_user_email");
    if (!((typeof sEmail == "undefined") || (typeof sEmail === null))) {
      console.log("sEmail");
      dispatch(action_user.GetUserInfo(sEmail));
    } else if (!((typeof bEmail == "undefined") || (typeof bEmail === null))) {
      console.log("bEmail");
      dispatch(action_user.GetUserInfo(bEmail));
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
      <About /> {/* About 컴포넌트 추가 */}
    </div>
  );
};

export default Home;
