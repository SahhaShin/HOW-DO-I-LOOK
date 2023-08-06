import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie, setCookie, removeCookie } from "../hook/Cookie";


// axios
export const action = {
  // 회원가입 api
  Signin: createAsyncThunk(
    `UserSlice/Signin`,
    async (formdata: SigninInfo, thunkAPI) => {
      return await axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}/api/user/signup`,
        data: formdata,
      })
        .then((response) => {
          //정상작동시 로그인 pg로 다이랙트
          window.location.href = `${process.env.REACT_APP_FRONT}`
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
    async (formdata : SocialSigninInfo, thunkAPI) => {
      console.log("`UserSlice/SocialSignin`,")
      const nickname = formdata.nickname
      const gender = formdata.gender
      const age = formdata.age
      const email = getCookie("new_social_user_email")

      //만약 추가정보를 입력하지 않고 시간이 오래 지났을 시 
      if(typeof email == 'undefined'){
        alert("시간이 지나 쿠키가 만료되었습니다. 다시 시도해 주십시오.")
        alert(`${process.env.REACT_APP_FRONT}/user/log-in`)
        window.location.href = `${process.env.REACT_APP_FRONT}/user/log-in`
      }

      const token = "Bearer " + getCookie("Authorization")
      
      //소셜 회원 가입 시 추가정보 입력하기  
      return await axios({
        method: "put",
        url: `${process.env.REACT_APP_SERVER}/api/user/social/update/${email}`,
        data: {
          "nickname" : nickname,
          "gender" : gender,
          "age" : age,
        },
        headers : {Authorization : token},
      })
        .then((response) => {
          console.log(response.data);

          //성공시 home으로 다이랙트
          window.location.href = `${process.env.REACT_APP_FRONT}`
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
          console.log(response.data )
          console.log(response.headers)
          console.log("header : " + response.headers.get("Authorization-Refresh"))
          const refresh = response.headers.get("Authorization-Refresh")
          setCookie("Authorization-Refresh",refresh, {path : "/"})
          console.log("header : " + response.headers.get("authorization") )
          const authorization = response.headers.get("Authorization")
          setCookie("Authorization",refresh, {path : "/"})
          setCookie("email", formdata.userId, {path : "/"})
          //window.location.href = `${process.env.REACT_APP_FRONT}`
          return response.data; //return을 꼭 해줘야 extraReducer에서 에러가 안난다.
        })
        .catch((e) => {
          console.log(e);
        });
    }
  ),

  // 이메일 증복 체크 api
  CheckEmail: createAsyncThunk(
    `UserSlice/CheckEmail`,
    async (email:string, thunkAPI) => {
      return await axios({
        method: "get",
        url: `${process.env.REACT_APP_SERVER}/api/user/checkbyemail/${email.value}`,
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
  ),

  // 닉네임 증복 체크 api
  CheckNickName: createAsyncThunk(
    `UserSlice/CheckNickName`,
    async (nickname:string, thunkAPI) => {
      return await axios({
        method: "get",
        url: `${process.env.REACT_APP_SERVER}/api/user/checkbynickname/${nickname.value}`,
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
  ),

  // 토큰 유효성 확인 api 
  CheckToken: createAsyncThunk(
    `UserSlice/CheckToken`,
    async (thunkAPI) => {

      let refreshToken = getCookie("Authorization-Refresh")
      //만약 리프레시 토큰이 만료 되었을 시  
      if(typeof refreshToken == 'undefined'){
        return null
      }
      let accessToken = getCookie("Authorization-Refresh")
      //만약 엑세스 토큰만 만료 되었을 시 
      if(typeof accessToken == 'undefined'){
        return await axios({
          method: "get",
          url: `${process.env.REACT_APP_SERVER}/api/user/jwt`,
          headers : {'Authorization-Refresh' : refreshToken },
        })
          .then((response) => {
            const result = response.data;
            console.log("res.data : " + result)
            console.log("header : " + response.headers.get("Authorization-Refresh"))
            const refresh = response.headers.get("Authorization-Refresh")
            setCookie("Authorization-Refresh","Bearer "+refresh, {path : "/"})
            console.log("header : " + response.headers.get("authorization") )
            const authorization = response.headers.get("Authorization")
            setCookie("Authorization","Bearer "+refresh, {path : "/"})
            return result; //return을 꼭 해줘야 extraReducer에서 에러가 안난다.
        })
          .catch((e) => {
            console.log(e);
        });

      }
    }
  ),

    // 토큰 유효성 확인 api 
    Logout: createAsyncThunk(
      `UserSlice/Logout`,
      async (id:string, thunkAPI) => {
  
        let Token = getCookie("Authorization")
        //만약 리프레시 토큰이 만료 되었을 시  
        return await axios({
          method: "get",
          url: `${process.env.REACT_APP_SERVER}/logout/${id.value}`,
          headers : {'Authorization' : Token },
        })
          .then((response) => {
            //토큰 지우기
            removeCookie("Authorization-Refresh", {path : '/'})
            removeCookie('Authorization', {path : '/'})
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
  info : string;
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
    //회원가입
    signin(state, action) {
      state.brand = action.payload;
    },
    //소셜 로그인
    socialLogin(state, action) {
      state.brand = action.payload;
    },
    //로그인
    login(state, action) {
      state.brand = "local";
    },
    //로그아웃
    logout(state, action) {
      state.brand = action.payload;
    },
    //팔로하기
    follow(state, action) {
      state.brand = action.payload;
    },
    //언팔하기
    unfollow(state, action) {
      state.brand = action.payload;
    },
    //팔팔목록 가져오기
    following(state, action) {
      state.brand = action.payload;
    },
    //Access 토큰 만료되었는지 확인 후 만료 되었으면 재요청
    //만약 refesh token도 만료되었으면
    //로그인 페이지로 리다이랙트
    token(state, action) {},
    //id 저장
    setId(state, action) {
      state.id = action.payload
    },
  },
});

export let { login, socialLogin, setId } = UserSlice.actions;
export default UserSlice.reducer;
