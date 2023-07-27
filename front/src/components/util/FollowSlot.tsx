import React, { useState } from 'react';
import followSlotStyle from './FollowSlot.module.css';

const FollwSlot = () => {


    return(
        <div>
            <div className={`${followSlotStyle.line}`} style={{borderRadius:"1rem"}}>
                {/* 왼쪽 : 프로필 사진 */}
                <div className={`${followSlotStyle.profile}`}>
                    <div className={`${followSlotStyle.profileCircle_G}`}>
                        <img src={process.env.PUBLIC_URL+`/img/user/profileImg.png`}></img>
                    </div>
                    
                </div>
                {/* 중앙 */}
                <div className={`${followSlotStyle.content}`}>
                    {/* 닉네임*/}
                    <div>
                        <p>User3</p>
                    </div>
                </div>

                {/* 우측 : 대화, 라이브 버튼 */}
                <div className={`${followSlotStyle.enterBnt}`}>
                    <button>대화</button>
                    <button>라이브</button>    
                </div>
            </div>

        </div>
    );
}

export default FollwSlot;