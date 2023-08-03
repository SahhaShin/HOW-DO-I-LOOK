import React, { useState } from 'react';
import loginStyle from './login.module.css';

const Login: React.FC = () => {
  
  const [email, setemail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [passworda, setPassworda] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [agree, setAgree] = useState(false)

  const signinClick = () => {
    console.log("일반 회원가입")
    console.log("email : " + email)
    console.log("nickname : "+ nickname)
    console.log("password : " + password)
    console.log("passworda : "+ passworda)
    console.log("gender : "+ gender)
    console.log("age : "+ age)
    console.log("agree : "+ agree)

  }


  return (
    <div className={`${loginStyle}`}>
      <h1>회원가입</h1>
      <form className={`${loginStyle.login}`}>
        <div>
        <div>
            <label htmlFor="email" className={`${loginStyle.lable}`}><p>이메일</p></label>
            <input type="email" id="email" placeholder="이메일을 입력해주세요" className={`${loginStyle.input}`} onChange={(e)=>setemail(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="nickname" className={`${loginStyle.lable}`}><p>닉네임</p></label>
            <input type="text" id="nickname" value={nickname} onChange={(e)=>setNickname(e.target.value)} placeholder="사용하실 닉네임을 입력해주세요" className={`${loginStyle.input}`}/>
          </div>
          <div>
            <label htmlFor="userPW" className={`${loginStyle.lable}`}><p>비밀번호</p></label>
            <input type="password" id="userPW" placeholder="비밀번호를 입력해주세요" className={`${loginStyle.input}`} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="userPW" className={`${loginStyle.lable}`}><p>비밀번호 확인</p></label>
            <input type="password" id="userPWa" placeholder="비밀번호를 다시 입력해주세요" className={`${loginStyle.input}`} onChange={(e)=>setPassworda(e.target.value)}/>
          </div>

          <div>
            <label htmlFor="gender" className={`${loginStyle.lable}`}><p>성별</p></label>
            <div  className={`${loginStyle.half}`}>
              <input type="radio" id="MALE" name="gender" value="MALE" onClick={(e)=>setGender(e.target.value)}/><label htmlFor="MALE" >남자</label>
            
              <input type="radio" id="FEMALE" name="gender" value="FEMALE" onClick={(e)=>setGender(e.target.value)}/><label htmlFor="FEMALE" >여자</label>
            </div>
            <div className={`${loginStyle.half}`}>
              <label htmlFor="age" className={`${loginStyle.lable}`}><p>나이</p></label>
              <input type="number" id="age" name="age" placeholder="나이를 입력해주세요" className={`${loginStyle.input}`} onChange={(e)=>setAge(e.target.value)}/>
            </div>
          </div>

        </div>
        
        <div>
          <div className={`${loginStyle.rememberID}`}>
            <input type="checkbox" id="rememberID" onClick={(e)=>setAgree(e.target.value)}/><label htmlFor="rememberID"><p>약관에 동의합니다. <a href="">약관</a> </p></label>
          </div>
          <input type="button" value={"회원가입"}  className={`${loginStyle.submit}`}  onClick={(e)=>{signinClick(e)}}/>
        </div>
      </form>
      <div>
        <a href="" className={`${loginStyle.signin}`} >이미 계정이 있으신가요? <strong>로그인</strong></a>
      </div>
      </div>
  );
};

export default Login;