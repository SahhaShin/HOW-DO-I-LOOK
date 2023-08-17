import { useState, useEffect } from "react";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action_ranking} from "../../../store/RankingSlice";

//css
import myRankStyle from "./MyRank.module.css";

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
              <div key={index} className={`${myRankStyle.LovelyBadge}`} className={`${myRankStyle.badges}`}>
                <img src={process.env.PUBLIC_URL + `/img/badge/Lovely_colored.png`} />
              
              </div>
            );
          } else if (badge.badgeType === "SEXY") {
            return (
              <div key={index} className={`${myRankStyle.SexyBadge}`} className={`${myRankStyle.badges}`}>
                <img src={process.env.PUBLIC_URL + `/img/badge/Sexy_colored.png`} />
                
              </div>
            );
          } else if (badge.badgeType === "MODERN") {
            return (
              <div key={index} className={`${myRankStyle.ModernBadge}`} className={`${myRankStyle.badges}`}>
                <img src={process.env.PUBLIC_URL + `/img/badge/Modern_colored.png`} />
                
              </div>
            );
          } else if (badge.badgeType === "NATURAL") {
            return (
              <div key={index} className={`${myRankStyle.NaturalBadge}`} className={`${myRankStyle.badges}`}>
                <img src={process.env.PUBLIC_URL + `/img/badge/Natural_colored.png`} />
                
              </div>
            );
          }
          // 아무 뱃지도 해당하지 않을 때 처리
          return null;
        });
    }

    return(
        <div className={`${myRankStyle.myrankWrapper}`}>
            
            <div className={`${myRankStyle.rank}`}>{state.myRank.score}위</div>

            <div className={`${myRankStyle.profileImg}`}>
                <img src={loginUser.profileImg} /> <br></br>
            </div>

            <div>
              <div>보유 뱃지 : </div>
              <div className={`${myRankStyle.badgeWrapper}`}>
                  {showBadgeList()}
              </div>
            </div>
        </div>
    );
}

export default MyRank;