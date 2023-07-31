import React, { useState } from 'react';

//css
import mypageFeedSlotStyle from "./MypageFeedSlot.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {changeDetailModalOpen} from "../../../store/FeedSlice";

const MypageSlot = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.mypage);
    let dispatch = useDispatch();

    // hover 시 상세보기 오픈
    let [openMenu, setOpenMenu] = useState<boolean>(false);


    return(
        <div className={`${mypageFeedSlotStyle.feedSlot}`} onMouseOver={()=>setOpenMenu(true)} onMouseOut={()=>setOpenMenu(false)}>
            <div className={`${mypageFeedSlotStyle.onefeed}`}>
                                    
            </div>

            {openMenu?<div className={`${mypageFeedSlotStyle.bgColor}`}>
                <button className={`${mypageFeedSlotStyle.btn}`} onClick={()=>{dispatch(changeDetailModalOpen(true))}}>상세보기</button>
            </div>:null}
        </div>
    );
}

export default MypageSlot;