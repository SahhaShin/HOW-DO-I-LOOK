import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    id : "",
    email : "",
    password : "",
    name : "",
    nickname : "",
    role : "",
    gender : "",
    age : "",
    profileImg : "",
    socialType : "",
    socialId : "",
    createdDate : "",
    updatedDate : "",
    accessToken : "", //엑세스토큰
    refreshToken : "", //리프레시토큰
    follower : [],
    following : [],
    brand : "None", //로그인 Auth 브랜드
    tokenExpire : 0, //Expire 예정 시각 
}


const UserSlice = createSlice({
    name:'UserSlice',
    initialState,
    reducers:{
        //회원가입
        signin(state, action){
            state.brand = action.payload;
        }, 
        //로그인
        login(state, action){
            state.brand = "local";
        },
        //소셜 로그인
        socialLogin(state, action){
            state.brand = action.payload;
            
        },
        //로그아웃
        logout(state, action){
            state.brand = action.payload;
        },
        //팔로하기
        follow(state, action){
            state.brand = action.payload;
        },
        //언팔하기
        unfollow(state, action){
            state.brand = action.payload;
        },
        //팔팔목록 가져오기
        following(state, action){
            state.brand = action.payload;
        },
        //Access 토큰 만료되었는지 확인 후 만료 되었으면 재요청
        //만약 refesh token도 만료되었으면 
        //로그인 페이지로 리다이랙트 
        token(state, action){

        }
        
        
    }
});

export let {login} = UserSlice.actions;
export default UserSlice.reducer;