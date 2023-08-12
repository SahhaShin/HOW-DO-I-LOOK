// 메인 스토어

import { configureStore } from "@reduxjs/toolkit";
import ClosetSlice from "./ClosetSlice";
import FeedSlice from "./FeedSlice";
import MypageSlice from "./MypageSlice";
import UtilSlice from "./UtilSlice";
import ChatSlice from "./ChatSlice";
import LiveSlice from "./LiveSlice";
import UserSlice from "./UserSlice";
import RankingSlice from "./RankingSlice";

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
    live: LiveSlice,
    user: UserSlice,
    rank: RankingSlice,
    streaming: StreamingSlice,
    follow: FollowSlice,
  },
});
