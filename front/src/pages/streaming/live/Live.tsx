import React, { useState, useRef, useCallback, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';

//redux
import { useSelector, useDispatch} from "react-redux"; 
import {action_live, changeExitAlam, changeExitRoomNo,changeExitLiveByUser, setKickUser, changeMenuModalOpen, changeScoreModalOpen} from "../../../store/StreamingSlice";

//css
import liveStyle from "./Live.module.css";

// 컴포넌트
import LiveMenu from '../../../components/streaming/live/LiveMenu';
import LiveChat from '../../../components/streaming/live/LiveChat';
import LiveAdvisor from '../../../components/streaming/live/LiveAdvisor';
import Streaming from "../../../components/streaming/live/Streaming.jsx"
import LiveMenuModal from '../../../components/streaming/live/LiveMenuModal';
import LiveScoreModal from '../../../components/streaming/live/LiveScoreModal';


// alert창
import Swal from "sweetalert2";


const Live = () => {
    //redux 관리
    let state_live = useSelector((state:any)=>state.streaming);
    let dispatch = useDispatch();

    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

    const params = useParams();

    const loginId = String(loginUser.id);
    const hostId = params.hostId;

    const navigate = useNavigate();


    useEffect(()=>{
        if(state_live.areYouKick){
            dispatch(setKickUser(null));
            // navigate("/liveList");
            window.location.href = `${process.env.REACT_APP_FRONT}/livelist`;
            Swal.fire({
                icon: 'info',
                title: '강퇴',
                text: '라이브에서 강퇴당하셨습니다.',
                confirmButtonColor: '#EAA595',
            })

        }

    },[state_live.areYouKick])


    //호스트가 라이브 종료 시 리스트로 이동
    // 리스트에서 라이브 리스트 다시 부르고, 알럴트 띄워주기
    useEffect(()=>{
        if(state_live.liveEndAlert){
            // 리스트 페이지로 이동
            window.location.href = `${process.env.REACT_APP_FRONT}/livelist`;
            // navigate("/liveList");
        }
    },[state_live.liveEndAlert])


    // 방장이 아닌 사람이 라이브를 나감
    useEffect(()=>{
        if(state_live.exitAlam){
            //초기화
            dispatch(changeExitLiveByUser(false));
            dispatch(changeExitRoomNo(null));
            dispatch(changeExitAlam(false));

            // 리스트 페이지로 이동
            window.location.href = `${process.env.REACT_APP_FRONT}/livelist`;
            // navigate("/liveList");
        }
    },[state_live.exitAlam])
    return(
        <div className={`${liveStyle.Wrapper}`}>
            {
                // 사용자 클릭 시 메뉴 모달
                String(state_live.selectAdvisor?.id)!==String(loginUser.id)&&state_live.menuModalOpen?
                <div className={`${liveStyle.menuModal}`}><LiveMenuModal/></div>:null
            }

            {
                // 메뉴 중 점수 주기 클릭 시
                loginId===hostId&&state_live.scoreModalOpen?<div className={`${liveStyle.menuModal}`}><LiveScoreModal/></div>:null
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

            {/* 라이브블러 */}
            <div onClick={async()=>{dispatch(changeScoreModalOpen(false));dispatch(changeMenuModalOpen(false));}} style={String(state_live.selectAdvisor?.id)!==String(loginUser.id)&&((state_live.menuModalOpen)||(state_live.scoreModalOpen))?{position:"absolute",zIndex:"9",width:"100%", height:"797px", backgroundColor:"black", opacity:"0.6", marginTop:"-700px"}:null}></div>
        </div>
    );
}

export default Live;