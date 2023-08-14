import React, { useEffect, useState } from "react";
import styles from "./Home.module.css"; // 스타일 파일을 불러옵니다.
import Gallery from "./Gallery";
import Gallery2 from "./Gallery2";

//redux
import { useSelector, useDispatch } from "react-redux";
import { action_user } from "../../store/UserSlice";

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

      {/* <h1>홈</h1>
      <div>
        <button onClick={tokenTest}>토큰 테스트 </button>
      </div> */}
      <Gallery />
      <Gallery2 />
    </div>
  );
};

export default Home;
