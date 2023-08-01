import React, { useState } from 'react';

//css
import mypageMainStyle from "./MypageMain.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {changeFollowModalOpen, changeFollowMode, changeMypageMode} from "../../../store/MypageSlice";


const MypageMain = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.mypage);
    let dispatch = useDispatch();


    return(
        <div className={`${mypageMainStyle.total}`}>

            {/* 팔로워 팔로잉 피드 */}
            <div className={`${mypageMainStyle.followFeedInfo}`}>
                <div onClick={()=>{dispatch(changeFollowMode(1));dispatch(changeFollowModalOpen(true))}} className={`${mypageMainStyle.follower}`}>
                    <div>팔로워</div>
                    <div>1</div>
                </div>

                <div onClick={()=>{dispatch(changeFollowMode(2));dispatch(changeFollowModalOpen(true))}} className={`${mypageMainStyle.follow}`}>
                    <div>팔로잉</div>
                    <div>1</div>
                </div>

                <div className={`${mypageMainStyle.feed}`}>
                    <div>피드</div>
                    <div>10</div>
                </div>
            </div>

            {/* 4가지 반응 기록 */}
            <div className={`${mypageMainStyle.likes}`}>
                <div className={`${mypageMainStyle.Lovely}`}>
                    <div>Lovely</div>
                    <div>700</div>
                </div>

                <div className={`${mypageMainStyle.Natural}`}>
                    <div>Natural</div>
                    <div>500</div>
                </div>

                <div className={`${mypageMainStyle.Modern}`}>
                    <div>Modern</div>
                    <div>10</div>
                </div>

                <div className={`${mypageMainStyle.Sexy}`}>
                    <div>Sexy</div>
                    <div>10</div>
                </div>
            </div>

            {/* 뱃지 저장소 */}
            <div className={`${mypageMainStyle.badge}`}>
                <div className={`${mypageMainStyle.title}`}>BADGE</div>
                <div className={`${mypageMainStyle.badges}`}>
                    <div className={`${mypageMainStyle.LovelyBadge}`}>
                        <img src={process.env.PUBLIC_URL+`/img/badge/Lovely_colored.png`}/>
                        <div>Lovely Master</div>
                    </div>

                    <div className={`${mypageMainStyle.NaturalBadge}`}>
                        <img src={process.env.PUBLIC_URL+`/img/badge/Natural_Uncolored.png`}/>
                        <div>Natural Master</div>
                    </div>

                    <div className={`${mypageMainStyle.ModernBadge}`}>
                        <img src={process.env.PUBLIC_URL+`/img/badge/Modern_Uncolored.png`}/>
                        <div>Modern Master</div>
                    </div>

                    <div className={`${mypageMainStyle.SexyBadge}`}>
                        <img src={process.env.PUBLIC_URL+`/img/badge/Sexy_colored.png`}/>
                        <div>Sexy Master</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MypageMain;