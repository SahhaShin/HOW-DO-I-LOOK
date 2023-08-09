import React, { useState, useEffect } from "react";

//css
import mypageHeaderStyle from "./MypageHeader.module.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  action_mypage,
  changeFollowModalOpen,
  changeFollowMode,
  changeManageType,
  changeMenuMode,
  changeFollowModalMode
} from "../../../store/MypageSlice";
import { useParams } from "react-router-dom";

const MypageHeader = () => {
  //redux 관리
  let state = useSelector((state: any) => state.mypage);
  let dispatch = useDispatch();

  const loginUser = JSON.parse(window.sessionStorage.getItem("loginUser"));
  const { watchingUserId } = useParams();

  let getBlackList = (watchingUserId: number) => {
    dispatch(action_mypage.getBlackList(watchingUserId));
  };

  const [followingData, setFollowingData] = useState({
    id : 0,
    targetId : 0,
    nickname : "",
    profileImg : ""
  })

  const changeFollowingData = (() => {
      setFollowingData({
        id : loginUser.id,
        targetId : Number(watchingUserId),
        nickname : state.targetUser.nickname,
        profileImg : state.targetUser.profileImg
      })
  })

  /////////////////////////////////////////////////////////////////////


  const [deleteFollowingData, setDeleteFollowingData] = useState ({
    id : 0,
    targetId : 0,
    nickname : "",
    profileImg : ""
  });

  const changeDeleteFollowingData = (() => {
      setDeleteFollowingData({
          followerId : loginUser.id,
          followeeId : Number(targetUserId)
      })
  })

  // 팔로우
  useEffect(() => {
    if(followingData.followeeId === 0 || followingData.followerId === 0)
      return;

    dispatch(action_mypage.getUserById(followingData.followeeId));
    dispatch(action_mypage.following(followingData));
  }, [followingData])

  // 팔로우 끊기
  useEffect(() => {
    if(deleteFollowingData.followeeId === 0 || deleteFollowingData.followerId === 0)
      return;

    dispatch(action_mypage.deleteFollowing(deleteFollowingData));
  }, [deleteFollowingData])

  const checkFollowing = (() => {
    console.log(Number(targetUserId))
    console.log(state.followingUsers)
    for(let i=0; i<state.followingUsers.length; i++) {
      console.log(state.followingUsers[i].id)

        if(Number(targetUserId) === state.followingUsers[i].id) {
          console.log("true")
          
          return true;
        }      
    }
    console.log("false")
    return false;
  })

  return (
    <div className={`${mypageHeaderStyle.total}`}>
      {/* 타이틀 */}
      <div className={`${mypageHeaderStyle.title}`}>MYPAGE</div>

      {/* 프로필 사진 & 뱃지 사진 & 닉네임 */}
      <div className={`${mypageHeaderStyle.userInfo}`}>
        <div>
          <div className={`${mypageHeaderStyle.profile}`} />
          <img src={state.targetUser.profileImg} />
          <div className={`${mypageHeaderStyle.profile_badge}`}>
            <img
              src={process.env.PUBLIC_URL + `/img/badge/Lovely_colored.png`}
            />
          </div>
        </div>

        <div className={`${mypageHeaderStyle.nickname}`}>
          {state.targetUser.nickname}
        </div>
      </div>

      {/* 버튼 2~3개 */}
      {state.mypageMode === 2
        ? <div className={`${mypageHeaderStyle.btns}`}>
            <button
              onClick={() => {
                dispatch(changeManageType(1));
                dispatch(changeMenuMode(1));
              }}
            >
              기본정보
            </button>
            <button>팔로우</button>
            <button>대화</button>
          </div>
        : <div className={`${mypageHeaderStyle.btns}`}>
            <button
              onClick={() => {
                dispatch(changeManageType(1));
                dispatch(changeMenuMode(1));
              }}
            >
              기본정보
            </button>
            {loginUser.id === Number(targetUserId) ?
            <button
            onClick={() => {
              dispatch(changeManageType(1));
              dispatch(changeMenuMode(3));
            }}
            style={
              state.menuMode === 3
                ? { backgroundColor: "#4570F5", color: "white" }
                : null
            }
          >
            내 정보 관리
          </button> 
          : (checkFollowing()
            ?
            <button onClick={() => {
              changeDeleteFollowingData();
              dispatch(action_mypage.getPerfectFollowList());
            }}>팔로잉 취소</button>
            :
            <button onClick={() => {
              changeFollowingData();
              dispatch(action_mypage.getPerfectFollowList());
            }}>팔로잉하기</button>)
          }
            <button
              onClick={() => {
                dispatch(changeFollowMode(3));
                dispatch(changeFollowModalOpen(true));
                dispatch(changeFollowModalMode(3));
              }}
            >
              블랙리스트 관리
            </button>
          </div>}
    </div>
  );
};

export default MypageHeader;
