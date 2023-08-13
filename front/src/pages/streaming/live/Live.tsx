import React, { useState, useRef, useCallback } from 'react';

//redux
import { useSelector, useDispatch} from "react-redux"; 
import {action_live, changeMenuModalOpen} from "../../../store/StreamingSlice";

//css
import liveStyle from "./Live.module.css";

// 컴포넌트
import LiveMenu from '../../../components/streaming/live/LiveMenu';
import LiveChat from '../../../components/streaming/live/LiveChat';
import LiveAdvisor from '../../../components/streaming/live/LiveAdvisor';
import Streaming from "../../../components/streaming/live/Streaming"
import LiveMenuModal from '../../../components/streaming/live/LiveMenuModal';

const Live = () => {
    //redux 관리
    let state_live = useSelector((state:any)=>state.streaming);
    let dispatch = useDispatch();

    return(
        <div className={`${liveStyle.Wrapper}`}>
            {
                // 사용자 클릭 시 메뉴 모달
                state_live.menuModalOpen?<div className={`${liveStyle.menuModal}`}><LiveMenuModal/></div>:null
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
            <div onClick={async()=>{dispatch(changeMenuModalOpen(false));}} style={state_live.menuModalOpen?{position:"absolute",zIndex:"9",width:"100%", height:"10000px", backgroundColor:"black", opacity:"0.6", marginTop:"-10000px"}:null}></div>
        </div>
    );
}

export default Live;