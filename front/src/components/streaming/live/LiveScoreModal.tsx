import React, { useState, useRef, useCallback, useDebugValue, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';

//css
import liveScoreModalStyle from "./LiveScoreModal.module.css";

//redux
import { useSelector, useDispatch} from "react-redux"; 
import {action_live, changeScoreModalOpen, changepPickBadge} from "../../../store/StreamingSlice";

// alert창
import Swal from "sweetalert2";

const LiveScoreModal = ()=>{

    //redux 관리
    let state_live = useSelector((state:any)=>state.streaming);
    
    let dispatch = useDispatch();

    const params = useParams();

    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

    const [score, setScore] = useState(0);

    const roomId = params.roomId;

    //뱃지 선택 체크
    function badgePick(type){
        dispatch(changepPickBadge(type));
    }

    // 점수 체크
    function scoreCheck(e){
        if(e.target.value>=-5 && e.target.value<=5) setScore(e.target.value);
        else{
            Swal.fire({
                icon: 'warning',
                title: '제한 점수를 맞춰주세요!',
                text: '-5 ~ 5점까지 점수를 주실 수 있습니다 :)',
                confirmButtonColor: '#4570F5',
                customClass: {
                    container: 'custom-swal-container', // 여기서 'custom-swal-container'는 사용자가 정의한 CSS 클래스 이름입니다.
                    confirmButton: 'custom-swal-confirm-button', // 사용자 정의 버튼 클래스
                },
              })
        }
    }

    

    return(
        <div className={`${liveScoreModalStyle.modal}`}>
            
            <p><img onClick={()=>{dispatch(changeScoreModalOpen(false))}} className={`${liveScoreModalStyle.closeBtn}`} src={process.env.PUBLIC_URL + '/img/feed/closeBtn.png'} /></p>
            
            <p>{loginUser.nickname}님 어떤 마스터 점수를 주시겠어요?</p>
            
            <div className={`${liveScoreModalStyle.Wrapper}`}>

                <div onClick={()=>{badgePick("LOVELY")}} className={`${liveScoreModalStyle.select}`}>
                    {state_live.pickBadge==="LOVELY"?<div className={`${liveScoreModalStyle.pick}`}>PICK!</div>:null}
                    <img src={process.env.PUBLIC_URL + '/img/badge/Lovely_colored.png'}/>
                    <div>Lovely<br/>Master</div>
                </div>

                <div onClick={()=>{badgePick("NATURAL")}} className={`${liveScoreModalStyle.select}`}>
                    {state_live.pickBadge==="NATURAL"?<div className={`${liveScoreModalStyle.pick}`}>PICK!</div>:null}
                    <img src={process.env.PUBLIC_URL + '/img/badge/Natural_colored.png'}/>
                    <div>Natural<br/>Master</div>
                </div>

                <div onClick={()=>{badgePick("MODERN")}} className={`${liveScoreModalStyle.select}`}>
                    {state_live.pickBadge==="MODERN"?<div className={`${liveScoreModalStyle.pick}`}>PICK!</div>:null}
                    <img src={process.env.PUBLIC_URL + '/img/badge/Modern_colored.png'}/>
                    <div>Modern<br/>Master</div>
                </div>

                <div onClick={()=>badgePick("SEXY")} className={`${liveScoreModalStyle.select}`}>
                    {state_live.pickBadge==="SEXY"?<div className={`${liveScoreModalStyle.pick}`}>PICK!</div>:null}
                    <img src={process.env.PUBLIC_URL + '/img/badge/Sexy_colored.png'}/>
                    <div>Sexy<br/>Master</div>
                </div>
            </div>

            <div className={`${liveScoreModalStyle.scoreInput}`}><input type="number" min="-5" max="5" onChange={(e)=>{scoreCheck(e)}} value={score} placeholder='-5 ~ 5점 사이로 가능합니다.'/></div>
        
            <div className={`${liveScoreModalStyle.btns}`}>
                <button onClick={()=>{dispatch(action_live.giveScore({targetUserId:state_live.selectAdvisor.id, roomId:roomId, type:state_live.pickBadge, score:score}))}}>점수주기</button>
                <button onClick={()=>{dispatch(changeScoreModalOpen(false))}}>취소</button>
            </div>
        </div>
    );
}

export default LiveScoreModal;