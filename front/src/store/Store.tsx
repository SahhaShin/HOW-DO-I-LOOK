// 메인 스토어

import { configureStore } from "@reduxjs/toolkit";
import closet from "./ClosetSlice";


//reducer 등록
export default configureStore({
    reducer:{
        closet : closet.reducer,
    },
});