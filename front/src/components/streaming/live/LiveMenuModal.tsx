import React, { useState, useRef, useCallback } from 'react';
import {useParams, useNavigate} from 'react-router-dom';

//css
import liveMenuModalStyle from "./LiveMenuModal.module.css";

//redux
import { useSelector, useDispatch} from "react-redux"; 
import {action} from "../../../store/ClosetSlice";
import {action_live,changeClosetOpenAndSendAdvisor, setKickUser, changeScoreModalOpen, changeMenuModalOpen, changeOtherClosetOpen} from "../../../store/StreamingSlice";
import {action_mypage} from "../../../store/MypageSlice";

// alert창
import Swal from "sweetalert2";



const LiveMenuModal = ()=>{
    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

    //redux 관리
    let state_live = useSelector((state:any)=>state.streaming);
    
    let dispatch = useDispatch();

    const params = useParams();

    const roomId = params.roomId;
    const hostId = params.hostId;

    const navigate = useNavigate();

    //팔로우 신청을 위한 폼
    const [followingData, setFollowingData] = useState({
        id: 0,
        targetId: 0,
        nickname:"",
        profileImg:""
    });

    // 팔로우 신청
    function registFollow(){
        setFollowingData({
            id:loginUser.id,
            targetId:state_live.selectAdvisor.id,
            nickname:state_live.selectAdvisor.nickname,
            profileImg:state_live.selectAdvisor.profileImg
        });
        dispatch(action_mypage.follow({
            id:loginUser.id,
            targetId:state_live.selectAdvisor.id,
            nickname:state_live.selectAdvisor.nickname,
            profileImg:state_live.selectAdvisor.profileImg
        }))
    }

    //블랙리스트 신청
    function registblackList(){
        setFollowingData({
            id:loginUser.id,
            targetId:state_live.selectAdvisor.id,
            nickname:state_live.selectAdvisor.nickname,
            profileImg:state_live.selectAdvisor.profileImg
        });
        dispatch(action_mypage.addBlackList({
            id:loginUser.id,
            targetId:state_live.selectAdvisor.id,
            nickname:state_live.selectAdvisor.nickname,
            profileImg:state_live.selectAdvisor.profileImg
        }))
    }

    // 1. 강퇴 유저 셋팅 > 나는 나가면 안되기 때문에 네비게이션 쓰면 안됨
    function kickInModal(){
        // dispatch(action_live.kickUser({userId:loginUser.id,roomId:roomId}));
        dispatch(setKickUser({userId:state_live.selectAdvisor.id, roomId:roomId}));
        console.log(`userId: ${state_live.selectAdvisor.id}, roomId: ${roomId}`);
    }



    return(
        <div className={`${liveMenuModalStyle.modal}`}>
            
            <p><img onClick={()=>{dispatch(changeMenuModalOpen(false))}} className={`${liveMenuModalStyle.closeBtn}`} src={process.env.PUBLIC_URL + '/img/feed/closeBtn.png'} /></p>
            
            <p>{loginUser.nickname}님 메뉴를 선택해주세요!</p>
            
            <div className={`${liveMenuModalStyle.menumiddle}`}>
                <div onClick={()=>{dispatch(changeClosetOpenAndSendAdvisor());dispatch(action.getClothesListByType({clothesType:"ALL", userId:state_live.selectAdvisor.id, pageNum:null})); dispatch(changeOtherClosetOpen(true));dispatch(changeMenuModalOpen(false))}} className={`${liveMenuModalStyle.menu}`}>
                    <div><img src={process.env.PUBLIC_URL + '/img/live/laundry.png'}/></div>
                    <div>옷장보기</div>
                </div>

                {hostId===String(loginUser.id)?<div onClick={()=>{dispatch(changeMenuModalOpen(false));dispatch(changeScoreModalOpen(true))}} className={`${liveMenuModalStyle.menu}`}>
                    <div><img src={process.env.PUBLIC_URL + '/img/badge/Modern_colored.png'}/></div>
                    <div>점수주기</div>
                </div>:null}

                <div onClick={()=>{registFollow()}} className={`${liveMenuModalStyle.menu}`}>
                    <div><img src={process.env.PUBLIC_URL + '/img/live/like.png'}/></div>
                    <div>팔로잉</div>
                </div>

                {hostId===String(loginUser.id)?<div onClick={()=>{registblackList(); kickInModal()}} className={`${liveMenuModalStyle.menu}`}>
                    <div><img src={process.env.PUBLIC_URL + '/img/live/ban-user.png'}/></div>
                    <div>블랙리스트</div>
                </div>:null}

                {hostId===String(loginUser.id)?<div onClick={()=>{kickInModal()}} className={`${liveMenuModalStyle.menu}`}>
                    <div><img src={process.env.PUBLIC_URL + '/img/live/exit.png'}/></div>
                    <div>강퇴하기</div>
                </div>:null}
            </div>
        </div>
    );
}

export default LiveMenuModal;