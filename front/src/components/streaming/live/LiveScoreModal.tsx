import React, { useState, useRef, useCallback } from 'react';
import {useParams, useNavigate} from 'react-router-dom';

//css
import liveScoreModalStyle from "./LiveScoreModal.module.css";

//redux
import { useSelector, useDispatch} from "react-redux"; 
import {action_live, changeScoreModalOpen, changeOtherClosetOpen} from "../../../store/StreamingSlice";

// alert창
import Swal from "sweetalert2";

const LiveScoreModal = ()=>{

    //redux 관리
    let state_live = useSelector((state:any)=>state.streaming);
    
    let dispatch = useDispatch();

    const params = useParams();

    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

    const [pick, setPick] = useState(null);

    return(
        <div className={`${liveScoreModalStyle.modal}`}>
            
            <p><img onClick={()=>{dispatch(changeScoreModalOpen(false))}} className={`${liveScoreModalStyle.closeBtn}`} src={process.env.PUBLIC_URL + '/img/feed/closeBtn.png'} /></p>
            
            <p>{loginUser.nickname}님 어떤 마스터 점수를 주시겠어요?</p>
            
            <div onClick={()=>setPick("LOVELY")} className={`${liveScoreModalStyle.Wrapper}`}>
                <div className={`${liveScoreModalStyle.select}`}>
                    {pick==="LOVELY"?<div className={`${liveScoreModalStyle.pick}`}>PICK!</div>:null}
                    <img src={process.env.PUBLIC_URL + '/img/badge/Lovely_colored.png'}/>
                    <div>Lovely<br/>Master</div>
                </div>

                <div onClick={()=>setPick("NATURAL")} className={`${liveScoreModalStyle.select}`}>
                    {pick==="NATURAL"?<div className={`${liveScoreModalStyle.pick}`}>PICK!</div>:null}
                    <img src={process.env.PUBLIC_URL + '/img/badge/Natural_colored.png'}/>
                    <div>Natural<br/>Master</div>
                </div>

                <div onClick={()=>setPick("MODERN")} className={`${liveScoreModalStyle.select}`}>
                    {pick==="MODERN"?<div className={`${liveScoreModalStyle.pick}`}>PICK!</div>:null}
                    <img src={process.env.PUBLIC_URL + '/img/badge/Modern_colored.png'}/>
                    <div>Modern<br/>Master</div>
                </div>

                <div onClick={()=>setPick("SEXY")} className={`${liveScoreModalStyle.select}`}>
                    {pick==="SEXY"?<div className={`${liveScoreModalStyle.pick}`}>PICK!</div>:null}
                    <img src={process.env.PUBLIC_URL + '/img/badge/Sexy_colored.png'}/>
                    <div>Sexy<br/>Master</div>
                </div>
            </div>

            <div className={`${liveScoreModalStyle.scoreInput}`}><input type="number" min="-5" max="5"  maxlength="1" placeholder='-5 ~ 5점 사이로 가능합니다.'/></div>
        
            <div className={`${liveScoreModalStyle.btns}`}>
                <button>점수주기</button>
                <button onClick={()=>{dispatch(changeScoreModalOpen(false))}}>취소</button>
            </div>
        </div>
    );
}

export default LiveScoreModal;