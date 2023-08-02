import React, { useEffect, useState } from "react";

//css
import closetStyle from "./Closet.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action, changeModalOpen,changeMode} from "../../../store/ClosetSlice";

//컴포넌트
import OOTDWeather from "../../../components/user/closet/OOTDWeather";
import OOTDCoordi from "../../../components/user/closet/OOTDCoordi";
import CLOSETMenu from "../../../components/user/closet/CLOSETMenu";
import CLOSETSlot from "../../../components/user/closet/CLOSETSlot";
import Pagination from "../../../components/util/Pagination";
import CLOSETRegist from "../../../components/user/closet/CLOSETRegist";




const Closet = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.closet);
    let dispatch = useDispatch();

    // 페이지네이션, 옷 관리
    let clothesListType = state.clothesListByType?.length;
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(state.page);
    const offset = (page - 1) * limit;

    //상의 하의 신발 악세서리 전체에 따른 옷 요청을 위한 변수들
    let selectType = {
        clothesType: state.clothesTypeEn,
        pageNum : 0,
        userId:1,
    }

    // 화면 초기값 백엔드(api)에 요청
    useEffect(()=>{
        
        // closet 영역 초기 셋팅은 top
        dispatch(action.getClothesListByType(selectType));

        //ootd에서 상의 하의 신발 악세서리 3개 부분 보여줌
        dispatch(action.getClothesListByType({
            clothesType: "TOP",
            pageNum : 0,
            userId:1,
        }));

        dispatch(action.getClothesListByType({
            clothesType: "BOTTOM",
            pageNum : 0,
            userId:1,
        }));

        dispatch(action.getClothesListByType({
            clothesType: "SHOE",
            pageNum : 0,
            userId:1,
        }));

        dispatch(action.getClothesListByType({
            clothesType: "ACCESSORY",
            pageNum : 0,
            userId:1,
        }));

        dispatch(action.getClothesListByType({
            clothesType: "ALL",
            pageNum : 0,
            userId:1,
        }));
        // dispatch(action.getOOTDList(init.userId));
        // console.log("getOOTDList load");
    },[])


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
                            {
                                state.clothesListByType.length!==0?
                                state.clothesListByType.map(()=>{
                                    <CLOSETSlot/>
                                }):
                                <div className={`${closetStyle.noItem}`}>추가된 {state.clothesTypeKo} 이미지가 없습니다.</div>
                            }
                        </div>

                        {/* 페이지네이션 20을 {clothes.length}로 바꿔야 함 */}
                        <div className={`${closetStyle.paginationContainer}`}>
                            {clothesListType!==0?<Pagination
                                total={clothesListType}
                                limit={limit}
                                page={page}
                                setPage={setPage}
                            />:null}
                        </div>
                        
                        <div className={`${closetStyle.title}`}>OOTD</div>

                        <OOTDWeather/>
                        
                        <div className={`${closetStyle.closetContainer}`}>
                            <div className={`${closetStyle.closet}`}><OOTDCoordi idx={1} /></div>
                            <div className={`${closetStyle.closet}`}><OOTDCoordi idx={2}/></div>
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