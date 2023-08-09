import React, { useState, useEffect } from "react";

//css
import mypageMainStyle from "./MypageMain.module.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  action_mypage,
  changeFollowModalOpen,
  changeFollowMode,
  changeMenuMode,
} from "../../../store/MypageSlice";
import {useParams} from 'react-router-dom'

const MypageMain = () => {

  //redux 관리
  let state = useSelector((state: any) => state.mypage);
  let dispatch = useDispatch();

  // 일단 로그인한 유저의 아이디
  const loginUser = JSON.parse(window.sessionStorage.getItem("loginUser"));
  // 내가 보고있는 유저의 아이디
  const { watchingUserId } = useParams();

  let getFeedList = (watchingUserId: number) => {
    dispatch(action_mypage.getFeedList(watchingUserId));
  };

  let getLikeFeedList = (watchingUserId: number) => {
    dispatch(action_mypage.getLikeFeedList(watchingUserId));
  };

  let getLikeScore = (watchingUserId: number) => {
    dispatch(action_mypage.getLikeScore(watchingUserId));
  }

  // 최초 1회 실행
  useEffect(
    () => {
      dispatch(action_mypage.getMyFollowerList(loginUser.id));
    },[])

  useEffect(() => {
    dispatch(action_mypage.getMyFollowingList(loginUser.id));
  }, [])

  useEffect(() => {
    dispatch(action_mypage.getYourFollowerList(Number(watchingUserId)));
  })

  useEffect(() => {
    dispatch(action_mypage.getYourFollowingList(Number(watchingUserId)));
  })

  useEffect(() => {
      dispatch(action_mypage.getBlackList(Number(watchingUserId)));
  }, [])

  useEffect(() => {
      getFeedList(Number(watchingUserId));
  }, [])

  useEffect(() => {
      getLikeFeedList(Number(watchingUserId));
  }, [])

  useEffect(() => {
    getLikeScore(Number(watchingUserId));
  }, [])

  useEffect(() => {
    dispatch(action_mypage.getPerfectFollowList());
  }, [state.myFollwerUsers, state.myFollowingUsers])

  useEffect(() => {
    if(Number(watchingUserId) === 0)
        return;

    dispatch(action_mypage.getBadgeList(Number(watchingUserId)));
  }, [])

  const showBadgeList = () => {
    return state.badgeList.map((badge, index) => {
      if (badge.badgeType === "LOVELY") {
        return (
          <div key={index} className={`${mypageMainStyle.LovelyBadge}`}>
            <img src={process.env.PUBLIC_URL + `/img/badge/Lovely_colored.png`} />
            <div>Lovely Master</div>
          </div>
        );
      } else if (badge.badgeType === "SEXY") {
        return (
          <div key={index} className={`${mypageMainStyle.SexyBadge}`}>
            <img src={process.env.PUBLIC_URL + `/img/badge/Sexy_colored.png`} />
            <div>Sexy Master</div>
          </div>
        );
      } else if (badge.badgeType === "MODERN") {
        return (
          <div key={index} className={`${mypageMainStyle.ModernBadge}`}>
            <img src={process.env.PUBLIC_URL + `/img/badge/Modern_Uncolored.png`} />
            <div>Modern Master</div>
          </div>
        );
      } else if (badge.badgeType === "NATURAL") {
        return (
          <div key={index} className={`${mypageMainStyle.NaturalBadge}`}>
            <img src={process.env.PUBLIC_URL + `/img/badge/Natural_Uncolored.png`} />
            <div>Natural Master</div>
          </div>
        );
      }
      // 아무 뱃지도 해당하지 않을 때 처리
      return null;
    });
  };
  


  return (
    <div className={`${mypageMainStyle.total}`}>
      {/* 팔로워 팔로잉 피드 */}
      <div className={`${mypageMainStyle.followFeedInfo}`}>
        <div
          onClick={() => {
            dispatch(changeFollowMode(1));
            dispatch(changeFollowModalOpen(true));
          }}
          className={`${mypageMainStyle.follower}`}
        >
          <div>팔로워</div>
            {Number(watchingUserId) === loginUser.id ? <div>{state.myFollowerUsers.length}</div> : <div>{state.yourFollowerUsers.length}</div>}
        </div>

        <div
          onClick={() => {
            dispatch(changeFollowMode(2));
            dispatch(changeFollowModalOpen(true));
          }}
          className={`${mypageMainStyle.follow}`}
        >
          <div>팔로잉</div>
          <div>
            {Number(watchingUserId) === loginUser.id ? <div>{state.myFollowingUsers.length}</div> : <div>{state.yourFollowingUsers.length}</div>}
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
            {showBadgeList()}
        </div>
      </div>
    </div>
  );
};

export default MypageMain;
