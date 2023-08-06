//유저와 페이지 정보 저장

import { createSlice } from "@reduxjs/toolkit";

// 초기화
//loginYN : 로그인 여부에 따라 헤더가 로그인 혹은 내옷장 마이페이지 버튼이 뜬다.
const initialState = {
  pageName: "Home",
  menuItemNum: 1,
  loginYN: true
};

const UtilSlice = createSlice({
  name: "UtilSlice",
  initialState,
  reducers: {
    changePage(state, action) {
      state.pageName = action.payload;
    },
    changeMenuItemNum(state, action) {
      state.menuItemNum = action.payload;
    }
  }
});

export let { changePage, changeMenuItemNum } = UtilSlice.actions;
export default UtilSlice.reducer;
