import React, { useRef, useEffect, useState } from "react";

// css
import coordiStyle from "./OOTDCoordi.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action} from "../../../store/ClosetSlice";

// 직접 만든 slider
import CLOSETSlider from "./CLOSETSlider";


//idx는 몇 번째 ootd 순서인가 1번인가 2번인가를 알려줌
const OOTDCoordi = (idx) => {

    //redux 관리
    let state = useSelector((state:any)=>state.closet);
    let dispatch = useDispatch();
   
    


    // ootd 저장
    interface slotIds{
        TOP:number,
        BOTTOM:number,
        SHOE:number,
        ACCESSORY1:number,
        ACCESSORY2:number,
        ACCESSORY3:number
    }

    let order = idx;
    let [TOP,setTOP] = useState<number|null>();
    let [BOTTOM,setBOTTOM] = useState<number|null>();
    let [SHOE,setSHOE] = useState<number|null>();
    let [ACCESSOTY1,setACCESSOTY1] = useState<number|null>();
    let [ACCESSOTY2,setACCESSOTY2] = useState<number|null>();
    let [ACCESSOTY3,setACCESSOTY3] = useState<number|null>();
    
    const userId:number = 1;

    function saveOOTD(){
        dispatch(action.OOTDSave(userId,order,clothesIds));
    }

    // 화면 단 : 이 부분은 백엔드에서 데이터 넘겨주면 map 형태로 다시 바꿀 것임
    return(
        // 전체
        <div className={`${coordiStyle.totalArea}`}>
            <div className={`${coordiStyle.oneCloset}`}>
                {/* 상의 하의 신발 */}
                <div className={`${coordiStyle.ootd}`}>

                    {/* 상의 */}
                    <div className={`${coordiStyle.carousal}`}>
                        <CLOSETSlider clothesType={"TOP"}/>
                    </div>


                    {/* 하의 */}
                    <div className={`${coordiStyle.carousal}`}>
                        <CLOSETSlider clothesType={"BOTTOM"}/>
                    </div>

                    {/* 신발 */}
                    <div className={`${coordiStyle.carousal}`}>
                        <CLOSETSlider clothesType={"SHOE"}/>
                    </div>
                
                </div>

                {/* 악세서리 3칸 */}
                <div className={`${coordiStyle.ootd_etc}`}>

                    {/* 악세서리1 */}
                    <div className={`${coordiStyle.carousal_etc}`}>
                        <CLOSETSlider clothesType={"ACCESSORY"}/>
                    </div>

                    {/* 악세서리2 */}
                    <div className={`${coordiStyle.carousal_etc}`}>
                        <CLOSETSlider clothesType={"ACCESSORY"}/>
                    </div>

                    {/* 악세서리3 */}
                    <div className={`${coordiStyle.carousal_etc}`}>
                        <CLOSETSlider clothesType={"ACCESSORY"}/>
                    </div>
                </div>
                
            </div>
            <div className={`${coordiStyle.btn} ${coordiStyle.btn__secondary}`}><p>저장</p></div>

        </div>
        
        
    );
}


export default OOTDCoordi;