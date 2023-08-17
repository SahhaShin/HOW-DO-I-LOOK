import React, { useEffect, useState } from 'react';
import feedStyle from "./Feed.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action_feed, calTotalFeedLikes, changeModifyModalOpen,changeDetailModalOpen,changeSortType, changeCreateModalOpen, changeDeclarationModalOpen, changeFeedMode} from "../../../store/FeedSlice";
import {changeMenuItemNum} from "../../../store/UtilSlice";
import { action_follow } from '../../../store/FollowSlice';

// 컴포넌트
import FeedSlot from '../../../components/sns/feed/FeedSlot';
import IntroArea from '../../../components/sns/feed/IntroArea';
import FeedDetail from '../../../components/sns/feed/FeedDetail';
import FeedCreate from '../../../components/sns/feed/FeedCreate';
import FeedDeclaration from '../../../components/sns/feed/FeedDeclaration';
import Header from '../../../components/util/Header';
import Footer from '../../../components/util/Footer';
import Menu from '../../../components/util/Menu';
import FeedModify from "../../../components/sns/feed/FeedModify";
import FeedFollow from '../../../components/sns/feed/FeedFollow';

const Feed = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.feed);
    let state_follow = useSelector((state:any)=>state.follow);
    let dispatch = useDispatch();
    dispatch(changeMenuItemNum(1))

    // 등록된 피드 전체 불러오기
    // function getFeedTotalList(state,action){
        
    // }

    const loginUser = JSON.parse(window.sessionStorage.getItem("loginUser"));

    useEffect(()=>{
        dispatch(action_feed.getFeedTotalList(loginUser.id));
    },[state.feedAddOk, state.likeOk, state.addCommentOk, state.commentList])

    useEffect(()=>{
        dispatch(calTotalFeedLikes());
    },[state.feedTotalObj, state.addCommentOk])

    return(
        <>
            {
                // 피드 상세보기 모달
                state.detailModalOpen?<div className={`${feedStyle.detailModal}`}><FeedDetail feedId={state.detailFeedId}/></div>:null
            }

            {
                // 피드 수정 모달
                state.modifyModalOpen?<div className={`${feedStyle.detailModal}`}><FeedModify/></div>:null
            }

            {
                // 업로드 모달
                state.createModalOpen?<div className={`${feedStyle.createModal}`}><FeedCreate/></div>:null
            }
            {
                //신고 모달
                state.declarationModalOpen?<div className={`${feedStyle.declarationModal}`}><FeedDeclaration/></div>:null
            }
            <div className={`${feedStyle.total}`}>
                <div className={`${feedStyle.header}`}><Header/></div>
                
                <div>
                    {/* 문구 & 해시태그 */}
                    <IntroArea/>
                </div>


                <div className={`${feedStyle.main}`}>
                    
                    {/* main */}
                    
                    <div className={`${feedStyle.menuArea}`}>
                        {/* floating menu start */}
                        <div><Menu/></div>
                    </div>

                    {/* 메인 컨텐츠 시작 */}
                    <div className={`${feedStyle.contentArea}`}>
                        
                        <div className={`${feedStyle.uploadBtn}`}>
                            {/* 업로드 버튼 */}
                            <button onClick={()=>{dispatch(changeCreateModalOpen(true))}}>업로드</button>
                        </div>

                        <div className={`${feedStyle.title}`}>
                            <div>Feed</div>
                            <div className={`${feedStyle.sortBtn}`}>
                                <button onClick={async()=>{
                                    dispatch(changeSortType(1))
                                    dispatch(changeFeedMode(1));
                                    }} style={state.sortType===1?{backgroundColor:"#EAA595", color:"white"}:null}>ALL</button>
                                <button onClick={async()=>{
                                    dispatch(changeSortType(2))
                                    dispatch(changeFeedMode(2));
                                    }} style={state.sortType===2?{backgroundColor:"#EAA595", color:"white"}:null}>FOLLOWING</button>
                                <button onClick={async()=>{
                                    dispatch(changeSortType(3))
                                    dispatch(changeFeedMode(3));
                                    }} style={state.sortType===3?{backgroundColor:"#EAA595", color:"white"}:null}>MY</button>
                            </div>
                        </div>

                        {/* 피드 리스트 */}
                       
                        <div className={`${feedStyle.list}`}>
                            <FeedSlot/>
                        </div>
                               

                    </div>

                    <FeedFollow/>
                </div>

                <div className={`${feedStyle.footer}`}><Footer/></div>

                
            </div>

            {/* 피드블러 */}
            <div onClick={async()=>{dispatch(changeDetailModalOpen(false)); dispatch(changeCreateModalOpen(false));dispatch(changeDeclarationModalOpen(false));dispatch(changeModifyModalOpen(false))}} style={state.detailModalOpen||state.createModalOpen||state.declarationModalOpen||state.modifyModalOpen?{position:"absolute",top:"0",zIndex:"9",width:"100%", height:"10000px", backgroundColor:"black", opacity:"0.6", margin:"0%", padding:"0%"}:null}></div>
        </>
    );
}

export default Feed;