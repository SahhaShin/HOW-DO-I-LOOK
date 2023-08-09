import { useState,useEffect } from 'react';

//css
import closetSlotStyle from "./CLOSETSlot.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action,changeModalOpen, changeMode, changeClothesId, changeClothesLink} from "../../../store/ClosetSlice";

// alert창
import Swal from "sweetalert2";

//closet 옷장 슬롯 1개 -> closet page에서 map돌려서 여러 개 뜨는 구조임
const CLOSETSlot = (props) => {

    console.log(props.one);

    //부모(Closet)에서 준 props에는 one으로 clothesId와 photoLink가 있음

    
    //redux 관리
    let state = useSelector((state:any)=>state.closet);
    let dispatch = useDispatch();
    // console.log(state.clothesTop[props.idx].photoLink);

    // 마우스 hover시 정보/수정/삭제 버튼 등장 여부
    let [openMenu, setOpenMenu] = useState<boolean>(false);

    // 정보 보기/수정 버튼을 누르면 CLOSETRegist가 툴킷을 보고 참고한다.
    function sendInfo(){
        dispatch(action.getClothInfo(props.one.clothesId));
        dispatch(changeClothesId(props.one.clothesId));
    }

    //옷 삭제
    function deleteCloth(){

        Swal.fire({
            icon: "question",
            title: "삭제",
            text: `삭제 하시겠습니까??`,
            showCancelButton: true,
            confirmButtonText: "삭제",
            cancelButtonText: "취소",
            confirmButtonColor:'#4570F5',
            customClass: {
                confirmButton: closetSlotStyle.confirmButton, // 모듈화된 CSS 파일에 정의된 클래스 이름을 사용합니다.
                cancelButton: closetSlotStyle.cancelButton // 모듈화된 CSS 파일에 정의된 클래스 이름을 사용합니다.
              }
        }).then((res) => {
            if (res.isConfirmed) {
                dispatch(action.deleteClothInfo(props.one.clothesId));
                // 삭제 완료 알림창 띄우기
                Swal.fire({
                    icon: 'success',
                    title: '삭제 완료',
                    text: '옷이 성공적으로 삭제되었습니다.',
                    confirmButtonColor: '#4570F5',
                })
            }
            else{
                
            }
        });
        
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
                <button className={`${closetSlotStyle.btn}`} onClick={()=>{deleteCloth()}}>삭제</button>
            </div>:null}

            {openMenu?<div className={`${closetSlotStyle.bgColor2}`}></div>:null}
        </div>
    );
}

export default CLOSETSlot;