import React, { useState, useEffect } from "react";
import loginStyle from "./login.module.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import { login, socialLogin, action_user } from "../../../store/UserSlice";

//cookie
import { getCookie, setCookie } from "../../../hook/Cookie";

const Login: React.FC = () => {



  //redux 관리
  let state = useSelector((state: any) => state.closet);
  let dispatch = useDispatch();

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberID, setRememberID] = useState(false);

  useEffect(() => {

    //회원정보 가져오기
    const rememberedID = getCookie("rememberID");
    if (!((typeof rememberedID == "undefined") || (typeof rememberedID === null))) {
      setemail(rememberedID)
      setRememberID(true)
    }
  }, []);
  const loginClick = () => {

    //email또는 비밀번호를 전부 입력하지 않았을 경우 사용자에게 알림
    if(email == ""){
      alert("사용자이메일을 입력하십시오.")
      return
    }
    //id저장
    if(rememberID){
      setCookie("rememberID", email, {path: "/", maxAge: 3600*2*7,})
    }
    else{
      setCookie("rememberID", email, {path: "/", maxAge: 0,})

    }
    if(password == ""){
      alert("사용자비밀번호를 입력하십시오.")
      return 
    }

    dispatch(
      action_user.Login({
        email: email,
        password: password,
      })
    );



    // window.location.href = "http://localhost:8081/login/oauth2/code/kakao"
    //window.location.href = "http://localhost:8081/oauth2/authorization/kakao"
  };

  const socialLoginClick = (brand) => {
    // socialLogin(brand);

    const ApiUrl = "http://localhost:8081/oauth2/authorization/";
    // window.location.href = "http://localhost:8081/login/oauth2/authorization/kakao"
    window.location.href = ApiUrl + brand;
  };

  return (
    <div className={`${loginStyle.totalWrapper} ${loginStyle.fadeInBox}`}>
      <h1 className={`${loginStyle.title}`}><p className={`${loginStyle.HELLO}`}>My colorful fashion</p><br/> <p className={`${loginStyle.H}`}>How</p> 
      <p className={`${loginStyle.D}`}> Do</p> 
      <p className={`${loginStyle.I}`}> I </p> 
      <p className={`${loginStyle.Look}`}>Look</p>
      </h1>
      <form onSubmit={login} className={`${loginStyle.login}`}>
        <div>
          <div>
            <label htmlFor="email" className={`${loginStyle.loginlable}`}>
              <p>이메일</p>
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              className={`${loginStyle.logininput}`}
              onChange={(e) => setemail(e.target.value)}
            />
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          {/* <div className={`${loginStyle.loginrememberID}`}>
            <input type="checkbox" id="rememberID" checked={rememberID} onClick={(e) => {setRememberID(!rememberID)}}/>
            <label htmlFor="rememberID">
              <p>이메일 저장</p>
            </label>
          </div> */}
          <input
            type="button"
            value={"로그인"}
            className={`${loginStyle.loginsubmit}`}
            onClick={(e) => {
              loginClick(e);
            }}
          />
        </div>
      </form>
  
      {/* <div className={`${loginStyle.loginline}`}>소셜 로그인은 아래 버튼으로 이용해주세요</div> */}
      {/* <div className={`${loginStyle.loginsocial}`}>
        <button
          className={`${loginStyle.google}`}
          type="button"
          onClick={(e) => {
            socialLoginClick("google", e);
          }}
        >
          GOOGLE
          <img
            src={process.env.PUBLIC_URL + `/img/login/google.png`}
            alt="구글 로그인"
          />
        </button>
        <button
          className={`${loginStyle.naver}`}
          type="button"
          onClick={(e) => {
            socialLoginClick("naver", e);
          }}
        >
          NAVER
          <img
            src={process.env.PUBLIC_URL + `/img/login/naver.png`}
            alt="네이버 로그인"
          />
        </button>
        <button
          className={`${loginStyle.kakao}`}
          type="button"
          onClick={(e) => {
            socialLoginClick("kakao", e);
          }}
        >
          KAKAO
          <img
            src={process.env.PUBLIC_URL + `/img/login/kakao.png`}
            alt="카카오 로그인"
          />
        </button>
      </div> */}

      <div className={`${loginStyle.registBtn}`}>
        <a href={process.env.REACT_APP_FRONT + `/user/sign-up`} className={`${loginStyle.loginsignin}`}>
          혹시 아직 회원이 아니십니까? <strong>회원가입</strong>
        </a>
      </div>
    </div>
  );
};

export default Login;
