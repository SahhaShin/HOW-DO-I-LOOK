import React, { useState, useEffect } from 'react';
import followSlotStyle from './FollowSlot.module.css';

//redux
import { useSelector, useDispatch } from "react-redux"; 
import { useNavigate } from 'react-router-dom';
import {action_follow} from "../../store/FollowSlice";

const FollowSlot = (props) => {

    const navigate = useNavigate();

    const loginUser = JSON.parse(window.sessionStorage.getItem("loginUser"));

    // 성별
    function genderSubRankColor(gender){
        console.log(gender)

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
                    {/* <div className={`${followSlotStyle.profileCircle_G}`}> */}
                    <div className={`${genderSubRankColor(props.one.gender)}`}>
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
                    <button onClick={
                        async() => {
                            navigate(`/closet/${props.one.id}`);
                        }
                    }>옷장</button>
                    <button onClick={
                        async() => {
                            navigate(`/mypage/${props.one.id}`);
                        }
                    }>프로필</button>    
                </div>
            </div>

        </div>
    );
}

export default FollowSlot;