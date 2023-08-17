import React, { useState } from 'react';
import loginStyle from './login.module.css';

//cookie
import { getCookie, setCookie } from "../../../hook/Cookie";
import {  CheckNickName } from "../../../hook/UserApi";



//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action_user, setId} from "../../../store/UserSlice";

const Login: React.FC = () => {

  //redux 관리
  let dispatch = useDispatch();

  const [nickname, setNickname] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [nicknameNotice, setNicknameNotice] = useState(false);

  const changeNickname = (value: string) => {
    setNickname(value)
    if(value != ""){
      CheckNickName(value).then((res) => setNicknameNotice(res))

    }
  }



  const socialRegist = async () => {

    // console.log(getCookie("new_social_user_email"))

    if((nicknameNotice) ){
      alert("입력한 정보를 다시 확인해 주시기 바랍니다.")
      return //유효성 검사
    }
    else if(!((gender != "")&&(age != ""))){
      alert("입력한 정보를 다시 확인해 주시기 바랍니다.")
      return //정보 공백 검사 
    }
    else { 

      //소셜 회원가입 추가정보 요청
      dispatch(
        action_user.SocialSignin({
          nickname: nickname,
          gender: gender,
          age: age,
        })
        );
    }

    

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
            <input type="text" id="nickname" value={nickname} onChange={(e)=>changeNickname(e.target.value)} placeholder="사용하실 닉네임을 입력해주세요" className={`${loginStyle.input}`}/>
            {nicknameNotice && <div>사용하실 수 없는 닉네임입니다.</div>}
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