import React, { useState } from 'react';

//css
import mypageStyle from "./Mypage.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {changeFollowModalOpen} from "../../../store/MypageSlice";

//컴포넌트
import MypageMain from '../../../components/user/my_page/MypageMain';
import MypageFollowModal from '../../../components/user/my_page/MypageFollowModal';

const Mypage = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.mypage);
    let dispatch = useDispatch();

    return(
        <div className={`${mypageStyle.total}`}>
            
            {/* 헤더 */}
            <div className={`${mypageStyle.header}`}>헤더</div>

            {/* 메인 */}
            <div className={`${mypageStyle.main}`}>
                {/* 좌측 메뉴 */}
                <div className={`${mypageStyle.menuArea}`}></div>

                {/* 우측 마이페이지 컴포넌트 */}
                <div className={`${mypageStyle.mid}`}>
                    {/* 모달 */}
                    {state.followModalOpen?<div className={`${mypageStyle.followModal}`}><MypageFollowModal/></div>:null}
                    <MypageMain/>
                </div>
            </div>

            {/* 푸터 */}
            <div className={`${mypageStyle.footer}`}>푸터</div>

            {/* 모달 까만창 */}
            <div onClick={async()=>{dispatch(changeFollowModalOpen(false))}} style={state.followModalOpen?{position:"absolute",zIndex:"9",width:"100%", height:"3000px", backgroundColor:"black", opacity:"0.6", marginTop:"-3000px"}:null}></div>
        </div>
    );
}

export default Mypage;