import { useState } from 'react';

//css
import closetSlotStyle from "./CLOSETSlot.module.css";

const CLOSETSlot = () => {

    // 더미 데이터 -> 상의들, 하의들 등 요청하면 여기에 이미지 주소를 담아 map 돌림
    const [clothes, setClothes] = useState<string[]>([]);
    let [openMenu, setOpenMenu] = useState<boolean>(false);

    return(
        <div className={`${closetSlotStyle.slots}`} onMouseOver={()=>setOpenMenu(true)} onMouseOut={()=>setOpenMenu(false)}>
            <div className={`${closetSlotStyle.slot}`}></div>
            {openMenu?<div className={`${closetSlotStyle.bgColor}`}>
                <button className={`${closetSlotStyle.btn}`}>정보</button>
                <button className={`${closetSlotStyle.btn}`}>수정</button>
                <button className={`${closetSlotStyle.btn}`}>삭제</button>
            </div>:null}
        </div>
    );
}

export default CLOSETSlot;