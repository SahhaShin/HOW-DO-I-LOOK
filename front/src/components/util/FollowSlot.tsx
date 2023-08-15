import React, { useState, useEffect } from 'react';
import followSlotStyle from './FollowSlot.module.css';

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action_follow} from "../../store/FollowSlice";

const FollowSlot = (props) => {
    console.log(props)

    const loginUser = JSON.parse(window.sessionStorage.getItem("loginUser"));

    // 성별
    function genderColor(gender){
        if(gender==="FEMALE"){
            return `${followSlotStyle.profileImgF}`
        }else{
            return `${followSlotStyle.profileImgM}`
        }
    }

    return(
        <div>
            <div className={`${followSlotStyle.line}`} style={{borderRadius:"1rem"}}>
                {/* 왼쪽 : 프로필 사진 */}
                <div className={`${followSlotStyle.profile}`}>
                    <div className={`${followSlotStyle.profileCircle_G}`}>
                        <img src={props.one.profileImg}></img>
                    </div>
                    
                </div>
                {/* 중앙 */}
                <div className={`${followSlotStyle.content}`}>
                    {/* 닉네임*/}
                    <div>
                        <p>{props.one.nickname}</p>
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

export default FollowSlot;