import React, { useState , useRef} from 'react';
import loginStyle from './login.module.css';

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {login} from "../../../store/UserSlice";

const Login: React.FC = () => {

  

  const openNewWindowAndWait = () => {
    const url = "http://localhost:8081/login/oauth2/code/kakao"; // 원하는 URL로 대체하세요.
    const childPopup = window.open(url, "_blank");
  
    // 부모 창에서 메시지를 보내고, 팝업 창으로부터 응답을 받는 함수
    const sendMessageAndWaitForResponse = () => {
      // 메시지를 팝업 창으로 보냅니다.
      childPopup.postMessage("Hello from parent window!", url);
  
      // 응답을 받을 때까지 기다립니다.
      const onMessageReceived = (event) => {
        if (event.origin === url && event.source === childPopup) {
          console.log("Received response from child window:", event.data);
          // 새 창의 로드가 완료되었으므로 원하는 동작을 수행합니다.
          console.log("childe popup : " + childPopup)
  
          // 이벤트 리스너를 제거합니다.
          window.removeEventListener("message", onMessageReceived);
        }
      };
  
      // 메시지를 받을 때까지 이벤트 리스너를 등록합니다.
      window.addEventListener("message", onMessageReceived);
    };
  
    sendMessageAndWaitForResponse();
  };
  

  

  const loginClick = (brand) => {
    console.log(brand)
    login(brand)
    console.log("brand : " + brand)

    openNewWindowAndWait();

  }



  return (
    <div className={`${loginStyle}`}>
      <h1>로그인</h1>
      <form onSubmit={login} className={`${loginStyle.login}`}>
        <div>
          <div>
            <label htmlFor="email" className={`${loginStyle.lable}`}><p>아이디</p></label>
            <input type="email" id="email" placeholder="이메일을 입력해주세요" className={`${loginStyle.input}`}/>

          </div>
          <div>
            <label htmlFor="userPW" className={`${loginStyle.lable}`}><p>비밀번호</p></label>
            <input type="password" id="userPW" placeholder="비밀번호를 입력해주세요" className={`${loginStyle.input}`}/>
          </div>
        </div>
        
        <div>
          <div className={`${loginStyle.rememberID}`}>
            <input type="checkbox" id="rememberID" /><label htmlFor="rememberID"><p>아이디 저장</p></label>
          </div>
          <input type="submit" value={"로그인"}  className={`${loginStyle.submit}`}/>
        </div>
      </form>
      <div>
        <a href="" className={`${loginStyle.signin}`} >혹시 아직 회원이 아니십니까? <strong>회원가입</strong></a>
      </div>
      <div className={`${loginStyle.line}`}>
         소셜 로그인 
      </div>
      <div className={`${loginStyle.social}`}>
        <button type='button' onClick={(e)=>{loginClick('google', e)}}><img src={process.env.PUBLIC_URL+`/img/login/google.png`} alt="구글 로그인" /></button>
        <button type='button' onClick={(e)=>{loginClick('naver', e)}}><img src={process.env.PUBLIC_URL+`/img/login/naver.png`} alt="네이버 로그인" /></button>
        <button type='button' onClick={(e)=>{loginClick('kakao', e)}}><img src={process.env.PUBLIC_URL+`/img/login/kakao.png`} alt="카카오 로그인" /></button>
      </div>
    </div>
  );
};

export default Login;