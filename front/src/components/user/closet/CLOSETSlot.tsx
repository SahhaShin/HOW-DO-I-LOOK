import { useState,useEffect } from 'react';

//css
import closetSlotStyle from "./CLOSETSlot.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {changeModalOpen, changeMode} from "../../../store/ClosetSlice";

//closet 옷장 슬롯 1개 -> closet page에서 map돌려서 여러 개 뜨는 구조임
const CLOSETSlot = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.closet);
    let dispatch = useDispatch();

    // 마우스 hover시 정보/수정/삭제 버튼 등장 여부
    let [openMenu, setOpenMenu] = useState<boolean>(false);

    return(
        <div className={`${closetSlotStyle.slots}`} onMouseOver={()=>setOpenMenu(true)} onMouseOut={()=>setOpenMenu(false)}>
            <div className={`${closetSlotStyle.slot}`}>
                
            </div>
            {openMenu?<div className={`${closetSlotStyle.bgColor}`}>
                <button className={`${closetSlotStyle.btn}`} onClick={()=>{dispatch(changeMode(2));dispatch(changeModalOpen(true))}}>정보</button>
                <button className={`${closetSlotStyle.btn}`} onClick={()=>{dispatch(changeMode(3));dispatch(changeModalOpen(true))}}>수정</button>
                <button className={`${closetSlotStyle.btn}`}>삭제</button>
            </div>:null}
        </div>
    );
}

export default CLOSETSlot;