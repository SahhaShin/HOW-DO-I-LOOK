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

    // hover 시 상세보기 오픈
    let [openMenu, setOpenMenu] = useState<boolean>(false);

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
        dispatch(changeDetailFeedId(props.feedInfo.feedId));
        dispatch(action.getComment(props.feedInfo.feedId));
    }



    return(
        <div className={`${mypageFeedSlotStyle.feedSlot}`} onMouseOver={()=>setOpenMenu(true)} onMouseOut={()=>setOpenMenu(false)}>
            <StyledSlider {...settings} className={`${mypageFeedSlotStyle.onefeed}`}>
                {   props.feedInfo.photoResponseDtoList.map((onePicture)=>{
                    return(
                        <div className={`${mypageFeedSlotStyle.slide}`}>
                            <img src={onePicture.link}></img>
                        </div>
                    );
                    })
                }
            </StyledSlider>

            {openMenu?
            <div>
                <div className={`${mypageFeedSlotStyle.bgColor}`}></div>
                <button className={`${mypageFeedSlotStyle.btn}`} onClick={()=>{dispatch(changeDetailModalOpen(true));detailFeed()}}>상세보기</button>
            </div>:null}
        </div>
    );
}

export default MypageSlot;

const StyledSlider = styled(Slider)`

  .slick-prev {
    z-index: 1;
    left: 30px;
    top: 35%;
  }

  .slick-next {
    right: 40px;
    top: 35%;
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
    bottom: 200px;
    color: black;

    li button:before {
      color: black;
    }

    li.slick-active button:before {
      color: white;
    }
  }
`;