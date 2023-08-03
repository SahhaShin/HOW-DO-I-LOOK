import styeld from "styled-components";
import { useState, useRef, useEffect } from "react";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action, changeModalOpen,changeMode} from "../../../store/ClosetSlice";

const SlideComponent = (props) => {
    //redux 관리
    let state = useSelector((state:any)=>state.closet);
    let dispatch = useDispatch();

    const slideRef = useRef(null);
    const [currentImgOrder, setcCurrentImgOrder] = useState(0);
    let IMG_WIDTH = 120;

    const slideRange = currentImgOrder * IMG_WIDTH;

    useEffect(() => {
        slideRef.current.style.transition = "all 0.3s ease-in-out";
        slideRef.current.style.transform = `translateX(-${slideRange}px)`;
    }, [currentImgOrder]);

    const moveToNextSlide = () => {
        if (props.clothesType=="TOP"&&currentImgOrder === state.clothesTop?.length-1) return;
        if (props.clothesType=="BOTTOM"&&currentImgOrder === state.clothesBottom?.length-1) return;
        if (props.clothesType=="SHOE"&&currentImgOrder === state.clothesShoe?.length-1) return;
        if (props.clothesType=="ACCESSORY"&&currentImgOrder === state.clothesAccessory?.length-1) return;
        setcCurrentImgOrder(currentImgOrder + 1);
    };

    const moveToPrevSlide = () => {
        if (currentImgOrder === 0) return;
        setcCurrentImgOrder(currentImgOrder - 1);
    };
    return (
        <>
                {
                    
                    props.clothesType==="TOP"?
                    <WrapperTOP>
                        <SlideWrapper ref={slideRef}>
                            {state.clothesTop?.map((one)=>{
                                return(<ImgTOP src={one.photoLink} />);
                            })}
                        </SlideWrapper>
                    </WrapperTOP>:null
                }

                {
                    
                    props.clothesType==="BOTTOM"?
                    <WrapperBOTTOM>
                        <SlideWrapper ref={slideRef}>
                            {state.clothesBottom?.map((one)=>{
                                return(<ImgBOTTOM src={one.photoLink} />);
                            })}
                        </SlideWrapper>
                    </WrapperBOTTOM>:null
                }

                {
                    
                    props.clothesType==="SHOE"?
                    <WrapperSHOE>
                        <SlideWrapper ref={slideRef}>
                            {state.clothesShoe?.map((one)=>{
                                return(<ImgSHOE src={one.photoLink} />);
                            })}
                        </SlideWrapper>
                    </WrapperSHOE>:null
                }

                {
                    props.clothesType==="ACCESSORY"?
                    state.clothesAccessory?.map((one)=>{
                        return(<ImgACCESSORY src={one.photoLink} />);
                    }):null
                }

        {/* <Button onClick={moveToPrevSlide}>prev</Button>
        <Button onClick={moveToNextSlide}>next</Button> */}
        </>
    );
};

export default SlideComponent;

const WrapperTOP = styeld.div`
  width: 120px;
  height: 120px;
  margin-bottom:5px;
  overflow: hidden;
`;

const WrapperBOTTOM = styeld.div`
  width: 120px;
  height: 230px;
  margin-bottom:5px;
  overflow: hidden;
`;

const WrapperSHOE = styeld.div`
  width: 120px;
  height: 100%;
  object-fit:contain;
  overflow: hidden;
`;


const SlideWrapper = styeld.div`
  display: flex;
  width: 100%;
  height:100%;
`;

const ImgTOP = styeld.img`
    width: 100%;
    height: 100%;
    object-fit:contain;
`;

const ImgBOTTOM = styeld.img`
  width: 100%;
  height: 100%;
  object-fit:contain;
`;

const ImgACCESSORY = styeld.img`
    width: 100%;
    height: 100%;
    object-fit:contain;
`;

const ImgSHOE = styeld.img`
    width: 100%;
    height: 100%;
    object-fit:contain;
`;

const Button = styeld.button`
    display:flex;
    flex-direction:row;
    width:50px;
    height:50px;
`;