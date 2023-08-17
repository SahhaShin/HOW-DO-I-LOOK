import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//css
import mypageStyle from "./Mypage.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action_mypage, changeBadgeUpdateModalOpen, changeFollowModalOpen} from "../../../store/MypageSlice";
import {changeDetailModalOpen} from "../../../store/FeedSlice";
import {changeMenuItemNum} from "../../../store/UtilSlice";


import {useParams} from 'react-router-dom'

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
import MypageBadgeModal from '../../../components/user/my_page/MypageBadgeModal';
import Swal from "sweetalert2";

const Mypage = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.mypage);
    let state_feed = useSelector((state:any)=>state.feed);
    let dispatch = useDispatch();
    dispatch(changeMenuItemNum(5))

    const loginUser = JSON.parse(window.sessionStorage.getItem("loginUser"));

    const { watchingUserId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(action_mypage.getBlackList(Number(watchingUserId)));
    }, [])

    useEffect(() => {
        dispatch(action_mypage.getUserById(Number(watchingUserId)));
      }, [])

      if(state.targetUser.id === 0 || state.blackListUsers == null) {
        return(<div>Loading..</div>);
      }



      if(loginUser.id !== Number(watchingUserId) && state.targetUser.closetAccess === "PRIVATE") {
        Swal.fire({
            icon: 'info',
            title: '비공개된 프로필입니다!',
            text: '주인이 공개를 원하지 않습니다:)',
            confirmButtonColor: '#EAA595',
          })
        navigate("/");
      }

      if(state.blackListUsers != null && loginUser.id !== Number(watchingUserId)) {
      
        for(let i=0; i<state.blackListUsers.length; i++) {
            if(state.blackListUsers[i].targetUserId === loginUser.id) {
                Swal.fire({
                    icon: 'info',
                    title: '비공개된 프로필입니다!',
                    text: '해당 유저가 블랙 했습니다!',
                    confirmButtonColor: '#EAA595',
                })

                navigate("/");
            }
          }
      }

    return(
        <>


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
                        {state.followModalOpen && <div className={`${mypageStyle.followModal}`}><MypageFollowModal/></div>}
                        {state.badgeUpdateModalOpen && <div className={`${mypageStyle.BadgeModal}`}><MypageBadgeModal/></div>}
                        
                        {
                            // 피드 상세보기 모달
                            state_feed.detailModalOpen?<div className={`${mypageStyle.detailModal}`}><FeedDetail feedId={state_feed.detailFeedId}/></div>:null
                        }
                                    
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
            <div onClick={async()=>{dispatch(changeDetailModalOpen(false)); dispatch(changeBadgeUpdateModalOpen(false))}} style={state_feed.detailModalOpen||state.badgeUpdateModalOpen?{position:"absolute",zIndex:"9",width:"100%", height:"10000px", backgroundColor:"black", opacity:"0.6", marginTop:"-10000px"}:null}></div>
        </>
    );
}

export default Mypage;