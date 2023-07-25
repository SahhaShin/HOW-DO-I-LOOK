// 메인 스토어

import { configureStore } from "@reduxjs/toolkit";
import ClosetSlice from "./ClosetSlice";


//reducer 등록
export const store = configureStore({
    reducer:{
        closet:ClosetSlice,
    }
});