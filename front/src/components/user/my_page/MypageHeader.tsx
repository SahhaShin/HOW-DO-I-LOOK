import React, { useState } from "react";

//css
import mypageHeaderStyle from "./MypageHeader.module.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  action,
  changeFollowModalOpen,
  changeFollowMode,
  changeManageType,
  changeMenuMode,
  changeFollowModalMode
} from "../../../store/MypageSlice";

const MypageHeader = () => {
  //redux 관리
  let state = useSelector((state: any) => state.mypage);
  let dispatch = useDispatch();

  const loginUserId = state.loginUser.id;
  const targetUserId = state.targetUser.id;

  let getBlackList = (targetUserId: number) => {
    dispatch(action.getBlackList(targetUserId));
  };

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
            <button
              onClick={() => {
                dispatch(changeFollowMode(3));
                dispatch(changeFollowModalOpen(true));
                dispatch(changeFollowModalMode(3));
                getBlackList(targetUserId);
              }}
            >
              블랙리스트 관리
            </button>
          </div>}
    </div>
  );
};

export default MypageHeader;
