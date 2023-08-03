import { useState,useEffect } from 'react';

//css
import closetSlotStyle from "./CLOSETSlot.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action,changeModalOpen, changeMode, changeClothesId, changeClothesLink} from "../../../store/ClosetSlice";

//closet 옷장 슬롯 1개 -> closet page에서 map돌려서 여러 개 뜨는 구조임
const CLOSETSlot = (props) => {

    //부모(Closet)에서 준 props에는 one으로 clothesId와 photoLink가 있음

    
    //redux 관리
    let state = useSelector((state:any)=>state.closet);
    let dispatch = useDispatch();
    // console.log(state.clothesTop[props.idx].photoLink);

    // 마우스 hover시 정보/수정/삭제 버튼 등장 여부
    let [openMenu, setOpenMenu] = useState<boolean>(false);

    // 정보 보기/수정 버튼을 누르면 CLOSETRegist가 툴킷을 보고 참고한다.
    function sendInfo(){
        dispatch(changeClothesId(props.one.clothesId));
        dispatch(changeClothesLink(props.one.photoLink));
    }

    //옷 삭제
    function deleteCloth(){
        dispatch(action.deleteClothInfo(props.one.clothesId));
    }

    return(
        <div className={`${closetSlotStyle.slots}`} onMouseOver={()=>setOpenMenu(true)} onMouseOut={()=>setOpenMenu(false)}>

            {
                state.clothesTypeKo==="상의"?
                <div className={`${closetSlotStyle.slot}`}>
                    <img src={`${props.one.photoLink}`}/>
                </div> : null
            }

            {
                state.clothesTypeKo==="하의"?
                <div className={`${closetSlotStyle.slot}`}>
                    <img src={`${props.one.photoLink}`}/>
                </div> : null
            }

            {
                state.clothesTypeKo==="신발"?
                <div className={`${closetSlotStyle.slot}`}>
                    <img src={`${props.one.photoLink}`}/>
                </div> : null
            }

            {
                state.clothesTypeKo==="악세서리"?
                <div className={`${closetSlotStyle.slot}`}>
                    <img src={`${props.one.photoLink}`}/>
                </div> : null
            }

            {
                state.clothesTypeKo==="전체"?
                <div className={`${closetSlotStyle.slot}`}>
                    <img src={`${props.one.photoLink}`}/>
                </div> : null
            }
            
            {openMenu?<div className={`${closetSlotStyle.bgColor}`}>
                <button className={`${closetSlotStyle.btn}`} onClick={()=>{dispatch(changeMode(2));dispatch(changeModalOpen(true));sendInfo()}}>정보</button>
                <button className={`${closetSlotStyle.btn}`} onClick={()=>{dispatch(changeMode(3));dispatch(changeModalOpen(true));sendInfo()}}>수정</button>
                <button className={`${closetSlotStyle.btn}`}>삭제</button>
            </div>:null}

            {openMenu?<div className={`${closetSlotStyle.bgColor2}`}></div>:null}
        </div>
    );
}

export default CLOSETSlot;