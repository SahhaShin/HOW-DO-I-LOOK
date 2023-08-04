import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie, setCookie } from "../hook/Cookie";


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
          // console.log(response)
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
      const email = getCookie("new_social_user_email")
      const token = "Bearer " + getCookie("Authorization")
      console.log(`${process.env.REACT_APP_SERVER}/social/update/${email}`)
      console.log("formdata : " + formdata)
      console.log("email : " + email)
      console.log("token : " + token)
      //회원 정보 업데이트 할 회원 id 가져오기 
      return await axios({
        method: "get",
        url: `${process.env.REACT_APP_SERVER}/api/user/userId/${email}`,
        headers : {Authorization : token},
      })
        .then((response) => {
          console.log(response.data);
          return response; //return을 꼭 해줘야 extraReducer에서 에러가 안난다.
        })
        .catch((e) => {
          console.log(e);
        });

      




      // //회원 정보 업데이트 하기 
      // return await axios({
      //   method: "post",
      //   url: `${process.env.REACT_APP_SERVER}/social/update/${id}`,
      //   data: formdata,
      //   headers : {Authorization : token},
      // })
      //   .then((response) => {
      //     console.log(response.data);
      //     return response; //return을 꼭 해줘야 extraReducer에서 에러가 안난다.
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
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
          console.log(response)
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


interface SocialSignin {
  //response
  formdata: SocialSigninInfo;
  email: string;
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
  },
});

export let { login, socialLogin } = UserSlice.actions;
export default UserSlice.reducer;
