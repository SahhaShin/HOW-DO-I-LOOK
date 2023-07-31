import React, { useState } from 'react';

//css
import mypageFeedStyle from "./MypageFeed.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {changeFollowModalOpen, changeFollowMode, changeMypageMode} from "../../../store/MypageSlice";

//컴포넌트
import MypageFeedMenu from "./MypageFeedMenu";

const MypageFeed = () => {


    return(
        <div className={`${mypageFeedStyle.total}`}>
            {/* 타이틀 */}
            <div className={`${mypageFeedStyle.title}`}>Feed</div>

            {/* 두가지 버튼 : my reaction */}
            <div className={`${mypageFeedStyle.btns}`}>
                <MypageFeedMenu/>
            </div>

            {/* 피드 리스트 */}
            <div></div>
        </div>
    );
}

export default MypageFeed;