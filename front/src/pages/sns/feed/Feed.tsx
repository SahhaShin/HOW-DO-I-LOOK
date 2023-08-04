import React, { useState } from 'react';
import feedStyle from "./Feed.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {changeDetailModalOpen,changeSortType, changeCreateModalOpen, changeDeclarationModalOpen} from "../../../store/FeedSlice";

// 컴포넌트
import FeedSlot from '../../../components/sns/feed/FeedSlot';
import FollowSlot from "../../../components/util/FollowSlot";
import IntroArea from '../../../components/sns/feed/IntroArea';
import FeedDetail from '../../../components/sns/feed/FeedDetail';
import FeedCreate from '../../../components/sns/feed/FeedCreate';
import FeedDeclaration from '../../../components/sns/feed/FeedDeclaration';
import Header from '../../../components/util/Header';
import Footer from '../../../components/util/Footer';
import Menu from '../../../components/util/Menu';

const Feed = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.feed);
    let dispatch = useDispatch();

    let [feedList, setFeedList] = useState<any>([1,2,3,4,5,6,7,8,9,10]);

    return(
        <>
            {
                // 피드 상세보기 모달
                state.detailModalOpen?<div className={`${feedStyle.detailModal}`}><FeedDetail/></div>:null
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
                                <button onClick={async()=>{dispatch(changeSortType(1))}} style={state.sortType===1?{backgroundColor:"#4570F5", color:"white"}:null}>ALL</button>
                                <button onClick={async()=>{dispatch(changeSortType(2))}} style={state.sortType===2?{backgroundColor:"#4570F5", color:"white"}:null}>FLOWING</button>
                            </div>
                        </div>

                        {/* 피드 리스트 */}
                        {
                            feedList.map(()=>{
                                return(
                                    <div className={`${feedStyle.list}`}>
                                        <FeedSlot/>
                                    </div>
                                );
                            })
                        }
                        

                    </div>

                    <div className={`${feedStyle.menuArea}`}>
                        {/* floating menu start */}
                        <div className={`${feedStyle.followArea}`}>
                            <div className={`${feedStyle.followAreaTitle}`}>Following</div>
                            <FollowSlot/>
                            <FollowSlot/>
                            <FollowSlot/>
                            <FollowSlot/>
                            <FollowSlot/>
                        </div>
                    </div>
                </div>

                <div className={`${feedStyle.footer}`}><Footer/></div>

                
            </div>

            {/* 피드블러 */}
            <div onClick={async()=>{dispatch(changeDetailModalOpen(false)); dispatch(changeCreateModalOpen(false));dispatch(changeDeclarationModalOpen(false))}} style={state.detailModalOpen||state.createModalOpen||state.declarationModalOpen?{position:"absolute",zIndex:"9",width:"100%", height:"10000px", backgroundColor:"black", opacity:"0.6", marginTop:"-10000px"}:null}></div>
        </>
    );
}

export default Feed;