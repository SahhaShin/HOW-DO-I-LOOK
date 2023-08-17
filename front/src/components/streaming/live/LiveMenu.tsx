import React, { useState, useRef, useCallback, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';

//css
import liveMenuStyle from "./LiveMenu.module.css";

//redux
import { useSelector, useDispatch} from "react-redux"; 
import {action, changePick} from "../../../store/ClosetSlice";
import {action_feed, changePick_feed} from "../../../store/FeedSlice";
import {action_live,changeSelectAdvisor,deletePickList,changeExitRoomNo,changeExitLiveByUser,changeLiveEndRoomNo, changeLiveEndByHost,changeOtherClosetOpen, sendPickListChat, rearrangePickList, addPickList} from "../../../store/StreamingSlice";

// alert창
import Swal from "sweetalert2";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const LiveMenu = () => {

    const navigate = useNavigate();

    interface clothImage{ 
        type:string, //CLOTHES OR FEED
        photoLink:string
    }

    //redux 관리
    let state_closet = useSelector((state:any)=>state.closet);
    let state_feed = useSelector((state:any)=>state.feed);
    let state_live = useSelector((state:any)=>state.streaming);
    
    let dispatch = useDispatch();

    const params = useParams();

    const [selectedMenu, setSelectedMenu] = useState(null);
    const [searchInput, setSearchInput] = useState<string>("");
    const [pickList, setPickList] = useState<clothImage[]>([]);

    const[hostCloset, setHostCloset] = useState(false);

    const handleMenuClick = (menu) => {
      setSelectedMenu(menu);
    };

    // 로그인 유저
    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
    
    //호스트 아이디
    const hostId  = String(params.hostId);
    const roomId = String(params.roomId);


    // 드래그 앤 드랍
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const copyPickList = Array.from(state_live.pickList);
        const [movedItem] = copyPickList.splice(result.source.index, 1);
        copyPickList.splice(result.destination.index, 0, movedItem);

        dispatch(rearrangePickList(copyPickList)); // Redux state 업데이트
    };

    function getClothingClass(index) {
        switch (index) {
            case 0:
                return `${liveMenuStyle.top}`;
            case 1:
                return `${liveMenuStyle.bottom}`;
            case 2:
                return `${liveMenuStyle.shoe}`;
            default:
                return "";
        }
    }

    function getAccessoryClass(index) {
        switch (index) {
            case 3:
                return `${liveMenuStyle.acc1}`;
            case 4:
                return `${liveMenuStyle.acc2}`;
            case 5:
                return `${liveMenuStyle.acc3}`;
            default:
                return "";
        
        }
    }
    

   

    function searchHashtag(){
        const hashList = searchInput.split(" ");
        
        //해시태그 리스트 빈칸 없애고, 앞에 hashtag=??? 이런 줄줄이 글 만들기
        //?hashtag=신발&hashtag=조던
        let count = 0;
        let hashquery = "";
        for(let i=hashList.length;i>=0;i--){
            if(hashList[i]===" " || hashList[i]===""|| hashList[i]===undefined){
                continue;
            }
            else{
                let target = hashList[i].replace("#","hashtag=")

                if(count===0){
                    hashquery = target;
                    count++;
                    console.log(`3 ${hashquery}`);
                }
                else {
                    hashquery = hashquery+"&"+target;
                    count++;
                    console.log(`4 ${hashquery}`);
                }
             }
        }

        console.log(hashquery);


        let info = {
            hashtag:hashquery,
            size:10,
            page:1,
        }

        dispatch(action_feed.hashSearchImgList(info));
    }

    // set 관리 총 6개까지 등록 가능
    function sendPickList(link:string, type:string){
        if(pickList.length>6){
            Swal.fire({
                icon: 'warning',
                title: '꽉 찼어요!',
                text: '세트 옷장은 6개까지만 등록 가능합니다 :)',
                confirmButtonColor: '#EAA595',
            })
            return;
        }
        setPickList({type:type, photoLink:link});
        dispatch(addPickList({type:type, photoLink:link}));

        console.log(`1111 ${pickList.length}`);
    }


    //세트 이미지 삭제
    function handleDeleteClothing(index) {
        const updatedPickList = [...state_live.pickList]; // 현재 리스트 복사
      
        // 선택한 인덱스에 해당하는 사진 제거
        updatedPickList.splice(index, 1);
      
        // Redux 스토어 업데이트
        dispatch(rearrangePickList(updatedPickList));
      
        // setPickList 업데이트
        setPickList(updatedPickList);
      }


    // 이미지 채팅으로 보내기
    function sendImgToChat(){
        dispatch(sendPickListChat(true));
    }

    useEffect(()=>{
        setHostCloset(false);
        if (state_live.otherClosetOpen === true) {
            dispatch(changeOtherClosetOpen(false));
            setTimeout(() => {
                setSelectedMenu("Menu 1");
            }, 0);
        }
    },[state_live.otherClosetOpen, state_live.selectAdvisor])


    // 유저 스스로 퇴장
    function exitLive(){

        Swal.fire({
            icon: "question",
            title: "라이브 퇴장",
            text: `라이브에서 퇴장하시겠습니까?`,
            showCancelButton: true,
            confirmButtonText: "나가기",
            cancelButtonText: "취소",
            confirmButtonColor:'#EAA595',
            customClass: {
                confirmButton: liveMenuStyle.confirmButton, // 모듈화된 CSS 파일에 정의된 클래스 이름을 사용합니다.
                cancelButton: liveMenuStyle.cancelButton // 모듈화된 CSS 파일에 정의된 클래스 이름을 사용합니다.
              }
        }).then((res) => {
            if (res.isConfirmed) {
                dispatch(changeExitLiveByUser(true))
                dispatch(changeExitRoomNo(roomId));
            }
            else{
                
            }
        });
    }

    // 라이브 종료
    //redux에서 liveEndByHost true -> LiveChat에서 인지
    function endLive(){

        Swal.fire({
            icon: "question",
            title: "라이브 종료",
            text: `라이브를 종료하시겠습니까?`,
            showCancelButton: true,
            confirmButtonText: "종료",
            cancelButtonText: "취소",
            confirmButtonColor:'#EAA595',
            customClass: {
                confirmButton: liveMenuStyle.confirmButton, // 모듈화된 CSS 파일에 정의된 클래스 이름을 사용합니다.
                cancelButton: liveMenuStyle.cancelButton // 모듈화된 CSS 파일에 정의된 클래스 이름을 사용합니다.
              }
        }).then((res) => {
            if (res.isConfirmed) {
                dispatch(changeLiveEndByHost(true));
                dispatch(changeLiveEndRoomNo(roomId));
            }
            else{
                
            }
        });
    }


    //세트로 선택한 아이템 삭제
    function removeItem(idx){
        console.log(state_live.pickList);
        const updatedPickList = [...state_live.pickList]; // Create a copy of the pickList array
        updatedPickList.splice(idx, 1); // Remove the item at the specified index

        dispatch(deletePickList(updatedPickList));
    }
  
    return (
      <div className={`${liveMenuStyle.sidebar}`}>
        <div>
            <button onClick={() => {setHostCloset(true);dispatch(action.getClothesListByOrder(hostId)); handleMenuClick("Menu 1")}}><img src={process.env.PUBLIC_URL + '/img/menuIcon/menu1_closet.png'}/></button>
            <button onClick={() => {dispatch(action_feed.hashSearchTotalList()); handleMenuClick("Menu 2")}}><img src={process.env.PUBLIC_URL + '/img/menuIcon/menu2_search.png'}/></button>
            <button onClick={() => {handleMenuClick("Menu 3")}}><img src={process.env.PUBLIC_URL + '/img/menuIcon/menu3_set.png'}/></button>
            <button onClick={() => {dispatch(action_live.getInfo(roomId)); handleMenuClick("Menu 4")}}><img src={process.env.PUBLIC_URL + '/img/menuIcon/menu4_info.png'}/></button>
            
            {/* 내가 호스트인데 나가면 방송종료, 다른 사람이 나가면 퇴장 */}
            {
                String(loginUser.id)!==hostId?
                <button onClick={() => {exitLive(); handleMenuClick("Menu 5")}}><img src={process.env.PUBLIC_URL + '/img/menuIcon/menu5_exit.png'}/></button>
                :
                <button onClick={() => {endLive(); handleMenuClick("Menu 5")}}><img src={process.env.PUBLIC_URL + '/img/menuIcon/menu5_closeLive.png'}/></button>
            }
        </div>
        {selectedMenu === "Menu 1" && <div className={`${liveMenuStyle.menuContent}`} style={{ backgroundColor: "rgb(36,43,62)" }}>
            
            {/* 닫기 버튼 */}
            <div onClick={()=>{setHostCloset(false);setSelectedMenu(null);dispatch(changeOtherClosetOpen(false));}} className={`${liveMenuStyle.outer}`}>
                <div className={`${liveMenuStyle.inner}`}>
                    <label className={`${liveMenuStyle.livelabel}`}>Back</label>
                </div>
            </div>
            <div className={`${liveMenuStyle.statement_CLOSET}`}>
                {   hostCloset || String(state_live.closetOpenAndSendAdvisor.id)===String(hostId)?
                    <p>HOST CLOSET</p>:
                    <p>{state_live.closetOpenAndSendAdvisor?.nickname}'s CLOSET</p>
                }
            </div>

            {/* 전체 옷 리스트 */}
            <div className={`${liveMenuStyle.closetList1}`}>
                {
                    state_closet?.clothesAll.length>0?state_closet?.clothesAll.map((item)=>{
                        return(
                            <div className={`${liveMenuStyle.clothItem}`}>
                                <img onClick={()=>{dispatch(changePick(item.clothesId)); sendPickList(item.photoLink, "CLOTHES")}} src={item.photoLink}/>
                                {item.pick?<div>PICK!</div>:null}
                            </div>
                        );
                    }):<div className={`${liveMenuStyle.noset}`}><img src={process.env.PUBLIC_URL + '/img/live/question.png'}/><div className={`${liveMenuStyle.noItem}`}>등록된 옷이 없습니다.</div></div>
                }    
            </div>  
        </div>}


        {/* 옷 검색 */}
        {selectedMenu === "Menu 2" && <div className={`${liveMenuStyle.menuContent}`} style={{ backgroundColor: "rgb(36,43,62)" }}>
            {/* 닫기 버튼 */}
            <div onClick={()=>{setSelectedMenu(null)}} className={`${liveMenuStyle.outer}`}>
                <div className={`${liveMenuStyle.inner}`}>
                    <label className={`${liveMenuStyle.livelabel}`}>Back</label>
                </div>
            </div>

            <div className={`${liveMenuStyle.statement_CLOSET}`}>
                <p>FEED SEARCH</p>
            </div>
            <div className={`${liveMenuStyle.search}`}>
                <input type='text' value={searchInput} onChange={(e)=>{setSearchInput(e.target.value)}} placeholder='#흰반팔 #청바지'/>
                <button onClick={()=>{searchHashtag()}}>검색</button>
            </div>
            
            {/* 해시태그 검색 옷 리스트 */}
            <div className={`${liveMenuStyle.closetList2}`}>
                {
                    state_feed.mypageFeedPic.length>0?state_feed.mypageFeedPic?.map((item)=>{
                        console.log(item);
                        return(
                            <div className={`${liveMenuStyle.clothItem2}`}>
                                <img style={item.pick===true?{border: "1px solid #4570F5"}:null} onClick={()=>{dispatch(changePick_feed(item.id));sendPickList(item.link, "FEED")}} src={item.link}/>
                                {item.pick?<div className={`${liveMenuStyle.pickLabel}`}>PICK!</div>:null}
                            </div>
                        );
                    }):<div className={`${liveMenuStyle.noset}`}><img src={process.env.PUBLIC_URL + '/img/live/question.png'}/><div className={`${liveMenuStyle.noItem}`}>등록된 피드가 없습니다.</div></div>
                }    
            </div>
        </div>}
        {selectedMenu === "Menu 3" && (
            <div className={`${liveMenuStyle.menuContent}`} style={{ backgroundColor: "rgb(36,43,62)" }}>
                {/* 닫기 버튼 */}
                <div onClick={()=>{setSelectedMenu(null)}} className={`${liveMenuStyle.outer}`}>
                    <div className={`${liveMenuStyle.inner}`}>
                        <label className={`${liveMenuStyle.livelabel}`}>Back</label>
                    </div>
                </div>
                <div className={`${liveMenuStyle.statement}`}>
                    <p>Today</p> <p>Codi</p> <p>Set</p>
                </div>
                <div className={`${liveMenuStyle.statement2}`}>♡ 나의 코디를 전송해보세요 ♡</div>
                <div className={`${liveMenuStyle.closetList3}`}>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className={`${liveMenuStyle.set}`}>       
                                <Droppable droppableId="mainDroppable" direction="horizontal">
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className={`${liveMenuStyle.mainClothes}`}
                                        >
                                            {state_live.pickList.slice(0, 3).map((item, index) => (
                                                <Draggable key={index} draggableId={`item-${index}`} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            ref={provided.innerRef}
                                                            className={`${getClothingClass(index)}`}
                                                        >
                                                            {/* 선택 아이템 삭제 */}
                                                            <img onClick={()=>{removeItem(index)}} src={process.env.PUBLIC_URL+'/img/clothes/closeBtn.png'}/>
                                                            <img src={item.photoLink} />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                        </div>
                                    )}
                                </Droppable>

                            <Droppable droppableId="accessoryDroppable" direction="horizontal">
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={`${liveMenuStyle.subClothes}`}
                                    >
                                        {state_live.pickList.slice(3).map((item, index) => (
                                            <Draggable
                                                key={index + 3}
                                                draggableId={`accessory-${index}`}
                                                index={index + 3}
                                            >
                                                {(provided) => (
                                                    <div
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                        className={`${getAccessoryClass(index+3)}`}
                                                    >
                                                        {/* 선택 아이템 삭제 */}
                                                        <img onClick={()=>{removeItem(index+3)}} src={process.env.PUBLIC_URL+'/img/clothes/closeBtn.png'}/>
                                                        <img src={item.photoLink} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    </div>
                                )}
                            </Droppable>
                            </div>
                    </DragDropContext>
                </div>
                {state_live.pickList.length===0?<div className={`${liveMenuStyle.noset}`}><img src={process.env.PUBLIC_URL + '/img/live/question.png'}/>Pick한 코디가 없습니다!</div>:null}
                <div className={`${liveMenuStyle.submit}`}><button onClick={()=>{sendImgToChat()}}>전송</button></div>
            </div>
        )}
        {selectedMenu === "Menu 4" && <div className={`${liveMenuStyle.menuContent}`} style={{ backgroundColor: "rgb(36,43,62)" }}>
            {/* 닫기 버튼 */}
            <div onClick={()=>{setSelectedMenu(null)}} className={`${liveMenuStyle.outer}`}>
                <div className={`${liveMenuStyle.inner}`}>
                    <label className={`${liveMenuStyle.livelabel}`}>Back</label>
                </div>
            </div>

            <div className={`${liveMenuStyle.statement_CLOSET}`} style={{marginBottom:"80px", marginTop:"30px"}}>
                <p>ROOM INFOMATION</p>
            </div>
            <div className={`${liveMenuStyle.closetList4}`}>
                <div><p>제목</p> <p>{state_live.roomInfo?.title}</p></div>
                <div><p>호스트 나이</p><p>{state_live.roomInfo?.hostAge}</p></div>
                <div><p>호스트 성별</p><p>{state_live.roomInfo?.hostGender}</p></div>
                <div><p>입장제한 최소 나이</p><p>{state_live.roomInfo?.roomMinAge}</p></div>
                <div><p>입장제한 최소 나이</p><p>{state_live.roomInfo?.roomMaxAge}</p></div>
                <div><p>입장 제한 성별</p><p>{state_live.roomInfo?.roomGender}</p></div>
            </div>    
        </div>}
      </div>
    );
    
}

export default LiveMenu;