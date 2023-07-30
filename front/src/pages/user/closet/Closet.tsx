import React, { useEffect, useState } from "react";

//css
import closetStyle from "./Closet.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {changeModalOpen,changeMode} from "../../../store/ClosetSlice";

//컴포넌트
import OOTDWeather from "../../../components/user/closet/OotdWeather";
import OOTDCoordi from "../../../components/user/closet/OotdCoordi";
import CLOSETMenu from "../../../components/user/closet/ClosetMenu";
import CLOSETSlot from "../../../components/user/closet/ClosetSlot";
import Pagination from "../../../components/util/Pagination";
import CLOSETRegist from "../../../components/user/closet/ClosetRegist";




const Closet = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.closet);
    let dispatch = useDispatch();

    // 페이지네이션, 옷 관리
    const [clothes, setPosts] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;


    return(
        <>
            <div className={`${closetStyle.total}`}>
                <div className={`${closetStyle.header}`}>header</div>
                
                <div className={`${closetStyle.main}`}>
                    
                    {/* 메인은 두 영역으로 나뉨 */}
                    
                    <div className={`${closetStyle.menuArea}`}>
                        {/* floating menu start */}
                        menu area
                    </div>

                    {/* 메인 컨텐츠 시작 */}
                    <div className={`${closetStyle.contentsArea}`}>

                        <div className={`${closetStyle.title}`}>CLOSET</div>

                        
                        {/* 상의 하의 신발 악세서리 전체 */}
                        <CLOSETMenu/>

                        {/* 추가 버튼 */}
                        <div className={`${closetStyle.addBtnContainer}`}><button className={`${closetStyle.addBtn}`} onClick={()=>{dispatch(changeMode(1)); dispatch(changeModalOpen(true))}}>추가</button></div>

                        {/* 옷장 */}
                        <div className={`${closetStyle.closetList}`}>
                            <CLOSETSlot/>
                            <CLOSETSlot/>
                            <CLOSETSlot/>
                            <CLOSETSlot/>

                            <CLOSETSlot/>
                            <CLOSETSlot/>
                            <CLOSETSlot/>
                            <CLOSETSlot/>
                        </div>

                        {/* 페이지네이션   20을 {clothes.length}로 바꿔야 함 */}
                        <div className={`${closetStyle.paginationContainer}`}>
                            <Pagination
                                total={20}
                                limit={limit}
                                page={page}
                                setPage={setPage}
                            />
                        </div>
                        
                        <div className={`${closetStyle.title}`}>OOTD</div>

                        <OOTDWeather/>
                        
                        <div className={`${closetStyle.closetContainer}`}>
                            <div className={`${closetStyle.closet}`}><OOTDCoordi/></div>
                            <div className={`${closetStyle.closet}`}><OOTDCoordi/></div>
                        </div>
                        
                    </div>

                    <div className={`${closetStyle.menuArea}`}>
                        {/* floating menu start */}
                        빈공간
                    </div>
                </div>

                <div className={`${closetStyle.footer}`}>footer</div>

                
            </div>

            {/* 모달 영역 */}
            {state.modalOpen?<div className={`${closetStyle.createModal}`}><CLOSETRegist/></div>:null}
            <div onClick={async()=>{dispatch(changeModalOpen(false))}} style={state.modalOpen?{position:"absolute",zIndex:"9",width:"100%", height:"3000px", backgroundColor:"black", opacity:"0.6", marginTop:"-3000px"}:null}></div>
        
        </>
        
    );
}


export default Closet;