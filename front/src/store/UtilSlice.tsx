//유저와 페이지 정보 저장

import { createSlice } from "@reduxjs/toolkit";

// 초기화
//
const initialState = {
  pageName: "Home",
};

const UtilSlice = createSlice({
  name: "UtilSlice",
  initialState,
  reducers: {
    changePage(state, action) {
      state.pageName = action.payload;
    },
  },
});

export let { changePage } = UtilSlice.actions;
export default UtilSlice.reducer;
