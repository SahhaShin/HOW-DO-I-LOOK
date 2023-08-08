import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie, setCookie, removeCookie } from "../hook/Cookie";
import { getUserInfo } from "../hook/UserApi";

// axios
export const action_user = {
  // 회원가입 api
  Signin: createAsyncThunk(
    `UserSlice/Signin`,
    async (formdata: SigninInfo, thunkAPI) => {
      console.log(formdata);
      return await axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}/api/user/signup`,
        data: formdata,
      })
        .then((response) => {
          //정상작동시 홈으로 다이랙트`
          window.location.href = `${process.env.REACT_APP_FRONT}/user/log-in`;
          return response.data; //return을 꼭 해줘야 extraReducer에서 에러가 안난다.
        })
        .catch((e) => {
          console.log(e);
        });
    }
  ),

  // 소셜 회원가입 api
  SocialSignin: createAsyncThunk(
    `UserSlice/SocialSignin`,
    async (formdata: SocialSigninInfo, thunkAPI) => {
      console.log("`UserSlice/SocialSignin`,");
      const nickname = formdata.nickname;
      const gender = formdata.gender;
      const age = formdata.age;
      const email = getCookie("new_social_user_email");

      //만약 추가정보를 입력하지 않고 시간이 오래 지났을 시
      if (typeof email == "undefined" || typeof email === null) {
        alert("시간이 지나 쿠키가 만료되었습니다. 다시 시도해 주십시오.");
        alert(`${process.env.REACT_APP_FRONT}/user/log-in`);
        window.location.href = `${process.env.REACT_APP_FRONT}/user/log-in`;
      }

      const token = "Bearer " + getCookie("Authorization");

      //소셜 회원 가입 시 추가정보 입력하기
      return await axios({
        method: "put",
        url: `${process.env.REACT_APP_SERVER}/api/user/social/update/${email}`,
        data: {
          nickname: nickname,
          gender: gender,
          age: age,
        },
        headers: { Authorization: token },
      })
        .then((response) => {
          console.log(response.data);

          //성공시 home으로 다이랙트
          window.location.href = `${process.env.REACT_APP_FRONT}`;
          return `${process.env.REACT_APP_FRONT}`; //return을 꼭 해줘야 extraReducer에서 에러가 안난다.
        })
        .catch((e) => {
          console.log(e);
        });
    }
  ),

  // 로그인 api
  Login: createAsyncThunk(
    `UserSlice/Login`,
    async (formdata: LoginInfo, thunkAPI) => {
      return await axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}/login`,
        data: formdata,
      })
        .then((response) => {
          // console.log(response.data);
          // console.log(response.headers);
          // console.log(
          //   "header : " + response.headers.get("Authorization-Refresh")
          // );
          const refresh = response.headers.get("Authorization-Refresh");
          setCookie("Authorization-Refresh", refresh, {
            path: "/",
            maxAge: 3600 * 24 * 2 * 7,
          });
          // console.log("header : " + response.headers.get("authorization"));
          const authorization = response.headers.get("Authorization");
          setCookie("Authorization", authorization, {
            path: "/",
            maxAge: 3600,
          });
          const new_basic_user_email = response.headers.get(
            "new_basic_user_email"
          );
          setCookie("new_basic_user_email", new_basic_user_email, {
            path: "/",
            maxAge: 3600 * 24 * 2 * 7,
          });
          window.location.href = `${process.env.REACT_APP_FRONT}`;
          return response.data; //return을 꼭 해줘야 extraReducer에서 에러가 안난다.
        })
        .catch((e) => {
          console.log(e);
        });
    }
  ),

  // 토큰 유효성 확인 api
  CheckToken: createAsyncThunk(`UserSlice/CheckToken`, async (thunkAPI) => {
    let basic_email = getCookie("new_basic_user_emai");
    //만약 리프레시 토큰이 만료 되었을 시
    if (typeof basic_email == "undefined" || typeof basic_email === null) {
      return null;
    }

    let refreshToken = getCookie("Authorization-Refresh");
    //만약 리프레시 토큰이 만료 되었을 시
    if (typeof refreshToken == "undefined") {
      return null;
    }
    let accessToken = "Bearer " + getCookie("Authorization-Refresh");
    //만약 엑세스 토큰만 만료 되었을 시
    if (typeof accessToken == "undefined" || typeof accessToken === null) {
      return await axios({
        method: "get",
        url: `${process.env.REACT_APP_SERVER}/api/user/jwt`,
        headers: { "Authorization-Refresh": refreshToken },
      })
        .then((response) => {
          const result = response.data;
          // console.log("res.data : " + result);
          // console.log(
          //   "header : " + response.headers.get("Authorization-Refresh")
          // );
          const refresh = response.headers.get("Authorization-Refresh");
          setCookie("Authorization-Refresh", refresh, {
            path: "/",
            maxAge: 3600 * 24 * 2 * 7,
          });
          // console.log("header : " + response.headers.get("authorization"));
          const authorization = response.headers.get("Authorization");
          setCookie("Authorization", authorization, {
            path: "/",
            maxAge: 3600,
          });
          return result; //return을 꼭 해줘야 extraReducer에서 에러가 안난다.
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }),

  // 로그아웃  api
  Logout: createAsyncThunk(`UserSlice/Logout`, async (id: string, thunkAPI) => {
    let Token = "Bearer " + getCookie("Authorization");

    return await axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER}/api/user/logout/${id}`,
      headers: { Authorization: Token },
    })
      .then((response) => {
        //토큰 지우기
        removeCookie("Authorization-Refresh", { path: "/" });
        removeCookie("Authorization", { path: "/" });
        removeCookie("new_basic_user_email", { path: "/" });
        removeCookie("new_social_user_email", { path: "/" });

        // Session에 로그인 유저 정보 삭제
        sessionStorage.removeItem("loginUser");

        window.location.href = `${process.env.REACT_APP_FRONT}/user/log-in`;

        return response.data; //return을 꼭 해줘야 extraReducer에서 에러가 안난다.
      })
      .catch((e) => {
        console.log(e);
      });
  }),

  // 회원 정보 불러오기 api
  GetUserInfo: createAsyncThunk(
    `UserSlice/GetUserInfo`,
    async (email: string, thunkAPI) => {
      let Token = "Bearer " + getCookie("Authorization");

      return await axios({
        method: "get",
        url: `${process.env.REACT_APP_SERVER}/api/user/getuserbyemail/${email}`,
        headers: { Authorization: Token },
      })
        .then((response) => {
          // console.log("res.data from Action : ");
          // console.log(response.data);
          removeCookie("new_basic_user_email", { path: "/" });
          removeCookie("new_social_user_email", { path: "/" });
          console.log("res.data from Sesㄴㄷ채sion : ");

          window.sessionStorage.setItem(
            "loginUser",
            JSON.stringify(response.data)
          );
          const userInfo = JSON.parse(window.sessionStorage.getItem("loginUser"));
          // console.log(userInfo);
          return response.data; //return을 꼭 해줘야 extraReducer에서 에러가 안난다.
        })
        .catch((e) => {
          console.log(e);
        });
    }
  ),
};
//회원가입
interface SigninInfo {
  //response
  email: string;
  password: string;
  name: string;
  nickname: string;
  gender: string;
  age: number;
}
//소셜회원가입
interface SocialSigninInfo {
  //response
  nickname: string;
  gender: string;
  age: number;
}

interface LoginInfo {
  //response
  userId: string;
  password: string;
}

interface StringInfo {
  //response
  info: string;
}

const initialState = {
  id: "",
  email: "",
  password: "",
  name: "",
  nickname: "",
  role: "",
  gender: "",
  age: "",
  profileImg: "",
  socialType: "",
  socialId: "",
  showBadgeType: "",
  createdDate: "",
  updatedDate: "",
  accessToken: "", //엑세스토큰 - 쿠키로
  refreshToken: "", //리프레시토큰 - 쿠키로
  follower: [],
  following: [],
  brand: "None", //로그인 Auth 브랜드
  tokenExpire: 0, //Expire 예정 시각 - 사용 x
};

const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    //로그인 후 메인페이지에서 유저정보 가져오기
    getUserInfo(state, action_user) {
      state.brand = action_user.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(action_user.GetUserInfo.fulfilled, (state, action_user) => {
      console.log("res.data from exRedux : ");
      console.log(action_user.payload);
      state.id = action_user.payload.id;
      state.age = action_user.payload.age;
      state.email = action_user.payload.email;
      state.gender = action_user.payload.gender;
      state.name = action_user.payload.name;
      state.nickname = action_user.payload.nickname;
      state.profileImg = action_user.payload.profileImg;
      state.role = action_user.payload.role;
      state.showBadgeType = action_user.payload.showBadgeType;
      state.socialId = action_user.payload.socialId;
      state.socialType = action_user.payload.socialType;
    });
    builder.addCase(action_user.Logout.fulfilled, (state, action_user) => {
      console.log("logout !  ");
      console.log(action_user.payload);
      Object.assign(state, initialState);
    });
  },
});

export let { login, socialLogin, setId, Logout } = UserSlice.actions;
export default UserSlice.reducer;
