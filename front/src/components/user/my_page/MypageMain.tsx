import React, { useState } from 'react';

//css
import mypageMainStyle from "./MypageMain.module.css";

const MypageMain = () => {
    return(
        <div className={`${mypageMainStyle.total}`}>
            {/* 타이틀 */}
            <div className={`${mypageMainStyle.title}`}>
                MYPAGE
            </div>

            {/* 프로필 사진 & 뱃지 사진 & 닉네임 */}
            <div className={`${mypageMainStyle.userInfo}`}>
                <div>
                    <div className={`${mypageMainStyle.profile}`}></div>
                    <div className={`${mypageMainStyle.profile_badge}`}>
                        <img src={process.env.PUBLIC_URL+`/img/badge/Lovely_colored.png`}/>
                    </div>
                </div>

                <div className={`${mypageMainStyle.nickname}`}>미팅만 50번</div>
                
            </div>

            {/* 버튼 2~3개 */}
            <div className={`${mypageMainStyle.btns}`}>
                <button>팔로우</button>
                <button>대화</button>
            </div>

            {/* 팔로워 팔로우 피드 */}
            <div className={`${mypageMainStyle.followFeedInfo}`}>
                <div className={`${mypageMainStyle.follower}`}>
                    <div>팔로워</div>
                    <div>1</div>
                </div>

                <div className={`${mypageMainStyle.follow}`}>
                    <div>팔로우</div>
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