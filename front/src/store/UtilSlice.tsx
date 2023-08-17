//유저와 페이지 정보 저장

import { createSlice } from "@reduxjs/toolkit";

// 초기화
const initialState = {

  menuItemNum : -1,

};

const UtilSlice = createSlice({
  name: "UtilSlice",
  initialState,
  reducers: {
    changeMenuItemNum(state, action){
      state.menuItemNum = action.payload;
    }
  },
});

export let { changeMenuItemNum } = UtilSlice.actions;
export default UtilSlice.reducer;
