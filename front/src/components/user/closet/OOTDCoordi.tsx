import React, { useRef, useEffect, useState } from "react";

// css
import coordiStyle from "./OOTDCoordi.module.css";
import styled from "styled-components";

//redux
import { useSelector, useDispatch } from "react-redux";
import { action } from "../../../store/ClosetSlice";

// alert창
import Swal from "sweetalert2";

//slick import
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


//idx는 몇 번째 ootd 순서인가 1번인가 2번인가를 알려줌 {idx: 1}
const OOTDCoordi = (props) => {


    const settings = {
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };


    //redux 관리
    let state = useSelector((state: any) => state.closet);
    let dispatch = useDispatch();


    // 슬라이더의 현재 인덱스와 이미지 정보를 관리하는 상태
    //1) 상의
    const [currentTOPSlideIndex, setCurrentTOPSlideIndex] = useState(0);
    const [currentTOPImageInfo, setCurrentTOPImageInfo] = useState({}); // 이미지 정보를 저장하는 객체 형태

    //2) 하의
    const [currentBOTTOMSlideIndex, setCurrentBOTTOMSlideIndex] = useState(0);
    const [currentBOTTOMImageInfo, setCurrentBOTTOMImageInfo] = useState({});


    //3) 신발
    const [currentSHOESlideIndex, setCurrentSHOESlideIndex] = useState(0);
    const [currentSHOEImageInfo, setCurrentSHOEImageInfo] = useState({});


    //4) 악세1
    const [currentACC1SlideIndex, setCurrentACC1SlideIndex] = useState(0);
    const [currentACC1ImageInfo, setCurrentACC1ImageInfo] = useState({});


    //5) 악세2
    const [currentACC2SlideIndex, setCurrentACC2SlideIndex] = useState(0);
    const [currentACC2ImageInfo, setCurrentACC2ImageInfo] = useState({});


    //6) 악세3
    const [currentACC3SlideIndex, setCurrentACC3SlideIndex] = useState(0);
    const [currentACC3ImageInfo, setCurrentACC3ImageInfo] = useState({});


    // ootd 저장
    interface clothes {
        TOP: number,
        BOTTOM: number,
        SHOE: number,
        ACCESSORY1: number,
        ACCESSORY2: number,
        ACCESSORY3: number
    }

    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
    const userId: number = loginUser.id;

    function saveOOTD() {

        let slotIds: clothes = {
            TOP: currentTOPImageInfo?.clothesId,
            BOTTOM: currentBOTTOMImageInfo?.clothesId,
            SHOE: currentSHOEImageInfo?.clothesId,
            ACCESSORY1: currentACC1ImageInfo?.clothesId,
            ACCESSORY2: currentACC2ImageInfo?.clothesId,
            ACCESSORY3: currentACC3ImageInfo?.clothesId
        }

        if (slotIds.TOP === undefined) {
            if (props.idx === 1 && state.clothesOOTDTop_1.length >= 1) {
                slotIds.TOP = state.clothesOOTDTop_1[0].clothesId;
            } else if (props.idx === 2 && state.clothesOOTDTop_2.length >= 1) {
                slotIds.TOP = state.clothesOOTDTop_2[0].clothesId;
            }
        }

        if (slotIds.BOTTOM === undefined) {
            if (props.idx === 1 && state.clothesOOTDBottom_1.length >= 1) {
                slotIds.BOTTOM = state.clothesOOTDBottom_1[0].clothesId;
            } else if (props.idx === 2 && state.clothesOOTDBottom_2.length >= 1) {
                slotIds.BOTTOM = state.clothesOOTDBottom_2[0].clothesId;
            }
        }

        if (slotIds.SHOE === undefined) {
            if (props.idx === 1 && state.clothesOOTDShoe_1.length >= 1) {
                slotIds.SHOE = state.clothesOOTDShoe_1[0].clothesId;
            } else if (props.idx === 2 && state.clothesOOTDShoe_2.length >= 1) {
                slotIds.SHOE = state.clothesOOTDShoe_2[0].clothesId;
            }
        }

        if (slotIds.ACCESSORY1 === undefined) {
            if (props.idx === 1 && state.clothesOOTDAccessory1_1.length >= 1) {
                slotIds.ACCESSORY1 = state.clothesOOTDAccessory1_1[0].clothesId;
            } else if (props.idx === 2 && state.clothesOOTDAccessory1_2.length >= 1) {
                slotIds.ACCESSORY1 = state.clothesOOTDAccessory1_2[0].clothesId;
            }
        }


        if (slotIds.ACCESSORY2 === undefined) {
            if (props.idx === 1 && state.clothesOOTDAccessory2_1.length >= 1) {
                slotIds.ACCESSORY2 = state.clothesOOTDAccessory2_1[0].clothesId;
            } else if (props.idx === 2 && state.clothesOOTDAccessory2_2.length >= 1) {
                slotIds.ACCESSORY2 = state.clothesOOTDAccessory2_2[0].clothesId;
            }
        }


        if (slotIds.ACCESSORY3 === undefined) {
            if (props.idx === 1 && state.clothesOOTDAccessory3_1.length >= 1) {
                slotIds.ACCESSORY3 = state.clothesOOTDAccessory3_1[0].clothesId;
            } else if (props.idx === 2 && state.clothesOOTDAccessory3_2.length >= 1) {
                slotIds.ACCESSORY3 = state.clothesOOTDAccessory3_2[0].clothesId;
            }
        }


        console.log(`slotIds.TOP= ${slotIds.TOP}`);
        console.log(`slotIds.BOTTOM= ${slotIds.BOTTOM}`);
        console.log(`slotIds.SHOE= ${slotIds.SHOE}`);
        console.log(`slotIds.ACCESSORY1= ${slotIds.ACCESSORY1}`);
        console.log(`slotIds.ACCESSORY2= ${slotIds.ACCESSORY2}`);
        console.log(`slotIds.ACCESSORY3= ${slotIds.ACCESSORY3}`);

        if (slotIds.TOP === undefined || slotIds.BOTTOM === undefined || slotIds.SHOE === undefined || slotIds.ACCESSORY1 === undefined || slotIds.ACCESSORY2 === undefined || slotIds.ACCESSORY3 === undefined) {
            Swal.fire({
                icon: 'warning',
                title: 'Closet을 채워주세요 :)',
                text: '최소 옷/바지/신발 각 1벌과 악세서리 3개를 채워주세요!',
                confirmButtonColor: '#4570F5',
            })
            return;
        }

        dispatch(action.OOTDSave({ userId: userId, order: props.idx, slotIds: slotIds }));
    }



    // 화면 단 : 이 부분은 백엔드에서 데이터 넘겨주면 map 형태로 다시 바꿀 것임
    return (
        // 전체
        <div className={`${coordiStyle.totalArea}`}>
            <div className={`${coordiStyle.oneCloset}`}>

                {/* 상의 하의 신발 */}
                <div className={`${coordiStyle.ootd}`}>
                    {/* 상의 */}
                    <div className={`${coordiStyle.carousal}`}>
                        <StyledSlider {...settings}
                            beforeChange={(oldIndex, newIndex) => {
                                // 슬라이더의 현재 인덱스 업데이트
                                setCurrentTOPSlideIndex(newIndex);

                                // 이미지 정보 가져와서 현재 이미지 정보 상태 업데이트
                                const currentSlide = state.clothesTop[newIndex]; // slides에는 보여지는 이미지 정보 배열이 있어야 함
                                setCurrentTOPImageInfo(currentSlide);
                            }}
                        >

                            {/* {
                                state.clothesOOTDTop_1?.map((oneT)=>{
                                        return(
                                            <div className={`${coordiStyle.slideT}`}>
                                                <img src={oneT.clothesPhotoLink}/>
                                            </div>
                                        );
                                    })
                            } */}


                            {
                                props.idx === 1 ?
                                    state.clothesOOTDTop_1.map((oneT) => {
                                        return (
                                            <div className={`${coordiStyle.slideT}`}>
                                                <img src={oneT.clothesPhotoLink} />
                                            </div>
                                        );
                                    }) : null
                            }
                            {
                                props.idx === 2 ?
                                    state.clothesOOTDTop_2.map((oneT) => {
                                        return (
                                            <div className={`${coordiStyle.slideT}`}>
                                                <img src={oneT.clothesPhotoLink} />
                                            </div>
                                        );
                                    }) : null

                            }

                        </StyledSlider>

                        {/* <div>
                            <p>현재 보고 있는 이미지 정보:</p>
                            <pre>{JSON.stringify(currentBOTTOMImageInfo, null, 2)}</pre>
                        </div> */}

                    </div>


                    {/* 하의 */}
                    <div className={`${coordiStyle.carousal}`}>
                        <StyledSlider {...settings}
                            beforeChange={(oldIndex, newIndex) => {
                                // 슬라이더의 현재 인덱스 업데이트
                                setCurrentBOTTOMSlideIndex(newIndex);

                                // 이미지 정보 가져와서 현재 이미지 정보 상태 업데이트
                                const currentSlide = state.clothesBottom[newIndex]; // slides에는 보여지는 이미지 정보 배열이 있어야 함
                                setCurrentBOTTOMImageInfo(currentSlide);
                            }}
                        >

                            {
                                props.idx === 1 ?
                                    state.clothesOOTDBottom_1.map((oneB) => {
                                        return (
                                            <div className={`${coordiStyle.slideB}`}>
                                                <img src={oneB.clothesPhotoLink} />
                                            </div>
                                        );
                                    }) :
                                    state.clothesOOTDBottom_2.map((oneB) => {
                                        return (
                                            <div className={`${coordiStyle.slideB}`}>
                                                <img src={oneB.clothesPhotoLink} />
                                            </div>
                                        );
                                    })
                            }

                        </StyledSlider>

                    </div>

                    {/* 신발 */}
                    <div className={`${coordiStyle.carousal}`}>
                        <StyledSlider {...settings}
                            beforeChange={(oldIndex, newIndex) => {
                                // 슬라이더의 현재 인덱스 업데이트
                                setCurrentSHOESlideIndex(newIndex);

                                // 이미지 정보 가져와서 현재 이미지 정보 상태 업데이트
                                const currentSlide = state.clothesShoe[newIndex]; // slides에는 보여지는 이미지 정보 배열이 있어야 함
                                setCurrentSHOEImageInfo(currentSlide);
                            }}
                        >
                            {
                                props.idx === 1 ?
                                    state.clothesOOTDShoe_1.map((oneB) => {
                                        return (
                                            <div className={`${coordiStyle.slideS}`}>
                                                <img src={oneB.clothesPhotoLink} />
                                            </div>
                                        );
                                    }) :
                                    state.clothesOOTDShoe_2.map((oneB) => {
                                        return (
                                            <div className={`${coordiStyle.slideS}`}>
                                                <img src={oneB.clothesPhotoLink} />
                                            </div>
                                        );
                                    })
                            }

                        </StyledSlider>

                    </div>

                </div>

                {/* 악세서리 3칸 */}
                <div className={`${coordiStyle.ootd_etc}`}>

                    {/* 악세서리1 */}
                    <div className={`${coordiStyle.carousal_etc}`}>
                        <StyledSlider {...settings}
                            beforeChange={(oldIndex, newIndex) => {
                                // 슬라이더의 현재 인덱스 업데이트
                                setCurrentACC1SlideIndex(newIndex);

                                // 이미지 정보 가져와서 현재 이미지 정보 상태 업데이트
                                const currentSlide = state.clothesAccessory[newIndex]; // slides에는 보여지는 이미지 정보 배열이 있어야 함
                                setCurrentACC1ImageInfo(currentSlide);
                            }}
                        >
                            {
                                props.idx === 1 ?
                                    state.clothesOOTDAccessory1_1.map((oneA) => {
                                        return (
                                            <div className={`${coordiStyle.slideA1}`}>
                                                <img src={oneA?.clothesPhotoLink} />
                                            </div>
                                        );
                                    }) :
                                    state.clothesOOTDAccessory1_2.map((oneA) => {
                                        return (
                                            <div className={`${coordiStyle.slideA1}`}>
                                                <img src={oneA?.clothesPhotoLink} />
                                            </div>
                                        );
                                    })
                            }

                        </StyledSlider>

                    </div>

                    {/* 악세서리2 */}
                    <div className={`${coordiStyle.carousal_etc}`}>
                        <StyledSlider {...settings}
                            beforeChange={(oldIndex, newIndex) => {
                                // 슬라이더의 현재 인덱스 업데이트
                                setCurrentACC2SlideIndex(newIndex);

                                // 이미지 정보 가져와서 현재 이미지 정보 상태 업데이트
                                const currentSlide = state.clothesAccessory[newIndex]; // slides에는 보여지는 이미지 정보 배열이 있어야 함
                                setCurrentACC2ImageInfo(currentSlide);
                            }}
                        >
                            {
                                props.idx === 1 ?
                                    state.clothesOOTDAccessory2_1.map((oneA) => {
                                        return (
                                            <div className={`${coordiStyle.slideA2}`}>
                                                <img src={oneA?.clothesPhotoLink} />
                                            </div>
                                        );
                                    }) :
                                    state.clothesOOTDAccessory2_2.map((oneA) => {
                                        return (
                                            <div className={`${coordiStyle.slideA2}`}>
                                                <img src={oneA?.clothesPhotoLink} />
                                            </div>
                                        );
                                    })
                            }


                        </StyledSlider>

                    </div>

                    {/* 악세서리3 */}
                    <div className={`${coordiStyle.carousal_etc}`}>
                        <StyledSlider {...settings}
                            beforeChange={(oldIndex, newIndex) => {
                                // 슬라이더의 현재 인덱스 업데이트
                                setCurrentACC3SlideIndex(newIndex);

                                // 이미지 정보 가져와서 현재 이미지 정보 상태 업데이트
                                const currentSlide = state.clothesAccessory[newIndex]; // slides에는 보여지는 이미지 정보 배열이 있어야 함
                                setCurrentACC3ImageInfo(currentSlide);
                            }}
                        >
                            {
                                props.idx === 1 ?
                                    state.clothesOOTDAccessory3_1.map((oneA) => {
                                        return (
                                            <div className={`${coordiStyle.slideA3}`}>
                                                <img src={oneA?.clothesPhotoLink} />
                                            </div>
                                        );
                                    }) :
                                    state.clothesOOTDAccessory3_2.map((oneA) => {
                                        return (
                                            <div className={`${coordiStyle.slideA3}`}>
                                                <img src={oneA?.clothesPhotoLink} />
                                            </div>
                                        );
                                    })
                            }

                        </StyledSlider>

                    </div>
                </div>


            </div>
            <div onClick={() => { saveOOTD() }} className={`${coordiStyle.btn} ${coordiStyle.btn__secondary}`}><p>저장</p></div>

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
  .slick-slider {
    .slick-list {
      .slick-slide {
        div {
          // beforeChange 이벤트 핸들러 정의
          .slick-slide-inner {
            .slick-slide {
              &:beforeChange {
                content: "";
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
`;
