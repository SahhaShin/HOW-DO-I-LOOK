// 메인 스토어

import { configureStore } from "@reduxjs/toolkit";
import ClosetSlice from "./ClosetSlice";
import FeedSlice from "./FeedSlice";
import MypageSlice from "./MypageSlice";
import UtilSlice from "./UtilSlice";
import ChatSlice from "./ChatSlice";
import UserSlice from "./UserSlice";
import RankingSlice from "./RankingSlice";
import LiveSlice from "./LiveSlice";

import StreamingSlice from "./StreamingSlice";
import FollowSlice from "./FollowSlice";

//reducer 등록
export const store = configureStore({
  reducer: {
    closet: ClosetSlice,
    feed: FeedSlice,
    mypage: MypageSlice,
    util: UtilSlice,
    chat: ChatSlice,
    user: UserSlice,
    rank: RankingSlice,
    streaming: StreamingSlice,
    follow: FollowSlice,
    live: LiveSlice,
  },
});
