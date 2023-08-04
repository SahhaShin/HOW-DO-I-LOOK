//유저와 페이지 정보 저장

import { createSlice } from "@reduxjs/toolkit";

// 초기화
//
const initialState = {
  pageName: "Home",
  menuItemNum : 1,
};

const UtilSlice = createSlice({
  name: "UtilSlice",
  initialState,
  reducers: {
    changePage(state, action) {
      state.pageName = action.payload;
    },
    changeMenuItemNum(state, action){
      state.menuItemNum = action.payload;
    }
  },
});

export let { changePage, changeMenuItemNum } = UtilSlice.actions;
export default UtilSlice.reducer;
