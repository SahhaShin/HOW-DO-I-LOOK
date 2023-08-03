import { useState, useRef, useCallback, useEffect } from 'react';

//css
import closetRegistStyle from "../closet/CLOSETRegist.module.css";

//redux
import { useSelector, useDispatch} from "react-redux"; 
import {action, changeModalOpen} from "../../../store/ClosetSlice";


const CLOSETRegist = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.closet);
    let dispatch = useDispatch();

    
    ///////파일등록 관련 저장소///////
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [imgSrc, setImgSrc] = useState<string>('');
    const [imageFile, setImageFile] : any = useState();

    // 유저가 올린 파일 이미지를 미리보기로 띄워주는 함수
    const onUploadImage = useCallback((file: any) => {

        setImageFile(file);

        if (!file) {
          return;
        }else{ 
            // file, Blob 객체를 핸들링하는데 사용
            // File, Blob 객체를 사용해 특정 파일을 읽어들여 js에서 파일에 접근할 수 있게 도와줌
            const reader = new FileReader();

            // File 혹은 Blob 을 읽은 뒤 base64로 인코딩한 문자열을
            //FileReader 인스턴스의 result라는 속성에 담아줌
            reader.readAsDataURL(file);
            console.log(reader);

            return new Promise((resolve) => {
                reader.onload = () => {       // FileReader가 성공적으로 파일을 읽어들였을 때 트리거 되는 이벤트 핸들러
                                              // 이 내부에 우리가 원하는 로직을 넣어주면 됨
                                              // 이번과 같은 경우는 setState로 img값 받기
                    setImgSrc(reader.result);
                    resolve();
                };
            });

        }
    }, []);


    ///////select box 메뉴///////
    interface ClothesType{
        value: string,
        name: string
    };
    const selectList:Array<ClothesType|null> = [
        { value: "TOP", name: "상의" },
        { value: "BOTTOM", name: "하의" },
        { value: "SHOE", name: "신발" },
        { value: "ACCESSORY", name: "악세서리" },
    ];   

    const [selected, setSelected] = useState<string>("TOP");//선택된 값을 저장


    //////유저 입력 정보///////

    //select 값이 변하면 선택된 값을 변경
    const handleSelect = (e: any) => {
        setSelected(e.target.value);
    };

    // 옷이름, 브랜드명, 특이사항 저장
    const [clothesName, setClothesName] = useState<string>("");
    const [clothesBrand, setClothesBrand] = useState<string>("");
    const [specialContent, setSpecialContent] = useState<string>("");

    const handleClothesName = (e:any) => {
        setClothesName(e.target.value);
    };

    const handleClothesBrand = (e:any) => {
        setClothesBrand(e.target.value);
    };

    const handleSpecialContent = (e:any) => {
        setSpecialContent(e.target.value);
    }

    // 유저가 옷을 등록하려고 시도함 -> 정보들을 redux에 올림 -> redux에서 axios로 백엔드 api 부르기 시도
    // 유저가 옷을 등록하려고 입력한 정보들
    const saveClothes = async() => {
        let clothesSaveRequestDto = {
            userId:1,
            type:selected,
            name:clothesName,
            brand:clothesBrand,
            info:specialContent,
        }


        // 이미지 폼데이터로 저장
        const formdata = new FormData();

        formdata.append("s3upload",imageFile);
        formdata.append("clothesSaveRequestDto", new Blob([JSON.stringify(clothesSaveRequestDto)],{ type: "application/json" }));


        dispatch(action.saveClothes(formdata));
        
    }


    // 등록, 수정, 읽기 모달창 //mode는 c(1) r(2) u(3)
    // 수정이나 읽기일 경우 정보와 이미지를 미리 띄워주는 것이 필요하다.
    useEffect(()=>{
        if(state.mode===2||state.mode===3){
            dispatch(action.getClothInfo(state.clothesId));
            
            // 옷구분 초기 값 셋팅
            if(state.clothInfo?.type==="TOP"){
                setSelected("상의");
            }else if(state.clothInfo?.type==="BOTTOM"){
                setSelected("하의");
            }else if(state.clothInfo?.type==="SHOE"){
                setSelected("신발");
            }else if(state.clothInfo?.type==="ACCESSORY"){
                setSelected("악세서리");
            }else if(state.clothInfo?.type==="ALL"){
                setSelected("전체");
            }
            

            //옷 이름 초기 값 셋팅
            setClothesName(state.clothInfo?.name);
            //브랜드명 초기 값 셋팅
            setClothesBrand(state.clothInfo?.brand);
            //특이사항 초기 값 셋팅
            setSpecialContent(state.clothInfo?.info);
        }
    },[state.clothInfo, state.clothesId])


    return(
        <div>
            {/* clothInfo */}
            {/* 모달 헤더 */}
            <div className={`${closetRegistStyle.modal}`}>
                {/* 옷등록, 닫기버튼 */}
                <div className={`${closetRegistStyle.modalHeader}`}>
                    {state.mode===1?<p>옷 등록</p>:(state.mode===2?<p>옷 정보</p>:<p>옷 수정</p>)}
                    <img src={process.env.PUBLIC_URL+`/img/clothes/closeBtn.png`} onClick={()=>{dispatch(changeModalOpen(false))}}/>
                </div>

                {/* 모달 바디 */}
                <div>
                    {/* 이미지 등록 */}
                    {
                        state.mode===1?
                        <div className={`${closetRegistStyle.imgRegist}`}>
                            {imgSrc?<img className={`${closetRegistStyle.img}`} src={imgSrc}/>:""}
                        </div>:(state.mode===2 || state.mode===3?
                        <div className={`${closetRegistStyle.imgRegist}`}>
                            <img className={`${closetRegistStyle.img}`} src={state.clothInfo?.photoLink}/>
                        </div>:null)
                    }

                    {/* 파일선택 */}
                    {state.mode===1?
                    <form id="formElem" encType="multipart/form-data">
                        <input className={`${closetRegistStyle.selectFile}`} type="file" accept="image/*" ref={inputRef} onChange={(e)=>{onUploadImage(e.target.files[0])}} />
                    </form>:null}

                    {/* input */}
                    <div>
                        {/* 드롭다운 라인 */}
                        {state.mode===1 || state.mode===3?<div className={closetRegistStyle.line}>
                            <p>옷 구분</p>
                            <select style={{marginLeft:"2%"}} className={closetRegistStyle.select} onChange={(e)=>handleSelect(e)} value={selected}>
                                    {selectList?.map((item:ClothesType) => {
                                        return(
                                            <option value={item.value} key={item.value}>
                                                {item.name}
                                            </option>
                                        );
                                        
                                    })}
                            </select>
                        </div>:
                        // 이 부분 value는 데이터 오는 거에 따라 달라지는 걸로 변경해야함
                        <div className={closetRegistStyle.line} style={{marginTop:"5%"}}>
                            <p>옷 구분 </p>
                            <input style={{marginLeft:"2%"}} className={closetRegistStyle.input} value={selected} readOnly></input>
                        </div>}


                        {/* 옷이름 라인 */}
                        {state.mode===1 || state.mode===3?<div className={closetRegistStyle.line} style={{marginTop:"-1%"}}>
                            <p>옷 이름 </p>
                            <input style={{marginLeft:"2%"}} className={closetRegistStyle.input} value={clothesName} onChange={(e)=>handleClothesName(e)}></input>
                        </div>:<div className={closetRegistStyle.line} style={{marginTop:"-1%"}}>
                            <p>옷 이름 </p>
                            <input style={{marginLeft:"2%"}} className={closetRegistStyle.input} value={clothesName} readOnly/>
                        </div>}

                        {/* 브랜드명 라인 */}
                        {state.mode===1 || state.mode===3?<div className={closetRegistStyle.line} style={{marginTop:"-1%"}}>
                            <p>브랜드명 </p>
                            <input className={closetRegistStyle.input} onChange={(e)=>handleClothesBrand(e)} value={clothesBrand}></input>
                        </div>:<div className={closetRegistStyle.line} style={{marginTop:"-1%"}}>
                            <p>브랜드명 </p>
                            <input className={closetRegistStyle.input} value={clothesBrand} readOnly/>
                        </div>}

                        {/* 특이사항 라인 */}
                        {state.mode===1 || state.mode===3?<div className={closetRegistStyle.line} style={{}}>
                            <p>특이사항</p>
                            <textarea className={closetRegistStyle.input} style={{height:"100px"}} value={specialContent} onChange={(e)=>handleSpecialContent(e)}/>
                        </div>:<div className={closetRegistStyle.line} style={{}}>
                            <p>특이사항</p>
                            <textarea className={closetRegistStyle.input} style={{height:"100px"}} value={specialContent} readOnly/>
                        </div>}
                    </div>
                </div>

                {/* 버튼 2개 */}
                <div className={`${closetRegistStyle.buttons}`}>
                    {state.mode===1 || state.mode===3?<button onClick={()=>{dispatch(changeModalOpen(false))}}>취소</button>:
                    <button onClick={()=>{dispatch(changeModalOpen(false))}}>닫기</button>}

                    {/* 옷 등록할 때 로딩바 필요 */}
                    {state.mode===1?<button onClick={()=>{saveClothes();dispatch(changeModalOpen(false))}}>업로드</button>: 
                    (state.mode===2?null:<button onClick={()=>{dispatch(changeModalOpen(false))}}>수정</button>)
                    }
                </div>



            </div>

        </div>
    );
}

export default CLOSETRegist;