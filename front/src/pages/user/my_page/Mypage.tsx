import React, { useState } from 'react';

//css
import mypageStyle from "./Mypage.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {changeFollowModalOpen} from "../../../store/MypageSlice";
import {changeDetailModalOpen} from "../../../store/FeedSlice";

//컴포넌트
import MypageHeader from '../../../components/user/my_page/MypageHeader';
import MypageMain from '../../../components/user/my_page/MypageMain';
import MypageFollowModal from '../../../components/user/my_page/MypageFollowModal';
import MypageFeed from '../../../components/user/my_page/MypageFeed';
import MypageManagement from '../../../components/user/my_page/MypageManagement';
import FeedDetail from '../../../components/sns/feed/FeedDetail';
import Header from "../../../components/util/Header";
import Menu from "../../../components/util/Menu";
import Footer from "../../../components/util/Footer";


const Mypage = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.mypage);
    let state_feed = useSelector((state:any)=>state.feed);
    let dispatch = useDispatch();

    return(
        <>
            {
                // 피드 상세보기 모달
                state_feed.detailModalOpen?<div className={`${mypageStyle.detailModal}`}><FeedDetail/></div>:null
            }

            <div className={`${mypageStyle.total}`}>
                
                {/* 헤더 */}
                <div className={`${mypageStyle.header}`}><Header/></div>

                {/* 메인 */}
                <div className={`${mypageStyle.main}`}>
                    {/* 좌측 메뉴 */}
                    <div className={`${mypageStyle.menuArea}`}><div><Menu/></div></div>

                    {/* 우측 마이페이지 컴포넌트 */}
                    <div className={`${mypageStyle.mid}`}>
                        {/* 모달 */}
                        {state.followModalOpen?<div className={`${mypageStyle.followModal}`}><MypageFollowModal/></div>:null}
                        
                        <MypageHeader/>
                        
                        
                        {
                            // 3개 메뉴 메인/피드/내정보
                            state.menuMode===1?<MypageMain/>:(state.menuMode===2?<MypageFeed/>:<MypageManagement/>)
                        }
                    </div>
                </div>

                {/* 푸터 */}
                <div className={`${mypageStyle.footer}`}><Footer/></div>

                {/* 모달 까만창 */}
                <div onClick={async()=>{dispatch(changeFollowModalOpen(false))}} style={state.followModalOpen?{position:"absolute",zIndex:"9",width:"100%", height:"3000px", backgroundColor:"black", opacity:"0.6", marginTop:"-3000px"}:null}></div>
            </div>

            {/* 피드블러 */}
            <div onClick={async()=>{dispatch(changeDetailModalOpen(false))}} style={state_feed.detailModalOpen?{position:"absolute",zIndex:"9",width:"100%", height:"10000px", backgroundColor:"black", opacity:"0.6", marginTop:"-10000px"}:null}></div>
        </>
    );
}

export default Mypage;