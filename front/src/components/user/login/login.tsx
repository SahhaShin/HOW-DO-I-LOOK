import React, { useState , useRef} from 'react';
import loginStyle from './login.module.css';

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {login, socialLogin} from "../../../store/UserSlice";

const Login: React.FC = () => {
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
  


  
  const loginClick = () => {
      console.log("회원 로그인")
      console.log("email : " + email)
      console.log("password : "+ password)
  
      // window.location.href = "http://localhost:8081/login/oauth2/code/kakao"
      //window.location.href = "http://localhost:8081/oauth2/authorization/kakao"
  }
  

  

  const socialLoginClick = (brand) => {
    console.log("브랜드 로그인")
    console.log("brand : " + brand)
    socialLogin(brand)

    const ApiUrl = "http://localhost:8081/oauth2/authorization/"
    // window.location.href = "http://localhost:8081/login/oauth2/code/kakao"
    window.location.href = ApiUrl + brand
  }



  return (
    <div className={`${loginStyle}`}>
      <h1>로그인</h1>
      <form onSubmit={login} className={`${loginStyle.login}`}>
        <div>
          <div>
            <label htmlFor="email" className={`${loginStyle.lable}`}><p>이메일</p></label>
            <input type="email" id="email" placeholder="이메일을 입력해주세요" className={`${loginStyle.input}`} onChange={(e)=>setemail(e.target.value)}/>

          </div>
          <div>
            <label htmlFor="userPW" className={`${loginStyle.lable}`}><p>비밀번호</p></label>
            <input type="password" id="userPW" placeholder="비밀번호를 입력해주세요" className={`${loginStyle.input}`} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
        </div>
        
        <div>
          <div className={`${loginStyle.rememberID}`}>
            <input type="checkbox" id="rememberID"/><label htmlFor="rememberID"><p>아이디 저장</p></label>
          </div>
          <input type="button" value={"로그인"}  className={`${loginStyle.submit}`}  onClick={(e)=>{loginClick(e)}}/>
        </div>
      </form>
      <div>
        <a href="" className={`${loginStyle.signin}`} >혹시 아직 회원이 아니십니까? <strong>회원가입</strong></a>
      </div>
      <div className={`${loginStyle.line}`}>
         소셜 로그인 
      </div>
      <div className={`${loginStyle.social}`}>
        <button type='button' onClick={(e)=>{socialLoginClick('google', e)}}><img src={process.env.PUBLIC_URL+`/img/login/google.png`} alt="구글 로그인" /></button>
        <button type='button' onClick={(e)=>{socialLoginClick('naver', e)}}><img src={process.env.PUBLIC_URL+`/img/login/naver.png`} alt="네이버 로그인" /></button>
        <button type='button' onClick={(e)=>{socialLoginClick('kakao', e)}}><img src={process.env.PUBLIC_URL+`/img/login/kakao.png`} alt="카카오 로그인" /></button>
      </div>
    </div>
  );
};

export default Login;