import React, { useState } from "react";
import liveSlotStyle from "./LiveSlot.module.css";
import { useNavigate } from "react-router-dom";
//redux
import { useSelector, useDispatch } from "react-redux";
import { action, changeModalOpen, isCreate } from "../../../store/LiveSlice";

const LiveSlot = (props) => {
  //oneRoom이 들어옴
  // interface getChatRoomList{
  //     id: number,
  //     userAId: number,
  //     userBId: number,
  //     chatroomCode: string,
  // }

  //redux 관리
  let state = useSelector((state: any) => state.live);
  let dispatch = useDispatch();

  const navigate = useNavigate();

  const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
  // console.log("props : " + props.oneRoom.hostNickname);
  // console.log("login : " + loginUser.nickname);

  function enterLiveRoom() {
    // console.log(props.oneRoom);
    // console.log(props.oneRoom.title);
    dispatch(
      action.enterLiveRoom({
        userId: loginUser.id,
        roomId: props.oneRoom.roomId, //
        hostId: props.oneRoom.hostId,
      })
    );
  }


  return (
    <div>
      <div className={`${liveSlotStyle.line}`} style={{ borderRadius: "1rem" }}>
        {/* 왼쪽 : 프로필 사진 */}
        <div className={`${liveSlotStyle.profile}`}>
          <div className={`${liveSlotStyle.profileCircle_G}`}>
            <img
              src={process.env.PUBLIC_URL + `/img/user/profileImg.png`}
            ></img>

            {/* <div className={`${liveSlotStyle.redDot}`}></div> */}
          </div>
        </div>
        {/* 중앙 */}
        <div className={`${liveSlotStyle.content}`}>
          {/* 닉네임, 시간 */}
          <div>
            <p className={`${liveSlotStyle.nickname}`}></p>
            <p className={`${liveSlotStyle.time}`}>
              {props.oneRoom.hostNickname}
            </p>
          </div>

          {/* 내용 */}
          <div>{props.oneRoom.title}</div>
        </div>

        {/* 우측 : 입장 버튼 */}
        <div className={`${liveSlotStyle.enterBnt}`}>
          <button
            onClick={() => {
              enterLiveRoom();
            }}
          >
            입장
          </button>

        </div>
      </div>
    </div>
  );
};

export default LiveSlot;
