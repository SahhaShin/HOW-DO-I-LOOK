import React, { useState, useRef, useCallback } from 'react';
import {useParams, useNavigate} from 'react-router-dom';

//css
import liveMenuModalStyle from "./LiveMenuModal.module.css";

//redux
import { useSelector, useDispatch} from "react-redux"; 
import {action, changePick} from "../../../store/ClosetSlice";
import {action_feed, changePick_feed} from "../../../store/FeedSlice";
import {action_live, sendPickListChat, rearrangePickList, addPickList} from "../../../store/StreamingSlice";


// alert창
import Swal from "sweetalert2";


const LiveMenuModal = ()=>{

    //redux 관리
    let state_live = useSelector((state:any)=>state.streaming);
    
    let dispatch = useDispatch();

    const params = useParams();


    return(
        <div>

        </div>
    );
}

export default LiveMenuModal;