import React, { useState } from "react";
import loginStyle from "./login.module.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import { action } from "../../../store/UserSlice";
import { isVisible } from "@testing-library/user-event/dist/types/utils";

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


  const changeEmail = (e) => {
    setEmail(e.target.value)
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
    else if(password != passworda ){
      alert("비밀번호와 비밀번호 확인이 서로 일치하지 않습니다.")
      return
    }
    else { 
      //회원가입 요청
      dispatch(
        action.Signin({
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
            <label htmlFor="name" className={`${loginStyle.lable}`}>
              <p>이름</p>
            </label>
            <input
              type="name"
              id="name"
              placeholder="이름을을 입력해주세요"
              className={`${loginStyle.input}`}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className={`${loginStyle.lable}`}>
              <p>이메일</p>
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력해주세요"
              className={`${loginStyle.input}`}
              onChange={(e) => setEmail(e.target.value)}
            />
            {pwNotice && <div>사용하실 수 있는 이메일입니다.</div>}
          </div>
          <div>
            <label htmlFor="nickname" className={`${loginStyle.lable}`}>
              <p>닉네임</p>
            </label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="사용하실 닉네임을 입력해주세요"
              className={`${loginStyle.input}`}
            />
            {pwNotice && <div>사용하실 수 있는 닉네임입니다.</div>}
          </div>
          <div>
            <label htmlFor="userPW" className={`${loginStyle.lable}`}>
              <p>비밀번호</p>
            </label>
            <input
              type="password"
              id="userPW"
              placeholder="비밀번호를 입력해주세요"
              className={`${loginStyle.input}`}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="userPW" className={`${loginStyle.lable}`}>
              <p>비밀번호 확인</p>
            </label>
            <input
              type="password"
              id="userPWa"
              placeholder="비밀번호를 다시 입력해주세요"
              className={`${loginStyle.input}`}
              onChange={(e) => setPassworda(e.target.value)}
            />
            {pwNotice && <div>비밀번호가 서로 다릅니다.</div>}
          </div>

          <div>
            <label htmlFor="gender" className={`${loginStyle.lable}`}>
              <p>성별</p>
            </label>
            <div className={`${loginStyle.half}`}>
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
            <div className={`${loginStyle.half}`}>
              <label htmlFor="age" className={`${loginStyle.lable}`}>
                <p>나이</p>
              </label>
              <input
                type="number"
                id="age"
                name="age"
                placeholder="나이를 입력해주세요"
                className={`${loginStyle.input}`}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <div className={`${loginStyle.rememberID}`}>
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
            className={`${loginStyle.submit}`}
            onClick={(e) => {
              signinClick(e);
            }}
          />
        </div>
      </form>
      <div>
        <a href={process.env.REACT_APP_FRONT + `/user/log-in`} className={`${loginStyle.signin}`}>
          이미 계정이 있으신가요? <strong>로그인</strong>
        </a>
      </div>
    </div>
  );
};

export default Login;
