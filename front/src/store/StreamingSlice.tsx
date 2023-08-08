//유저와 페이지 정보 저장

import { createSlice } from "@reduxjs/toolkit";

// 초기화
//loginYN : 로그인 여부에 따라 헤더가 로그인 혹은 내옷장 마이페이지 버튼이 뜬다.
const initialState = {
  publisher: "",
};

const StreamingSlice = createSlice({
  name: "StreamingSlice",
  initialState,
  reducers: {
    changepublisher(state, action) {
      state.publisher = action.payload;
    },
  },
});

export let { changepublisher } = StreamingSlice.actions;
export default StreamingSlice.reducer;
