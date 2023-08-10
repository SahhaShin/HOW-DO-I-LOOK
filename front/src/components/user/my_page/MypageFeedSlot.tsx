import React, { useEffect, useState } from 'react';

//css
import mypageFeedSlotStyle from "./MypageFeedSlot.module.css";
import styled from "styled-components";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {changeDetailModalOpen} from "../../../store/FeedSlice";
import {action, changeDetailFeedId} from "../../../store/FeedSlice";


//slick import
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MypageSlot = (props) => {
    //props.feedInfo로 쓰면 됨

    //redux 관리
    let state = useSelector((state:any)=>state.mypage);
    let state_feed = useSelector((state:any)=>state.mypage);
    let dispatch = useDispatch();


    //내 로그인 정보
    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

    // 슬라이드 설정
    const settings = {
        dots:true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    // 상세보기를 누르면
    // 1) 전체 피드 리스트 가져와야 하고,
    // 2) 특정 피드 번호로 셋팅해야 한다.
    function detailFeed(){
        // 내 좋아요 기록
        dispatch(action.getFeedLikeOnMe({userId:props.feedInfo.userId, feedId:props.feedId}));
        dispatch(action.getFeedTotalList({size:10, page:0}));
        dispatch(action.getComment(props.feedInfo.feedId));
    }

    return(
        <div className={`${mypageFeedSlotStyle.feedSlot}`}>
            <StyledSlider {...settings} className={`${mypageFeedSlotStyle.onefeed}`}>
                {   props.feedInfo.photoResponseDtoList.map((onePicture)=>{
                    return(
                        <div onClick={()=>{dispatch(changeDetailModalOpen(true));dispatch(changeDetailFeedId(props.feedInfo.feedId));detailFeed()}} className={`${mypageFeedSlotStyle.slide}`}>
                            <img src={onePicture.link}/>
                        </div>
                    );
                })

                }
            </StyledSlider>
        </div>
    );
}

export default MypageSlot;

const StyledSlider = styled(Slider)`

  .slick-prev {
    z-index: 1;
    left: 30px;
    top: 50%;
  }

  .slick-next {
    right: 40px;
    top: 50%;
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
    bottom: 20px;
    color: black;

    li button:before {
      color: black;
    }

    li.slick-active button:before {
      color: white;
    }
  }
`;