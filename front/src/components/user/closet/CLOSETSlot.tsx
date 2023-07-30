import { useState } from 'react';

//css
import closetSlotStyle from "./CLOSETSlot.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {changeModalOpen, changeMode} from "../../../store/ClosetSlice";

const CLOSETSlot = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.closet);
    let dispatch = useDispatch();

    // 더미 데이터 -> 상의들, 하의들 등 요청하면 여기에 이미지 주소를 담아 map 돌림
    const [clothes, setClothes] = useState<string[]>([]);
    let [openMenu, setOpenMenu] = useState<boolean>(false);

    return(
        <div className={`${closetSlotStyle.slots}`} onMouseOver={()=>setOpenMenu(true)} onMouseOut={()=>setOpenMenu(false)}>
            <div className={`${closetSlotStyle.slot}`}></div>
            {openMenu?<div className={`${closetSlotStyle.bgColor}`}>
                <button className={`${closetSlotStyle.btn}`} onClick={()=>{dispatch(changeMode(2));dispatch(changeModalOpen(true))}}>정보</button>
                <button className={`${closetSlotStyle.btn}`} onClick={()=>{dispatch(changeMode(3));dispatch(changeModalOpen(true))}}>수정</button>
                <button className={`${closetSlotStyle.btn}`}>삭제</button>
            </div>:null}
        </div>
    );
}

export default CLOSETSlot;