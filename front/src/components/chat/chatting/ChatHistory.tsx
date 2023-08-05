import { useEffect, useState, useRef } from "react";
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import * as StompJs from '@stomp/stompjs';

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

    interface ChatList{
        userId:string,
        roomId:string,
        chatContent:string,
    }

    let [chatList, setChatList] = useState<ChatList[]|null>([]); //채팅방 사람들의 채팅 내역들
    let [chat, setChat] = useState<string|null>(''); //내가 치고 있는 채팅
    let [otherNickname, setNickname] = useState<string>(''); //상대방 닉네임

    const nickname:string = "user3"; //나의 닉네임
    // const profileImg = JSON.parse(); //로그인 구현시 가져올 것
    // const userId = JSON.parse(); //로그인 구현 시 가져올 것

    const client = useRef({}); //useRef는 저장공간 또는 DOM요소에 접근하기 위해 사용되는 React Hook == like query selector
    const scrollRef = useRef(); //스크롤 조절
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior : 'smooth'});
    }, [state.chatHistory])

    // 1. 서버와 소켓 연결
    function connect(){
        // 클라이언트 소켓 생성
        client.current = new StompJs.Client({
            brokerURL : 'ws://localhost:8081/ws',
            onConnect: () => {
                subscribe();
            }
        });

        client.current.activate();
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
                chatId: null,
                userNickName: nickname,
                userProfile: null,
                createTime: totalTime,
                content: message.chatContent
            }

            console.log(message)

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
                // chatRoomId:1,
                // chatId : null,
                // userNickName: nickname,
                // userProfile:null,
                // createTime:null,
                // content:chat,
            })

        });

        setChat('');
    }


    //5. 채팅 종료
    function disconnect() {
        client.current.deactivate();
    };

    //지금 내가 어떤 id를 가진 유저인지 확인
    const myId:number = 1;
    let otherId = params.otherId;

    //채팅 같은 날짜 한 번만 들어오게 하기 위한 변수
    let [chatDate, setChatDate] = useState<string>("");
    let [dateDisplay, setDateDisplay] = useState<boolean>(false);
    function changeDate(date:string){
        setChatDate(date);
        setDateDisplay(true);
    }

    function chageDateDisplay(){
        setDateDisplay(false);
    }


    // 화면 들어올 시 초기화
    useEffect(() => {

        // url 접근 막기
        // let roomId2 = localStorage.getItem("roomId")
        // if (roomId2 == null) {
        //   navigate("/home")
        //   return
        // }
    
        // let userId = JSON.parse(sessionStorage.getItem("loginUser")).id;
        
        // 과거 채팅했던 내역을 가져와서 저장해야함
        dispatch(action.enterChatRoom({myId, otherId}));

        connect();

        // 내 채팅 정보는 시간과 내 채팅정보만 있으면 된다.
    
        return () => {
        //   localStorage.removeItem("roomId")
          disconnect();
        }
      }, []);

    return(
        <div className={`${chatHistoryStyle.total}`}>
            <div className={`${chatHistoryStyle.totalChat}`}>
                {state.chatHistory?.chatContext && state.chatHistory?.chatContext.map((one, idx)=>{
                    return(
                        <div key={idx} className={`${chatHistoryStyle.chatArea}`}>
                            {/* 날짜 */}
                            
                            {
                                chatDate===one.createTime.split("T")[0]?null:changeDate(one.createTime.split("T")[0])
                                
                            }
                            {
                                dateDisplay?<div className={`${chatHistoryStyle.date}`}><div>{one.createTime.split("T")[0]}</div></div>
                                :null
                            }

                            {params.otherId===one.userId?<div className={`${chatHistoryStyle.oneChat}`}>
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
                                            {Number(one.createTime.split("T")[1].split(":")[0])<12?"오전 ":"오후 "}
                                            {one.createTime.split("T")[1].split(":")[0]}:
                                            {one.createTime.split("T")[1].split(":")[1]}
                                            <div ref={scrollRef}></div>
                                        </div>

                                    </div>
                                </div>
                            </div> :
                            <div className={`${chatHistoryStyle.oneChat2}`}>
                                <div className={`${chatHistoryStyle.mid2}`}>    
                                    <div className={`${chatHistoryStyle.midTime}`}>
                                        {Number(one.createTime.split("T")[1].split(":")[0])<12?"오전 ":"오후 "}
                                        {one.createTime.split("T")[1].split(":")[0]}:
                                        {one.createTime.split("T")[1].split(":")[1]}
                                    </div>
                                    <div className={`${chatHistoryStyle.midContent}`}>{one.content}</div>
                                    <div ref={scrollRef}></div>
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