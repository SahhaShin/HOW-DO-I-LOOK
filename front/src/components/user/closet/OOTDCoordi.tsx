import React, { useRef, useEffect, useState } from "react";

// css
import coordiStyle from "./OOTDCoordi.module.css";
import styled from "styled-components";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action} from "../../../store/ClosetSlice";

// 직접 만든 slider
// import CLOSETSlider from "./CLOSETSlider";

//slick import
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



//idx는 몇 번째 ootd 순서인가 1번인가 2번인가를 알려줌
const OOTDCoordi = (idx) => {

    const settings = {
        arrows:true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };


    //redux 관리
    let state = useSelector((state:any)=>state.closet);
    let dispatch = useDispatch();
   
    


    // ootd 저장
    interface slotIds{
        TOP:number,
        BOTTOM:number,
        SHOE:number,
        ACCESSORY1:number,
        ACCESSORY2:number,
        ACCESSORY3:number
    }

    let order = idx;
    let [TOP,setTOP] = useState<number|null>();
    let [BOTTOM,setBOTTOM] = useState<number|null>();
    let [SHOE,setSHOE] = useState<number|null>();
    let [ACCESSOTY1,setACCESSOTY1] = useState<number|null>();
    let [ACCESSOTY2,setACCESSOTY2] = useState<number|null>();
    let [ACCESSOTY3,setACCESSOTY3] = useState<number|null>();
    
    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
    const userId:number = loginUser.id;

    function saveOOTD(){
        dispatch(action.OOTDSave(userId,order,clothesIds));
    }

    // 화면 단 : 이 부분은 백엔드에서 데이터 넘겨주면 map 형태로 다시 바꿀 것임
    return(
        // 전체
        <div className={`${coordiStyle.totalArea}`}>
            <div className={`${coordiStyle.oneCloset}`}>
                {/* 상의 하의 신발 */}
                <div className={`${coordiStyle.ootd}`}>

                    {/* 상의 */}
                    {/* <div className={`${coordiStyle.carousal}`}>
                        <CLOSETSlider clothesType={"TOP"}/>
                    </div> */}


                    {/* 하의 */}
                    {/* <div className={`${coordiStyle.carousal}`}>
                        <CLOSETSlider clothesType={"BOTTOM"}/>
                    </div> */}

                    {/* 신발 */}
                    {/* <div className={`${coordiStyle.carousal}`}>
                        <CLOSETSlider clothesType={"SHOE"}/>
                    </div> */}
                
                </div>

                {/* 악세서리 3칸 */}
                {/* <div className={`${coordiStyle.ootd_etc}`}> */}

                    {/* 악세서리1 */}
                    {/* <div className={`${coordiStyle.carousal_etc}`}>
                        <CLOSETSlider clothesType={"ACCESSORY"}/>
                    </div> */}

                    {/* 악세서리2 */}
                    {/* <div className={`${coordiStyle.carousal_etc}`}>
                        <CLOSETSlider clothesType={"ACCESSORY"}/>
                    </div> */}

                    {/* 악세서리3 */}
                    {/* <div className={`${coordiStyle.carousal_etc}`}>
                        <CLOSETSlider clothesType={"ACCESSORY"}/>
                    </div>
                </div> */}

                {/* 상의 하의 신발 */}
                <div className={`${coordiStyle.ootd}`}>
                    {/* 상의 */}
                    <div className={`${coordiStyle.carousal}`}>
                        <StyledSlider {...settings}>
                            {/* public img는 절대 경로로 가져와야 함 */}
                            <div className={`${coordiStyle.slide}`}>
                                <img src={process.env.PUBLIC_URL+`/img/clothes/top1.png`}/>
                            </div>

                            <div className={`${coordiStyle.slide}`}>
                                <img src={process.env.PUBLIC_URL+`/img/clothes/top2.png`}/>
                            </div>

                            <div className={`${coordiStyle.slide}`}>
                                <img src={process.env.PUBLIC_URL+`/img/clothes/top3.png`}/>
                            </div>

                        </StyledSlider>

                    </div>


                    {/* 하의 */}
                    <div className={`${coordiStyle.carousal}`}>
                        <StyledSlider {...settings}>
                            {/* public img는 절대 경로로 가져와야 함 */}
                            <div className={`${coordiStyle.slide}`}>
                                <img src={process.env.PUBLIC_URL+`/img/clothes/bottom1.png`}/>
                            </div>

                            <div className={`${coordiStyle.slide}`}>
                                <img src={process.env.PUBLIC_URL+`/img/clothes/bottom2.png`}/>
                            </div>

                            <div className={`${coordiStyle.slide}`}>
                                <img src={process.env.PUBLIC_URL+`/img/clothes/bottom3.png`}/>
                            </div>

                        </StyledSlider>

                    </div>

                    {/* 신발 */}
                    <div className={`${coordiStyle.carousal}`}>
                        <StyledSlider {...settings}>
                            {/* public img는 절대 경로로 가져와야 함 */}
                            <div className={`${coordiStyle.slide}`}>
                                <img src={process.env.PUBLIC_URL+`/img/clothes/shoes1.png`}/>
                            </div>

                            <div className={`${coordiStyle.slide}`}>
                                <img src={process.env.PUBLIC_URL+`/img/clothes/shoes2.png`}/>
                            </div>

                            <div className={`${coordiStyle.slide}`}>
                                <img src={process.env.PUBLIC_URL+`/img/clothes/shoes3.png`}/>
                            </div>

                        </StyledSlider>

                    </div>
                
                </div>

                {/* 악세서리 3칸 */}
                <div className={`${coordiStyle.ootd_etc}`}>

                    {/* 악세서리1 */}
                    <div className={`${coordiStyle.carousal_etc}`}>
                        <StyledSlider {...settings}>
                            {/* public img는 절대 경로로 가져와야 함 */}
                            <div className={`${coordiStyle.slide_etc}`}>
                                <img src={process.env.PUBLIC_URL+`/img/clothes/bag1.png`}/>
                            </div>

                            <div className={`${coordiStyle.slide_etc}`}>
                                <img src={process.env.PUBLIC_URL+`/img/clothes/bag2.png`}/>
                            </div>

                            <div className={`${coordiStyle.slide_etc}`}>
                                <img src={process.env.PUBLIC_URL+`/img/clothes/earing1.png`}/>
                            </div>

                            <div className={`${coordiStyle.slide_etc}`}>
                                <img src={process.env.PUBLIC_URL+`/img/clothes/socks1.png`}/>
                            </div>

                        </StyledSlider>

                    </div>

                    {/* 악세서리2 */}
                    <div className={`${coordiStyle.carousal_etc}`}>
                        <StyledSlider {...settings}>
                            {/* public img는 절대 경로로 가져와야 함 */}
                            <div className={`${coordiStyle.slide_etc}`}>
                                <img src={process.env.PUBLIC_URL+`/img/clothes/bag1.png`}/>
                            </div>

                            <div className={`${coordiStyle.slide_etc}`}>
                                <img src={process.env.PUBLIC_URL+`/img/clothes/bag2.png`}/>
                            </div>

                            <div className={`${coordiStyle.slide_etc}`}>
                                <img src={process.env.PUBLIC_URL+`/img/clothes/earing1.png`}/>
                            </div>

                            <div className={`${coordiStyle.slide_etc}`}>
                                <img src={process.env.PUBLIC_URL+`/img/clothes/socks1.png`}/>
                            </div>

                        </StyledSlider>

                    </div>

                    {/* 악세서리3 */}
                    <div className={`${coordiStyle.carousal_etc}`}>
                        <StyledSlider {...settings}>
                            {/* public img는 절대 경로로 가져와야 함 */}
                            <div className={`${coordiStyle.slide_etc}`}>
                                <img src={process.env.PUBLIC_URL+`/img/clothes/bag1.png`}/>
                            </div>

                            <div className={`${coordiStyle.slide_etc}`}>
                                <img src={process.env.PUBLIC_URL+`/img/clothes/bag2.png`}/>
                            </div>

                            <div className={`${coordiStyle.slide_etc}`}>
                                <img src={process.env.PUBLIC_URL+`/img/clothes/earing1.png`}/>
                            </div>

                            <div className={`${coordiStyle.slide_etc}`}>
                                <img src={process.env.PUBLIC_URL+`/img/clothes/socks1.png`}/>
                            </div>

                        </StyledSlider>

                    </div>
                </div>

                
            </div>
            <div className={`${coordiStyle.btn} ${coordiStyle.btn__secondary}`}><p>저장</p></div>

        </div>
        
        
    );
}


export default OOTDCoordi;

const StyledSlider = styled(Slider)`

  .slick-prev {
    z-index: 1;
    left: 30px;
  }

  .slick-next {
    right: 40px;
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
    bottom: 30px;
    color: white;

    li button:before {
      color: white;
    }

    li.slick-active button:before {
      color: white;
    }
  }
`;
