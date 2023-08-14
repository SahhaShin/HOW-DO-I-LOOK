import React, { useState } from "react";
import loginStyle from "./login.module.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import { action_user } from "../../../store/UserSlice";

//hook
import { CheckEmail, CheckNickName } from "../../../hook/UserApi";

// import { isVisible } from "@testing-library/user-event/dist/types/utils";

const Login: React.FC = () => {
  //redux 관리
  let state = useSelector((state: any) => state.closet);
  let dispatch = useDispatch();

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passworda, setPassworda] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [agree, setAgree] = useState(false);
  const [emailNotice, setEmailNotice] = useState(false);
  const [pwNotice, setPwNotice] = useState(false);
  const [nicknameNotice, setNicknameNotice] = useState(false);


  const changeEmail = (value: string) => {
    setEmail(value)
    console.log("email : "+ email + " "+ value)
    if(value != ""){
      CheckEmail(value).then((res) => setEmailNotice(res))

    }
    console.log("check : " + emailNotice)
  }

  const changeNickname = (value: string) => {
    setNickname(value)
    console.log("nickname : "+ nickname + " "+ value)
    if(value != ""){
      CheckNickName(value).then((res) => setNicknameNotice(res))

    }
    console.log("check : " + nicknameNotice)
  }

  const changePassword = (value: string) => {
    setPassword(value)
    console.log("password : "+ password + " "+ value)
    if(value != passworda){
      setPwNotice(true)
    }
    else{
      setPwNotice(false)
    }
    console.log("check : " + pwNotice)
  }

  const changePassworda = (value: string) => {
    setPassworda(value)
    console.log("passworda : "+ passworda + " "+ value)
    if(value != password){
      setPwNotice(true)
    }
    else{
      setPwNotice(false)
    }
    console.log("check : " + pwNotice)
  }

  const signinClick = () => {
    console.log("일반 회원가입");
    console.log("name : " + name);
    console.log("email : " + email);
    console.log("nickname : " + nickname);
    console.log("password : " + password);
    console.log("passworda : " + passworda);
    console.log("gender : " + gender);
    console.log("age : " + age);
    console.log("agree : " + agree);

    console.log()
    console.log("emailNotice : " + emailNotice)
    console.log("pwNotice : " + pwNotice)
    console.log("nicknameNotice : " + nicknameNotice)
    //이메일 확인
    // const ntf = dispatch(action.CheckNickName({nickname}))
    // .then((res) =>{
    //   console.log("ntf : "+ res.value)

    // });

    // const ctf = dispatch(action.CheckEmail({email}));
    // console.log("ctf : "+ ctf)

    if(!agree){
      alert("이용약관 동의를 해 주십시오")
    }
    else if((emailNotice||pwNotice||nicknameNotice) ){
      alert("입력한 정보를 다시 확인해 주시기 바랍니다.")
      return //유효성 검사
    }
    else if(!((name != "")&&(gender != "")&&(age != "")) ){
      alert("입력한 정보를 다시 확인해 주시기 바랍니다.")
      return //정보 공백 검사
    }
    else { 
      //회원가입 요청
      dispatch(
        action_user.Signin({
          email: email,
          password: password,
          name: name,
          nickname: nickname,
          gender: gender,
          age: age,
        })
      );
    }
    
  };

  return (
    <div className={`${loginStyle}`}>
      <h1>회원가입</h1>
      <form className={`${loginStyle.login}`}>
        <div>
          <div>
            <label htmlFor="name" className={`${loginStyle.loginlable}`}>
              <p>이름</p>
            </label>
            <input
              type="name"
              id="name"
              placeholder="이름을 입력해주세요"
              className={`${loginStyle.logininput}`}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className={`${loginStyle.loginlable}`}>
              <p>이메일</p>
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력해주세요"
              className={`${loginStyle.logininput}`}
              onChange={(e) => changeEmail(e.target.value)}
            />
            {emailNotice && <div>사용하실 수 없는 이메일입니다.</div>}
          </div>
          <div>
            <label htmlFor="nickname" className={`${loginStyle.loginlable}`}>
              <p>닉네임</p>
            </label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => changeNickname(e.target.value)}
              placeholder="사용하실 닉네임을 입력해주세요"
              className={`${loginStyle.logininput}`}
            />
            {nicknameNotice && <div>사용하실 수 없는 닉네임입니다.</div>}
          </div>
          <div>
            <label htmlFor="userPW" className={`${loginStyle.loginlable}`}>
              <p>비밀번호</p>
            </label>
            <input
              type="password"
              id="userPW"
              placeholder="비밀번호를 입력해주세요"
              className={`${loginStyle.logininput}`}
              onChange={(e) => changePassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="userPW" className={`${loginStyle.loginlable}`}>
              <p>비밀번호 확인</p>
            </label>
            <input
              type="password"
              id="userPWa"
              placeholder="비밀번호를 다시 입력해주세요"
              className={`${loginStyle.logininput}`}
              onChange={(e) => changePassworda(e.target.value)}
            />
            {pwNotice && <div>비밀번호가 서로 다릅니다.</div>}
          </div>

          <div>
            <label htmlFor="gender" className={`${loginStyle.loginlable}`}>
              <p>성별</p>
            </label>
            <div className={`${loginStyle.loginhalf}`}>
              <input
                type="radio"
                id="MALE"
                name="gender"
                value="MALE"
                onClick={(e) => setGender(e.target.value)}
              />
              <label htmlFor="MALE">남자</label>

              <input
                type="radio"
                id="FEMALE"
                name="gender"
                value="FEMALE"
                onClick={(e) => setGender(e.target.value)}
              />
              <label htmlFor="FEMALE">여자</label>
            </div>
            <div className={`${loginStyle.loginhalf}`}>
              <label htmlFor="age" className={`${loginStyle.loginlable}`}>
                <p>나이</p>
              </label>
              <input
                type="number"
                id="age"
                name="age"
                placeholder="나이를 입력해주세요"
                className={`${loginStyle.logininput}`}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <div className={`${loginStyle.loginrememberID}`}>
            <input
              type="checkbox"
              id="rememberID"
              onClick={(e) => setAgree(e.target.value)}
            />
            <label htmlFor="rememberID">
              <p>
                약관에 동의합니다. <a href="">약관</a>{" "}
              </p>
            </label>
          </div>
          <input
            type="button"
            value={"회원가입"}
            className={`${loginStyle.loginsubmit}`}
            onClick={(e) => {
              signinClick(e);
            }}
          />
        </div>
      </form>
      <div>
        <a href={process.env.REACT_APP_FRONT + `/user/log-in`} className={`${loginStyle.loginsignin}`}>
          이미 계정이 있으신가요? <strong>로그인</strong>
        </a>
      </div>
    </div>
  );
};

export default Login;
