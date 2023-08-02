import React, { useRef, useEffect, useState } from "react";

// css
import coordiStyle from "./OOTDCoordi.module.css";
import styled from "styled-components";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action} from "../../../store/ClosetSlice";


//slick import
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


//idx는 몇 번째 ootd 순서인가 1번인가 2번인가를 알려줌
const OOTDCoordi = (idx) => {

    //redux 관리
    let state = useSelector((state:any)=>state.closet);
    let dispatch = useDispatch();
   
    
    // 슬라이더 환경 관리
    const settings = {
        arrows:false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };


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
    
    const userId:number = 1;

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
                    <div className={`${coordiStyle.carousal}`}>
                        <StyledSlider {...settings}>
                            {   
                                state.clothesTop.length!==0?
                                state.clothesTop.map(()=>{
                                    <div className={`${coordiStyle.slide}`}>
                                        <img src={process.env.PUBLIC_URL+`/img/clothes/top1.png`}/>
                                    </div>
                                }):
                                <div className={`${coordiStyle.slide}`}><div className={`${coordiStyle.noImgTop}`}>NOTHING</div></div>
                            }

                        </StyledSlider>

                    </div>


                    {/* 하의 */}
                    <div className={`${coordiStyle.carousal}`}>
                        <StyledSlider {...settings}>
                            {   
                                state.clothesBottom.length!==0?
                                state.clothesBottom.map(()=>{
                                    <div className={`${coordiStyle.slide}`}>
                                        <img src={process.env.PUBLIC_URL+`/img/clothes/top1.png`}/>
                                    </div>
                                }):
                                <div className={`${coordiStyle.slide}`}><div className={`${coordiStyle.noImgBottom}`}>NOTHING</div></div>
                            }
                        </StyledSlider>

                    </div>

                    {/* 신발 */}
                    <div className={`${coordiStyle.carousal}`}>
                        <StyledSlider {...settings}>
                            {   
                                state.clothesShoe.length!==0?
                                state.clothesShoe.map(()=>{
                                    <div className={`${coordiStyle.slide}`}>
                                        <img src={process.env.PUBLIC_URL+`/img/clothes/top1.png`}/>
                                    </div>
                                }):
                                <div className={`${coordiStyle.slide}`}><div className={`${coordiStyle.noImgShoe}`}>NOTHING</div></div>
                            }

                        </StyledSlider>

                    </div>
                
                </div>

                {/* 악세서리 3칸 */}
                <div className={`${coordiStyle.ootd_etc}`}>

                    {/* 악세서리1 */}
                    <div className={`${coordiStyle.carousal_etc}`}>
                        <StyledSlider {...settings}>
                            {   
                                state.clothesAccessory.length!==0?
                                state.clothesAccessory.map(()=>{
                                    <div className={`${coordiStyle.slide}`}>
                                        <img src={process.env.PUBLIC_URL+`/img/clothes/top1.png`}/>
                                    </div>
                                }):
                                <div className={`${coordiStyle.slide}`}><div className={`${coordiStyle.noImgAccessory}`}>NOTHING</div></div>
                            }

                        </StyledSlider>

                    </div>

                    {/* 악세서리2 */}
                    <div className={`${coordiStyle.carousal_etc}`}>
                        <StyledSlider {...settings}>
                        {   
                                state.clothesAccessory.length!==0?
                                state.clothesAccessory.map(()=>{
                                    <div className={`${coordiStyle.slide}`}>
                                        <img src={process.env.PUBLIC_URL+`/img/clothes/top1.png`}/>
                                    </div>
                                }):
                                <div className={`${coordiStyle.slide}`}><div className={`${coordiStyle.noImgAccessory}`}>NOTHING</div></div>
                            }

                        </StyledSlider>

                    </div>

                    {/* 악세서리3 */}
                    <div className={`${coordiStyle.carousal_etc}`}>
                        <StyledSlider {...settings}>
                            {   
                                state.clothesAccessory.length!==0?
                                state.clothesAccessory.map(()=>{
                                    <div className={`${coordiStyle.slide}`}>
                                        <img src={process.env.PUBLIC_URL+`/img/clothes/top1.png`}/>
                                    </div>
                                }):
                                <div className={`${coordiStyle.slide}`}><div className={`${coordiStyle.noImgAccessory}`}>NOTHING</div></div>
                            }

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