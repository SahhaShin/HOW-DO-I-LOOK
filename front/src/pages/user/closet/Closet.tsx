import React, { useEffect, useState } from "react";

//css
import closetStyle from "./Closet.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action, changeModalOpen,changeMode} from "../../../store/ClosetSlice";
import {changeMenuItemNum} from "../../../store/UtilSlice";

//param
import { useParams } from "react-router-dom";

//컴포넌트
import OOTDWeather from "../../../components/user/closet/OOTDWeather";
import OOTDCoordi from "../../../components/user/closet/OOTDCoordi";
import CLOSETMenu from "../../../components/user/closet/CLOSETMenu";
import CLOSETSlot from "../../../components/user/closet/CLOSETSlot";
import Pagination from "../../../components/user/closet/ClosetPagination";
import CLOSETRegist from "../../../components/user/closet/CLOSETRegist";
import Header from "../../../components/util/Header";
import Menu from "../../../components/util/Menu";
import Footer from "../../../components/util/Footer";


const Closet = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.closet);
    let dispatch = useDispatch();
    dispatch(changeMenuItemNum(4))

    //로그인 유저 정보
    const { id } = useParams();

    // 페이지네이션, 옷 관리
    let clothesListLen = state.clothesTop?.length;
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    useEffect(()=>{   
        if(state.clothesTypeKo==="상의"){
            clothesListLen = state.clothesTop?.length;
            setPage(clothesListLen);
        }else if(state.clothesTypeKo==="하의"){
            clothesListLen = state.clothesBottom?.length;
            setPage(clothesListLen);
        }else if(state.clothesTypeKo==="신발"){
            clothesListLen = state.clothesShoe?.length;
            setPage(clothesListLen);
        }else if(state.clothesTypeKo==="악세서리"){
            clothesListLen = state.clothesAccessory?.length;
            setPage(clothesListLen);
        }else if(state.clothesTypeKo==="전체"){
            clothesListLen = state.clothesAll?.length;
            setPage(clothesListLen);
        }
    },[])

    //상의 하의 신발 악세서리 전체에 따른 옷 요청을 위한 변수들
    let selectType = {
        clothesType: state.clothesTypeEn,
        pageNum : page,
        userId:id,
    }


    //초기 화면 OOTD를 위해 모든 분류의 옷 불러야함 (새로고침 시 재렌더링 될 때만)
    useEffect(()=>{
        
        dispatch(action.getClothesListByType({
            clothesType: "TOP",
            userId:id,
            pageNum : page,
        }));
        


       
        dispatch(action.getClothesListByType({
            clothesType: "BOTTOM",
            userId:id,
            pageNum : page,
        }));
        

        
        dispatch(action.getClothesListByType({
            clothesType: "SHOE",
            userId:id,
            pageNum : page,
        }));
        

 
        dispatch(action.getClothesListByType({
            clothesType: "ACCESSORY",
            userId:id,
            pageNum : page,
        }));
        

       
        dispatch(action.getClothesListByType({
            clothesType: "ALL",
            userId:id,
            pageNum : page,
        }));

        dispatch(action.OOTDList(id));
    
    },[state.clothRegistOk])


    // 메뉴 클릭 시 마다 새롭게 옷을 받아옴
    useEffect(()=>{
        if(state.clothesTypeKo==="상의"){
            dispatch(action.getClothesListByType({
                clothesType: "TOP",
                pageNum : state.page,
                userId:id,
            }));
        }


        else if(state.clothesTypeKo==="하의"){
            dispatch(action.getClothesListByType({
                clothesType: "BOTTOM",
                pageNum : state.page,
                userId:id,
            }));
        }

        else if(state.clothesTypeKo==="신발"){
            dispatch(action.getClothesListByType({
                clothesType: "SHOE",
                pageNum : state.page,
                userId:id,
            }));
        }

        else if(state.clothesTypeKo==="악세서리"){
            dispatch(action.getClothesListByType({
                clothesType: "ACCESSORY",
                pageNum : state.page,
                userId:id,
            }));
        }

        else if(state.clothesTypeKo==="전체"){
            dispatch(action.getClothesListByType({
                clothesType: "ALL",
                pageNum : state.page,
                userId:id,
            }));
        }

        setPage(state.page)
    },[state.clothesTypeEn, state.page])

    
  
    return(
        <>
            <div className={`${closetStyle.total}`}>
                <div className={`${closetStyle.header}`}>
                    <Header/>
                </div>
                
                <div className={`${closetStyle.main}`}>
                    
                    {/* 메인은 두 영역으로 나뉨 */}
                    
                    <div className={`${closetStyle.menuArea}`}>
                        {/* floating menu start */}
                        <div><Menu/></div>
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
                                state.clothesTypeKo==="상의" && state.clothesTop && state.clothesTop?.length!==0?
                                state.clothesTop?.map((one, idx)=>
                                    <CLOSETSlot key={idx} one={one}/>
                                ):
                                (state.clothesTypeKo==="하의" && state.clothesBottom && state.clothesBottom?.length!==0?state.clothesBottom?.map((one, idx)=>
                                    <CLOSETSlot key={idx} one={one}/>
                                ):(state.clothesTypeKo==="신발" && state.clothesShoe && state.clothesShoe?.length!==0?state.clothesShoe?.map((one, idx)=>
                                    <CLOSETSlot key={idx} one={one}/>
                                ):(state.clothesTypeKo==="악세서리" && state.clothesAccessory && state.clothesAccessory?.length!==0?state.clothesAccessory?.map((one, idx)=>
                                    <CLOSETSlot key={idx} one={one}/>
                                ):(state.clothesTypeKo==="전체" && state.clothesAll && state.clothesAll?.length!==0?state.clothesAll?.map((one,idx)=>
                                    <CLOSETSlot key={idx} one={one}/>
                                ):<div className={`${closetStyle.noItem}`}>추가된 {state.clothesTypeKo} 이미지가 없습니다.</div>))))

                            }   
                        </div>

                        {/* 페이지네이션 20을 {clothes.length}로 바꿔야 함 */}
                        <div className={`${closetStyle.paginationContainer}`}>
                            {clothesListLen!==0?<Pagination
                                totalPage={state.totalPage}
                                // limit={8}
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
                     
                    </div>
                </div>

                <div className={`${closetStyle.footer}`}><Footer/></div>

                
            </div>

            {/* 모달 영역 - 정보보기(slot에서 옷 아이디가 날아옴->모달정보로 쏴줌)*/}
            {state.modalOpen?<div className={`${closetStyle.createModal}`}><CLOSETRegist/></div>:null}
            <div onClick={async()=>{dispatch(changeModalOpen(false))}} style={state.modalOpen?{position:"absolute",zIndex:"9",width:"100%", height:"3000px", backgroundColor:"black", opacity:"0.6", marginTop:"-3000px"}:null}></div>
        
        </>
        
    );
}


export default Closet;