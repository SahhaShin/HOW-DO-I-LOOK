import axios from "axios";
import { getCookie, setCookie, removeCookie } from "./Cookie";

// 토큰 만료 되었는가 확인하기
//Bearer를 붙어서 반환해준다
export async function CheckToken() {

  console.log("checkToken ");

  //만약 리프레시 토큰이 만료 되었을 시
  let refreshToken = getCookie("Authorization-Refresh");

  if ((typeof refreshToken == "undefined") || (typeof refreshToken === null)) {
    console.log("refreshToken expire ");
    window.location.href = `${process.env.REACT_APP_FRONT}/user/log-in`;
    return null;
  }

  let accessToken = getCookie("Authorization");

  //만약 엑세스 토큰만 만료 되었을 시
  if ((typeof accessToken == "undefined") || (typeof accessToken === null)) {

    console.log("accessToken expire ");

    return await axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER}/api/user/jwt`,
      headers: { "Authorization-Refresh": "Bearer " + refreshToken },
    })
      .then((response) => {
        const result = response.data;

        console.log("res.data : " + result);

        const refresh = response.headers.get("Authorization-Refresh");

        setCookie("Authorization-Refresh", refresh, {
          path: "/",
          maxAge: 3600 * 24 * 2 * 7,
        });

        const authorization = response.headers.get("Authorization");

        setCookie("Authorization", authorization, {
          path: "/",
          maxAge: 3600,
        });

        return "Bearer " + authorization;
      })
      .catch((e) => {
        console.log(e);
      });
  } 
  else {
    return "Bearer " + accessToken;
  }
}

//증복되는 email인가

export async function CheckEmail(email: String) {
  // async, await을 사용하는 경우
  return await axios({
    method: "get",
    url: `${process.env.REACT_APP_SERVER}/api/user/checkbyemail/${email}`,
  })
    .then((response) => {
      const result = response.data;
      console.log("email check : " + result);
      return result; //return을 꼭 해줘야 extraReducer에서 에러가 안난다.
    })
    .catch((e) => {
      console.log(e);
    });
}

//증복되는 닉네임인가,

export async function CheckNickName(nickname: String) {
  // async, await을 사용하는 경우
  return await axios({
    method: "get",
    url: `${process.env.REACT_APP_SERVER}/api/user/checkbynickname/${nickname}`,
  })
    .then((response) => {
      const result = response.data;
      console.log("nickname check : " + result);
      return result; //return을 꼭 해줘야 extraReducer에서 에러가 안난다.
    })
    .catch((e) => {
      console.log(e);
    });
}

//user 정보 가져오기
export const getUserInfo = () => {
  // console.log(window.sessionStorage.getItem("userInfo"))
  // console.log(JSON.parse(window.sessionStorage.getItem("userInfo")));

  const userInfo = window.sessionStorage.getItem("loginUser");
  return userInfo;
};
