import React, { useState, useRef, useCallback, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';

//css
import liveAdvisorStyle from "./LiveAdvisor.module.css";

//redux
import { useSelector, useDispatch} from "react-redux"; 
import {action_live} from "../../../store/StreamingSlice";


const LiveAdvisor = () => {

    //redux 관리
    let state_closet = useSelector((state:any)=>state.closet);
    let state_feed = useSelector((state:any)=>state.feed);
    let state_live = useSelector((state:any)=>state.streaming);
    
    let dispatch = useDispatch();

    const params = useParams();

    let [advisor, setAdvisor] = useState<number[]>([1,2,3,4]);

    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
    const userId = String(loginUser.id);
    const roomId = params.roomId; 

    useEffect(()=>{
        dispatch(action_live.peopleList({userId:userId, roomId:roomId}));
    },[])
    
    return(
        <div className={`${liveAdvisorStyle.total}`}>
            {
                advisor.map(()=>{
                    return(
                        <div className={`${liveAdvisorStyle.onePeople}`}>
                            <div className={`${liveAdvisorStyle.profileImg}`}></div>
                            
                            <div className={`${liveAdvisorStyle.badge}`}></div>
                            <div className={`${liveAdvisorStyle.nickname}`}>
                                미팅만 50번
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default LiveAdvisor;