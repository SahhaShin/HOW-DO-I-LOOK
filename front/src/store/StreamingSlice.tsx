//유저와 페이지 정보 저장

import { createSlice } from "@reduxjs/toolkit";

import {CheckToken} from "../hook/UserApi"

// axios
export const action_live = {
  
}


//새로운 정보 가공 이미지와 채팅 모두 필요하기 때문
interface anyChatList{
  nickname:string,
  chatContent : string|null,
  image:[
      {
          type:string|null, //CLOTHES OR FEED
          photoLink:string|null
      }
  ]
}

// 초기화
//loginYN : 로그인 여부에 따라 헤더가 로그인 혹은 내옷장 마이페이지 버튼이 뜬다.
const initialState = {
  publisher: "",
  anyChatList:[],
};

const StreamingSlice = createSlice({
  name: "StreamingSlice",
  initialState,
  reducers: {
    changepublisher(state, action) {
      state.publisher = action.payload;
    },
    pushAnyChatList(state,action){
      state.anyChatList.push(action.payload);
    }
  },
});

export let { changepublisher, pushAnyChatList } = StreamingSlice.actions;
export default StreamingSlice.reducer;
