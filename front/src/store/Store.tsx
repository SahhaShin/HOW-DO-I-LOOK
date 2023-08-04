// 메인 스토어

import { configureStore } from "@reduxjs/toolkit";
import ClosetSlice from "./ClosetSlice";
import FeedSlice from "./FeedSlice";
import MypageSlice from "./MypageSlice";
import UtilSlice from "./UtilSlice";


//reducer 등록
export const store = configureStore({
    reducer:{
        closet:ClosetSlice,
        feed:FeedSlice,
        mypage:MypageSlice,
        util:UtilSlice,
    }
});