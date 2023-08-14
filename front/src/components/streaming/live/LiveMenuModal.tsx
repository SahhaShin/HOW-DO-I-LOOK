import React, { useState, useRef, useCallback } from 'react';
import {useParams, useNavigate} from 'react-router-dom';

//css
import liveMenuModalStyle from "./LiveMenuModal.module.css";

//redux
import { useSelector, useDispatch} from "react-redux"; 
import {action, changePick} from "../../../store/ClosetSlice";
import {action_live, changeScoreModalOpen, changeMenuModalOpen, changeOtherClosetOpen} from "../../../store/StreamingSlice";

// alert창
import Swal from "sweetalert2";



const LiveMenuModal = ()=>{
    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

    //redux 관리
    let state_live = useSelector((state:any)=>state.streaming);
    
    let dispatch = useDispatch();

    const params = useParams();


    return(
        <div className={`${liveMenuModalStyle.modal}`}>
            
            <p><img onClick={()=>{dispatch(changeMenuModalOpen(false))}} className={`${liveMenuModalStyle.closeBtn}`} src={process.env.PUBLIC_URL + '/img/feed/closeBtn.png'} /></p>
            
            <p>{loginUser.nickname}님 메뉴를 선택해주세요!</p>
            
            <div onClick={()=>{dispatch(action.getClothesListByType({clothesType:"ALL", userId:state_live.selectAdvisor, pageNum:10})); dispatch(changeOtherClosetOpen(true));dispatch(changeMenuModalOpen(false))}} className={`${liveMenuModalStyle.menu}`}>
                <div><img src={process.env.PUBLIC_URL + '/img/live/laundry.png'}/></div>
                <div>옷장보기</div>
            </div>

            <div onClick={()=>{dispatch(changeMenuModalOpen(false));dispatch(changeScoreModalOpen(true))}} className={`${liveMenuModalStyle.menu}`}>
                <div><img src={process.env.PUBLIC_URL + '/img/badge/Modern_colored.png'}/></div>
                <div>점수주기</div>
            </div>

            <div className={`${liveMenuModalStyle.menu}`}>
                <div><img src={process.env.PUBLIC_URL + '/img/live/like.png'}/></div>
                <div>팔로잉</div>
            </div>

            <div className={`${liveMenuModalStyle.menu}`}>
                <div><img src={process.env.PUBLIC_URL + '/img/live/ban-user.png'}/></div>
                <div>블랙리스트</div>
            </div>

            <div className={`${liveMenuModalStyle.menu}`}>
                <div><img src={process.env.PUBLIC_URL + '/img/live/exit.png'}/></div>
                <div>강퇴하기</div>
            </div>
        </div>
    );
}

export default LiveMenuModal;