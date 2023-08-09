import { useState, useEffect } from "react";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action_ranking} from "../../../store/RankingSlice";

//css
import mypageMainStyle from "../../user/my_page/MypageMain.module.css";

const MyRank = () => {

    //redux 관리
    let state = useSelector((state: any) => state.rank);
    let state_mypage = useSelector((state: any) => state.mypage);
    let dispatch = useDispatch();

    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

    let type = "";

    if(state.rankMode === "lovely")
        type = "LOVELY"
    else if(state.rankMode === "sexy")
        type = "SEXY"
    else if(state.rankMode === "natural")
        type = "NATURAL"
    else if(state.rankMode === "modern")
        type = "MODERN"

    const loginUserId = loginUser.id;

    useEffect(() => {
        dispatch(action_ranking.getMyRank({type, loginUserId}));
    }, [])

    if(state.myRank.email === "") {
        return <div>Loading...</div>
    }

    const showBadgeList = () => {
        return state_mypage.badgeList.map((badge, index) => {
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
    }

    return(
        <div>
            <div>
                이미지 : <img src={loginUser.profileImg} /> <br></br>
                {loginUser.nickname}님의 랭킹 정보
            </div>
            <div>{type} Score : {state.myRank.score}위</div>
            <div>순위 : {state.myRank.rank}</div>
            <div>보유 뱃지 : </div>
            <div className={`${mypageMainStyle.badges}`}>
                {showBadgeList()}
            </div>
        </div>
    );
}

export default MyRank;