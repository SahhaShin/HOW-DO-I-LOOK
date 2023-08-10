import React, { useState, useEffect } from "react";

//css
import mypageBadgeModalStyle  from "./MypageBadgeModal.module.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  action_mypage,
  changeBadgeUpdateModalOpen,
} from "../../../store/MypageSlice";


const MypageBadgeModal = ()=>{

    let state = useSelector((state: any) => state.mypage);
    let dispatch = useDispatch();

    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

    const [pick, setPick] = useState("");

    console.log(pick);

    const showBadgeList = () => {
        return state.badgeList.map((badge, index) => {
          if (badge.badgeType === "LOVELY") {
            return (
              <div key={index} className={`${mypageBadgeModalStyle.LovelyBadge}`} onClick={()=>setPick("LOVELY")}
                style={pick==="LOVELY"?{border:"3px solid pink", height:"110px"}:null}
              >
                <img src={process.env.PUBLIC_URL + `/img/badge/Lovely_colored.png`} />
                <div className={`${mypageBadgeModalStyle.badgeName}`}>Lovely Master</div>
              </div>
            );
          } else if (badge.badgeType === "SEXY") {
            return (
              <div key={index} className={`${mypageBadgeModalStyle.SexyBadge}`} onClick={()=>setPick("SEXY")}
                style={pick==="SEXY"?{border:"3px solid pink", height:"110px"}:null}
              >
                <img src={process.env.PUBLIC_URL + `/img/badge/Sexy_colored.png`} />
                <div className={`${mypageBadgeModalStyle.badgeName}`}>Sexy Master</div>
              </div>
            );
          } else if (badge.badgeType === "MODERN") {
            return (
              <div key={index} className={`${mypageBadgeModalStyle.ModernBadge}`} onClick={()=>setPick("MODERN")}
                style={pick==="MODERN"?{border:"3px solid pink", height:"110px"}:null}
              >
                <img src={process.env.PUBLIC_URL + `/img/badge/Modern_colored.png`} />
                <div className={`${mypageBadgeModalStyle.badgeName}`}>Modern Master</div>
              </div>
            );
          } else if (badge.badgeType === "NATURAL") {
            return (
              <div key={index} className={`${mypageBadgeModalStyle.NaturalBadge}`} onClick={()=>setPick("NATURAL")}
                style={pick==="NATURAL"?{border:"3px solid pink", height:"110px"}:null}
              >
                <img src={process.env.PUBLIC_URL + `/img/badge/Natural_colored.png`} />
                <div className={`${mypageBadgeModalStyle.badgeName}`}>Natural Master</div>
              </div>
            );
          }
          // 아무 뱃지도 해당하지 않을 때 처리
          return null;
        });
      };

    return(
        <div className={`${mypageBadgeModalStyle.modal}`}>
            <div className={`${mypageBadgeModalStyle.statement}`}>
                <p>{loginUser.nickname}님 어떤 뱃지로 바꾸시겠습니까?</p>
            </div>

            <div className={`${mypageBadgeModalStyle.badgeList}`}>
                <div className={`${mypageBadgeModalStyle.title}`}>보유 뱃지 리스트</div>
                <div className={`${mypageBadgeModalStyle.badges}`}>{showBadgeList()}</div>
            </div>

            <div className={`${mypageBadgeModalStyle.btns}`}>
                <button onClick={()=>dispatch(changeBadgeUpdateModalOpen(false))}>취소</button>
                <button onClick={()=>dispatch(action_mypage.updateBadge({id:loginUser.id,badge:pick}))}>교체</button>
            </div>
        </div>
    );
}


export default MypageBadgeModal;