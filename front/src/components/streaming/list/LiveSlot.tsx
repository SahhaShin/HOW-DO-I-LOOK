import React, { useState } from "react";
import liveSlotStyle from "./LiveSlot.module.css";
import { useNavigate } from "react-router-dom";
//redux
import { useSelector, useDispatch } from "react-redux";
import { action } from "../../../store/LiveSlice";

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

  function chatStart() {
    //id는 roomId임
    navigate(
      "/liveroom/" +
        props.oneRoom.userBId +
        "/" +
        props.oneRoom.id +
        "/" +
        props.oneRoom.liveroomCode
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

            <div className={`${liveSlotStyle.redDot}`}>1</div>
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
              console.log("zzz");
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
