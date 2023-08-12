import React, { useState } from 'react';

//css
import feedSlotStyle from './FeedSlot.module.css';
import styled from "styled-components";

//slick import
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action_feed, changeModifyModalOpen, changeDetailFeedId, changeFollow, changeDetailModalOpen,changeDeclarationModalOpen} from "../../../store/FeedSlice";

// alert창
import Swal from "sweetalert2";

const FeedSlot = () => {
    //redux 관리
    let state = useSelector((state:any)=>state.feed);
    let dispatch = useDispatch();

    //유저정보
    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

    // 슬라이드 설정
    const settings = {
        dots:true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };


    //피드 삭제 함수
    function deleteFeed(feedId){
        Swal.fire({
            icon: "question",
            title: "삭제",
            text: `삭제 하시겠습니까??`,
            showCancelButton: true,
            confirmButtonText: "삭제",
            cancelButtonText: "취소",
            confirmButtonColor:'#4570F5',
            customClass: {
                confirmButton: feedSlotStyle.confirmButton, // 모듈화된 CSS 파일에 정의된 클래스 이름을 사용합니다.
                cancelButton: feedSlotStyle.cancelButton // 모듈화된 CSS 파일에 정의된 클래스 이름을 사용합니다.
              }
        }).then((res) => {
            if (res.isConfirmed) {
                dispatch(action_feed.deleteFeed(feedId));
            }
            else{
                
            }
        });
    }


    //피드 수정 버튼을 누르면 피드 수정 창이 뜬다.
    //피드 수정 창은 create 창과 같다.
    function modifyFeed(){

    }
    

    return(   
        <>
            {  state.feedTotalObj?.content.length!==0?
                state.feedTotalObj?.content.map((oneFeed, idx)=>{
                    
                    return(
                        <div key={idx} className={`${feedSlotStyle.card}`}>
                            {/* header */}
                            <div className={`${feedSlotStyle.header}`}>
                                {/* 왼쪽 : 프로필 사진 -- 이미지 아직 저장 안함 */}
                                <div className={`${feedSlotStyle.profile}`}>
                                    <div className={`${feedSlotStyle.profileCircle_G}`}>
                                        <img src={process.env.PUBLIC_URL+`/img/user/profileImg.png`}></img>
                                    </div>
                                                    
                                </div>
                                {/* 중앙 */}
                                <div className={`${feedSlotStyle.content}`}>
                                    {/* 닉네임 */}
                                    <div>
                                        <p>{oneFeed.userNickname}</p>
                                    </div>
                                </div>

                                {/* 우측 : 팔로우 언팔로우 & 신고버튼 */}
                                <div className={`${feedSlotStyle.btns}`}>
                                    {state.isFollow?<div><button onClick={async()=>{dispatch(changeFollow(false))}}>Unfollow</button></div>:<div><button onClick={async()=>{dispatch(changeFollow(true))}}>Follow</button></div>}  
                                    <div onClick={()=>{dispatch(changeDeclarationModalOpen(true))}} className={`${feedSlotStyle.alarmBtn}`}><img src={process.env.PUBLIC_URL+`/img/feed/alarm.png`}/></div>
                                </div>
                            </div>

                            {/* image */}
                            <div className={`${feedSlotStyle.image}`}>
                                <StyledSlider {...settings}>
                                    {
                                        oneFeed.photoResponseDtoList?.map((onePhoto, idx)=>{
                                            return(
                                                <div key={idx} className={`${feedSlotStyle.slide}`}>
                                                    <img src={onePhoto.link}/>
                                                </div>
                                            );
                                        })
                                    }
                                </StyledSlider>
                            </div>

                            {/* content */}
                            <div className={`${feedSlotStyle.content}`}>
                                {oneFeed.feedContent}
                            </div>

                            {/* hashtag */}
                            <div className={`${feedSlotStyle.hashtag}`}>
                                {
                                    oneFeed.photoResponseDtoList?.map((dtoList, idx) => {
                                        return (
                                            <div key={idx} className={`${feedSlotStyle.onehash}`}>
                                                {dtoList.hashtagList?.map((oneHash, idx2) => (
                                                    <button key={idx2}>#{oneHash}</button>
                                                ))}
                                            </div>
                                        );
                                    })
                                }
                            </div>

                            {/* comment, count, button */}
                            <div className={`${feedSlotStyle.footer}`}>
                                <div className={`${feedSlotStyle.comment}`}>
                                    {/* 이 버튼을 누르면 댓글 창으로 이동 -> 특정 피드 아이디 전달 */}
                                    {/* dispatch(action.getFeedLikeOnMe({"userId":loginUser.id, "feedId":oneFeed.feedId})); 이거 제외 */}
                                    <img src={process.env.PUBLIC_URL+`/img/feed/comment.png`} onClick={async()=>{dispatch(changeDetailModalOpen(true)); dispatch(changeDetailFeedId(oneFeed.feedId));}}/>
                                    <p>{oneFeed.commentCount}</p>
                                </div>
                                {oneFeed.userId===loginUser.id?<div className={`${feedSlotStyle.feedBtns}`}>
                                    <button onClick={()=>{dispatch(changeModifyModalOpen(true));dispatch(changeDetailFeedId(oneFeed.feedId)); dispatch(action.getFeedLikeOnMe({userId:oneFeed.userId,feedId:oneFeed.feedId}));}}>수정</button>
                                    <button onClick={()=>deleteFeed(oneFeed.feedId)}>삭제</button>
                                </div>:null}
                            </div>

                            {/* 날짜 */}
                            <div className={`${feedSlotStyle.date}`}>{oneFeed.feedCreatedDate.split("T")[0]} {oneFeed.feedCreatedDate.split("T")[1].split(".")[0]}</div>

                            {/* 구분선 */}
                            <div className={`${feedSlotStyle.hr}`}></div>
                        </div>
                    );
                }):<div className={`${feedSlotStyle.noresult}`}>검색 결과가 없습니다.</div>
                
            }
        </>     
    );
}


export default FeedSlot;

const StyledSlider = styled(Slider)`

  .slick-prev {
    z-index: 1;
    left: 30px;
    top: 200px;
  }

  .slick-next {
    right: 40px;
    top: 200px;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 30px;
    opacity: 0.5;
    color: white;
  }

  .slick-dots {
    display: flex;
    justify-content: center;
    bottom: 70px;
    color: black;

    li button:before {
      color: black;
    }

    li.slick-active button:before {
      color: white;
    }
  }
`;