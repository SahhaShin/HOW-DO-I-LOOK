import React, { useState } from 'react';
import loginStyle from './login.module.css';

const Login: React.FC = () => {



  return (
    <div className={`${loginStyle}`}>
      <h1>회원가입</h1>
      <form action=""  className={`${loginStyle.login}`}>
        <div>
          <div>
            <label htmlFor="userPW" className={`${loginStyle.lable}`}><p>이메일</p></label>
            <input type="email" id="userPW" placeholder="이메일을 입력해주세요" className={`${loginStyle.input}`}/>
          </div>
          <div>
            <label htmlFor="userPW" className={`${loginStyle.lable}`}><p>닉네임</p></label>
            <input type="text" id="userPW" placeholder="사용하실 닉네임을 입력해주세요" className={`${loginStyle.input}`}/>
          </div>
          <div>
            <label htmlFor="userPW" className={`${loginStyle.lable}`}><p>비밀번호</p></label>
            <input type="password" id="userPW" placeholder="비밀번호를 입력해주세요" className={`${loginStyle.input}`}/>
          </div>
          <div>
            <label htmlFor="userPW2" className={`${loginStyle.lable}`}><p>비밀번호확인</p></label>
            <input type="password" id="userPW2" placeholder="비밀번호를 다시 입력해주세요" className={`${loginStyle.input}`}/>
          </div>
          <div>
            <label htmlFor="userPW" className={`${loginStyle.lable}`}><p>성별</p></label>
            <input type="password" id="userPW" placeholder="성별을 입력해주세요" className={`${loginStyle.input}`}/>
          </div>
          <div>
            <label htmlFor="userPW" className={`${loginStyle.lable}`}><p>나이</p></label>
            <input type="number" id="userPW" placeholder="나이를 입력해주세요" className={`${loginStyle.input}`}/>
          </div>
        </div>
        
        <div>
          <div className={`${loginStyle.rememberID}`}>
            <input type="checkbox" id="rememberID" /><label htmlFor="rememberID"><p>약관에 동의합니다. <a href="">약관</a> </p></label>
          </div>
          <input type="submit" value={"회원가입"}  className={`${loginStyle.submit}`}/>
        </div>
      </form>
      <div>
        <a href="" className={`${loginStyle.signin}`} >이미 계정이 있으신가요? <strong>로그인</strong></a>
      </div>
      </div>
  );
};

export default Login;