import React, { useState, useRef, useCallback } from 'react';
import {useParams, useNavigate} from 'react-router-dom';

//redux
import { useSelector, useDispatch} from "react-redux"; 
import {action_live, changeMenuModalOpen, changeScoreModalOpen} from "../../../store/StreamingSlice";

//css
import liveStyle from "./Live.module.css";

// 컴포넌트
import LiveMenu from '../../../components/streaming/live/LiveMenu';
import LiveChat from '../../../components/streaming/live/LiveChat';
import LiveAdvisor from '../../../components/streaming/live/LiveAdvisor';
import Streaming from "../../../components/streaming/live/Streaming.jsx"
import LiveMenuModal from '../../../components/streaming/live/LiveMenuModal';
import LiveScoreModal from '../../../components/streaming/live/LiveScoreModal';

const Live = () => {
    //redux 관리
    let state_live = useSelector((state:any)=>state.streaming);
    let dispatch = useDispatch();

    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

    const params = useParams();

    const loginId = String(loginUser.id);
    const hostId = params.hostId;

    return(
        <div className={`${liveStyle.Wrapper}`}>
            {
                // 사용자 클릭 시 메뉴 모달
                loginId===hostId&&state_live.menuModalOpen?<div className={`${liveStyle.menuModal}`}><LiveMenuModal/></div>:null
            }

            {
                // 메뉴 중 점수 주기 클릭 시
                state_live.scoreModalOpen?<div className={`${liveStyle.menuModal}`}><LiveScoreModal/></div>:null
            }

            <div className={`${liveStyle.total}`}>
                {/* 메인 스트리밍 영역 */}
                <div className={`${liveStyle.main}`}>
                    {/* 메뉴 */}
                    <div className={`${liveStyle.menu}`}>
                        <LiveMenu/>
                    </div>

                    {/* 스트리밍 영상 */}
                    <div className={`${liveStyle.video}`}>
                        <Streaming/>
                    </div>

                    {/* 채팅 */}
                    <div className={`${liveStyle.chat}`}>
                        <LiveChat/>
                    </div>
                </div>

                {/* 참여자 영역 */}
                <div className={`${liveStyle.advisor}`}>
                    <LiveAdvisor/>
                </div>
            </div>

            {/* 피드블러 */}
            <div onClick={async()=>{dispatch(changeScoreModalOpen(false));dispatch(changeMenuModalOpen(false));}} style={loginId===hostId&&((state_live.menuModalOpen)||(state_live.scoreModalOpen))?{position:"absolute",zIndex:"9",width:"100%", height:"10000px", backgroundColor:"black", opacity:"0.6", marginTop:"-10000px"}:null}></div>
        </div>
    );
}

export default Live;