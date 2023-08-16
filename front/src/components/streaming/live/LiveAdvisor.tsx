import React, { useState, useRef, useCallback, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';

//css
import liveAdvisorStyle from "./LiveAdvisor.module.css";

//redux
import { useSelector, useDispatch} from "react-redux"; 
import {action_live, changeMenuModalOpen, changeSelectAdvisor} from "../../../store/StreamingSlice";



const LiveAdvisor = () => {

    // 뱃지 선택
    function selectBadge(badge){
        if(badge==="LOVELY"){
            return process.env.PUBLIC_URL + '/img/badge/Lovely_colored.png';
        }
        
        else if(badge==="NATURAL"){
            return process.env.PUBLIC_URL + '/img/badge/Natural_colored.png';
        }

        else if(badge==="MODERN"){
            return process.env.PUBLIC_URL + '/img/badge/Natural_colored.png';
        }

        else if(badge==="SEXY"){
            return process.env.PUBLIC_URL + '/img/badge/Sexy_colored.png';
        }
    }


    // 성별
    function genderColor(gender){
        if(gender==="FEMALE"){
            return `${liveAdvisorStyle.profileImgF}`
        }else{
            return `${liveAdvisorStyle.profileImgM}`
        }
    }

    // 닉네임 색깔 > 뱃지
    function badgeColor(badge){
        if(badge==="X"){
            return `${liveAdvisorStyle.nickname_NO}`
        }

        else if(badge==="LOVELY"){
            return `${liveAdvisorStyle.nickname_LOVELY}`
        }

        else if(badge==="NATURAL"){
            return `${liveAdvisorStyle.nickname_NATURAL}`
        }

        else if(badge==="MODERN"){
            return `${liveAdvisorStyle.nickname_MODERN}`
        }

        else if(badge==="SEXY"){
            return `${liveAdvisorStyle.nickname_SEXY}`
        }
    }

    //redux 관리
    let state_closet = useSelector((state:any)=>state.closet);
    let state_feed = useSelector((state:any)=>state.feed);
    let state_live = useSelector((state:any)=>state.streaming);
    
    let dispatch = useDispatch();

    const params = useParams();

    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
    const userId = String(loginUser.id);
    const roomId = params.roomId; 

    // 처음에 유저 리스트를 가져와서 보여줌
    useEffect(()=>{
        dispatch(action_live.peopleList({userId:userId, roomId:roomId}));
        console.log(`길이가 바꼈나? ${state_live.roomPeopleList.length}`);
    },[state_live.roomPeopleList.length])

    const [advisor, setAdvisor] = useState({
        id: 0,
        nickname:"",
        profileImg:""
    });

    function sendAdvisor(userId,userNickname,userProfileImg){
        setAdvisor({
            id: userId,
            nickname:userNickname,
            profileImg:userProfileImg
        })

        dispatch(changeSelectAdvisor({
            id: userId,
            nickname:userNickname,
            profileImg:userProfileImg
        }));
        dispatch(changeMenuModalOpen(true));
        
    }

    console.log(state_live.roomPeopleList);
    
    return(
        <div className={`${liveAdvisorStyle.total}`}>
            {
                state_live.roomPeopleList?.map((user)=>{
                    return(
                        <div onClick={()=>{sendAdvisor(user.userId, user.userNickname, user.userProfileImg)}} className={`${liveAdvisorStyle.onePeople}`}>
                            <div className={`${genderColor(user.userGender)}`}>
                                <img src={user.userProfileImg}/>
                            </div>
                            
                            {user.userBadgeType!=="X"?
                                <div className={`${liveAdvisorStyle.badge}`}>
                                    <img src={`${selectBadge(user.userBadgeType)}`}/>
                                </div>:null}

                            <div className={`${badgeColor(user.userBadgeType)}`}>
                                {user.userNickname}
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default LiveAdvisor;