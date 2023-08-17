import { useEffect, useState, useRef } from "react";
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

// 소켓 통신
import SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';

import { getCookie } from "../../../hook/Cookie";

//css
import chatHistoryStyle from "./ChatHistory.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action, addChatHistory} from "../../../store/ChatSlice";

const ChatHistory = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.chat);
    let dispatch = useDispatch();

    const navigate = useNavigate();
    
    const params = useParams();

    let token = getCookie("Authorization");

    const headers = {
        Authorization : `Bearer ${token}`,
    };

    
    interface ChatList{
        "chatRoomId": number,
        "userNickName": string,
        "userProfile": string|null,
        "time": string,
        "content": string
    }
    
    let [chatList, setChatList] = useState<ChatList[]|null>([]); //채팅방 사람들의 채팅 내역들
    let [chat, setChat] = useState<string|null>(''); //내가 치고 있는 채팅
    let [otherNickname, setNickname] = useState<string>(''); //상대방 닉네임
   
    //지금 내가 어떤 id를 가진 유저인지 확인
    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
    const myId:number = loginUser.id;
    let otherId = params.otherId;
    
    const nickname:string = loginUser.nickname; //나의 닉네임
    // const profileImg = JSON.parse(); //로그인 구현시 가져올 것
    // const userId = JSON.parse(); //로그인 구현 시 가져올 것

    const client = useRef({}); //useRef는 저장공간 또는 DOM요소에 접근하기 위해 사용되는 React Hook == like query selector
    
    // 스크롤 조절하기
    const scrollRef = useRef();//스크롤 조절
    const chatDiv = document.getElementsByClassName("totalChat");
    chatDiv.scrollTop = chat.scrollHeight;

    useEffect(() => {
    	// 현재 스크롤 위치 === scrollRef.current.scrollTop
        // 스크롤 길이 === scrollRef.current.scrollHeight
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });




    // 1. 서버와 소켓 연결
    function connect(){
        //SOCK JS 클라이언트를 만든다.
        // const socket = new SockJS('http://localhost:8081/ws');
        const socket = new SockJS('https://i9b304.p.ssafy.io:8081/ws');

        client.current = StompJs.Stomp.over(socket); //연결 요청

        // 클라이언트 소켓 생성
        // client.current = new StompJs.Client({
        //     brokerURL : 'ws://localhost:8081/ws',
        //     onConnect: () => {
        //         subscribe();
        //     }
        // });

        client.current.connect(headers,()=>{
            subscribe();
        })

        // client.current.activate();
    }

    //2. 채팅방 1:1 구독
    function subscribe(){

        // 현재 시간 구하기
        let today = new Date();
        let year:string = String(today.getFullYear()); // 년도
        let month:string = String(today.getMonth() + 1);  // 월
        let date:string = String(today.getDate());  // 날짜
        let hours:string = String(today.getHours()); // 시
        let minutes:string = String(today.getMinutes());  // 분
        let seconds:string = String(today.getSeconds());  // 초

        if(month.length==1) month="0"+month;
        if(date.length==1) date="0"+date;
        if(hours.length==1) hours="0"+hours;
        if(minutes.length==1) minutes="0"+minutes;
        if(seconds.length==1) seconds="0"+seconds;

        let totalTime = year+"-"+month+"-"+date+"T"+hours+":"+minutes+":"+seconds;

        client.current.subscribe('/sub/soloChat/'+params.chatroomCode,(chatMessage)=>{
            const message = JSON.parse(chatMessage.body);

            let addData={
                chatRoomId: message.roomId,
                userNickName: nickname,
                userProfile: null,
                time: totalTime,
                content: message.chatContent
                // chatId: null,
            }


            dispatch(addChatHistory(addData));

            setChatList((_chatList)=>[
                ..._chatList, message
            ]);

        });
    }

    //3. 채팅방에 메세지를 보낸다. (사전 셋팅)
    function sendMessage(event, chat){
        event.preventDefault();//버튼 눌렀을 때 새로고침 방지
        
        if(chat!==""){//빈문자열 입력 방지
            publish(chat);
        }
    }

    //4. 채팅방에 메세지를 보낸다. (서버전송)
    function publish(chat){

        if(!client.current.connected){
            return;
        }
        // 일단 나는 유저 1로 고정됨 추후 유동적으로 바꿔야함
        client.current.publish({
            destination: '/pub/soloChat/'+params.chatroomCode,
            body: JSON.stringify({
                chatContent:chat,
                roomId: params.roomId,
                userId: myId,
            }),
            headers
        });

        setChat('');
    }


    //5. 채팅 종료
    function disconnect() {
        client.current.disconnect();
    };


    //채팅 같은 날짜 한 번만 들어오게 하기 위한 변수
    let [chatDate, setChatDate] = useState<string>("");
    let [dateDisplay, setDateDisplay] = useState<boolean>(false);


    // 화면 들어올 시 초기화
    useEffect(() => {

        // 과거 채팅했던 내역을 가져와서 저장해야함 -> chatRoom
        dispatch(action.enterChatRoom({myId, otherId}));
        connect();

        // 내 채팅 정보는 시간과 내 채팅정보만 있으면 된다.
    
        return () => {

          disconnect();
        }
      }, [state.userNickName]);

    return(
        <div className={`${chatHistoryStyle.total}`}>
            <div className={`${chatHistoryStyle.totalChat}`} ref={scrollRef}>
                {state.chatHistory && state.chatHistory?.map((one, idx)=>{
                    const currentDate = one.time?.split("T")[0];
                    const prevMessage = state.chatHistory[idx - 1];

                    // 이전 메시지의 날짜와 현재 메시지의 날짜를 비교하여 다른 경우에만 날짜 표시
                    const shouldDisplayDate =
                        !prevMessage || prevMessage.time?.split("T")[0] !== currentDate;

                    return(
                        <div key={idx} className={`${chatHistoryStyle.chatArea}`}>
                            {/* 날짜 */}

                            {shouldDisplayDate && (
                                <div className={`${chatHistoryStyle.date}`}>
                                    <div>{currentDate}</div>
                                </div>
                            )}

                            {one.userNickName!==loginUser.nickname?<div className={`${chatHistoryStyle.oneChat}`}>
                                {/* 유저 프로필 */}
                                <div className={`${chatHistoryStyle.profile}`}>
                                    <div className={`${chatHistoryStyle.profileCircle_G}`}>
                                        <img src={process.env.PUBLIC_URL+`/img/user/profileImg.png`}></img>
                                    </div>
                                </div>

                                {/* 유저 닉네임, 내용/시간 */}
                                <div className={`${chatHistoryStyle.mid}`}>
                                 
                                    <div>{one.userNickName}</div>
                                    <div>
                                        <div className={`${chatHistoryStyle.midContent}`}>{one.content}</div>
                                        
                                        <div className={`${chatHistoryStyle.midTime}`}>
                                            {Number(one.time?.split("T")[1].split(":")[0])<12?"오전 ":"오후 "}
                                            {one.time?.split("T")[1].split(":")[0]}:
                                            {one.time?.split("T")[1].split(":")[1]}
                                        </div>

                                    </div>
                                </div>
                            </div> :
                            <div className={`${chatHistoryStyle.oneChat2}`}>
                                <div className={`${chatHistoryStyle.mid2}`}>    
                                    <div className={`${chatHistoryStyle.midTime}`}>
                                        {Number(one.time?.split("T")[1].split(":")[0])<12?"오전 ":"오후 "}
                                        {one.time?.split("T")[1].split(":")[0]}:
                                        {one.time?.split("T")[1].split(":")[1]}
                                    </div>
                                    <div className={`${chatHistoryStyle.midContent}`}>{one.content}</div>
                                </div>
                            </div>}

                        </div>
                    );
                })}
            </div>

            {/* input과 전송 */}
            <div className={`${chatHistoryStyle.sendArea}`}>
            <form className={`${chatHistoryStyle.sendArea}`} onSubmit={(event) => sendMessage(event, chat)}>
                <input type="text" placeholder="메세지를 입력하세요." value={chat} onChange={(event)=>{setChat(event.target.value)}}/>
                <button type={'submit'}>전송</button>
            </form>
                
            </div>

        </div>
        
    );
}


export default ChatHistory;