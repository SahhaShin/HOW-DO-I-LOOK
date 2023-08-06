import React, { useState, useEffect } from "react";

//css
import mypageMainStyle from "./MypageMain.module.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  action,
  changeFollowModalOpen,
  changeFollowMode,
  changeMenuMode,
} from "../../../store/MypageSlice";

const MypageMain = () => {
  //redux 관리
  let state = useSelector((state: any) => state.mypage);
  let dispatch = useDispatch();

  // 일단 로그인한 유저의 아이디
  const loginUserId = state.loginUser.id;
  // 내가 보고있는 유저의 아이디
  const targetUserId = state.targetUser.id;

  let getFollowMeList = (targetUserId: number) => {
    dispatch(action.getFollowMeList(targetUserId));
  };
  let getFollowingList = (targetUserId: number) => {
    dispatch(action.getFollowingList(targetUserId));
  };
  let getBlackList = (targetUserId: number) => {
    dispatch(action.getBlackList(targetUserId));
  };

  let getFeedList = (targetUserId: number) => {
    dispatch(action.getFeedList(targetUserId));
  };

  let getLikeFeedList = (targetUserId: number) => {
    dispatch(action.getLikeFeedList(targetUserId));
  };

  let getLikeScore = (targetUserId: number) => {
    dispatch(action.getLikeScore(targetUserId));
  }

  // 최초 1회 실행
  useEffect(
    () => {
      getFollowMeList(targetUserId);
      getFollowingList(targetUserId);
      getBlackList(targetUserId);
      getFeedList(targetUserId);
      getLikeFeedList(targetUserId);
      getLikeScore(targetUserId);
    },
    [state.loginUser.id, state.targetUser.id]
  );

  interface Followers {
    id: number;
    nickname: string;
    profileImg: string | null;
  }

  return (
    <div className={`${mypageMainStyle.total}`}>
      {/* 팔로워 팔로잉 피드 */}
      <div className={`${mypageMainStyle.followFeedInfo}`}>
        <div
          onClick={() => {
            dispatch(changeFollowMode(1));
            dispatch(changeFollowModalOpen(true));
            getFollowMeList(targetUserId);
          }}
          className={`${mypageMainStyle.follower}`}
        >
          <div>팔로워</div>
          <div>
            {state.followMeUsers.length}
          </div>
        </div>

        <div
          onClick={() => {
            dispatch(changeFollowMode(2));
            dispatch(changeFollowModalOpen(true));
            getFollowingList(targetUserId);
          }}
          className={`${mypageMainStyle.follow}`}
        >
          <div>팔로잉</div>
          <div>
            {state.followingUsers.length}
          </div>
        </div>

        <div
          onClick={() => {
            dispatch(changeMenuMode(2));
          }}
          className={`${mypageMainStyle.feed}`}
        >
          <div>피드</div>
          <div>
            {state.feedList.content?.length}
          </div>
        </div>
      </div>

      {/* 4가지 반응 기록 */}
      <div className={`${mypageMainStyle.likes}`}>
        <div className={`${mypageMainStyle.Lovely}`}>
          <div>Lovely</div>
          <div>{state.likeScore.lovelyScore}</div>
        </div>

        <div className={`${mypageMainStyle.Natural}`}>
          <div>Natural</div>
          <div>{state.likeScore.naturalScore}</div>
        </div>

        <div className={`${mypageMainStyle.Modern}`}>
          <div>Modern</div>
          <div>{state.likeScore.modernScore}</div>
        </div>

        <div className={`${mypageMainStyle.Sexy}`}>
          <div>Sexy</div>
          <div>{state.likeScore.sexyScore}</div>
        </div>
      </div>

      {/* 뱃지 저장소 */}
      <div className={`${mypageMainStyle.badge}`}>
        <div className={`${mypageMainStyle.title}`}>BADGE</div>
        <div className={`${mypageMainStyle.badges}`}>
          <div className={`${mypageMainStyle.LovelyBadge}`}>
            <img
              src={process.env.PUBLIC_URL + `/img/badge/Lovely_colored.png`}
            />
            <div>Lovely Master</div>
          </div>

          <div className={`${mypageMainStyle.NaturalBadge}`}>
            <img
              src={process.env.PUBLIC_URL + `/img/badge/Natural_Uncolored.png`}
            />
            <div>Natural Master</div>
          </div>

          <div className={`${mypageMainStyle.ModernBadge}`}>
            <img
              src={process.env.PUBLIC_URL + `/img/badge/Modern_Uncolored.png`}
            />
            <div>Modern Master</div>
          </div>

          <div className={`${mypageMainStyle.SexyBadge}`}>
            <img src={process.env.PUBLIC_URL + `/img/badge/Sexy_colored.png`} />
            <div>Sexy Master</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageMain;
