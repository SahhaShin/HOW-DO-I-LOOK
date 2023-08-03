import React, { useState } from 'react';
import loginStyle from './login.module.css';

const Login: React.FC = () => {

  const [nickname, setNickname] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')


  const socialRegist = () => {
    console.log("-- Sign in clicked -- ")
    console.log("age : " + age)
    console.log("nickname : " + nickname)
    console.log("gender: " + gender)

    


    // window.location.href = "http://localhost:8081/login/oauth2/code/kakao"
    //window.location.href = "http://localhost:8081/oauth2/authorization/kakao"
  }




  return (
    <div className={`${loginStyle}`}>
      <h1>소셜 회원가입 추가정보 </h1>
      <form className={`${loginStyle.login}`}>
        <div>
          <div>
            <label htmlFor="nickname" className={`${loginStyle.lable}`}><p>닉네임</p></label>
            <input type="text" id="nickname" value={nickname} onChange={(e)=>setNickname(e.target.value)} placeholder="사용하실 닉네임을 입력해주세요" className={`${loginStyle.input}`}/>
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
          <input type="button" value={"회원가입"} onClick={(e)=>{socialRegist( e)}} className={`${loginStyle.submit}`}/>
        </div>
      </form>
      </div>
  );
};

export default Login;