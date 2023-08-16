import { useEffect, useState, useRef, useCallback } from "react";
import {useParams, useNavigate} from 'react-router-dom';

// 소켓 통신
import SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';

import { getCookie } from "../../../hook/Cookie";

//css
import liveChatStyle from "./LiveChat.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action_live, changeExitAlam, changeLiveEndAlert, pushAnyChatList, sendPickListChat, changeAreYouKick} from "../../../store/StreamingSlice";

const LiveChat = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.streaming);
    let dispatch = useDispatch();

    const navigate = useNavigate();
    
    const params = useParams();

    let token = getCookie("Authorization");

    const headers = {
        Authorization : `Bearer ${token}`,
    };

    //새로운 정보 가공 이미지와 채팅 모두 필요하기 때문
    interface anyChatList{
        nickname:string,
        chatContent : string|null,
        badge : string|null,
        image:[
            {
                type:string|null, //CLOTHES OR FEED
                photoLink:string|null
            }
        ]
    }

    interface ChatSend{
        chatContent : string,
        token : string,
        roomId : string,
    }

    interface ChatReceive{
        roomId:string,
        chatContent:string,
        nickname:string,
        time:string,
        badge:string,
    }

    interface ImgSend{
        image:[
            {
                type:string, //CLOTHES OR FEED
                photoLink:string
            }
        ],
        token:string,
        roomId:string
    }

    interface ImgSendSplit{
            
        type:string, //CLOTHES OR FEED
        photoLink:string
            
    }

    interface ImgReceive{
        image:[
            {
                type:string, //CLOTHES OR FEED
                photoLink:string
            }
        ],
        nickname:string,
        time:string,
        roomId:string,
        badge:string,
    }


    let [chatList, setChatList] = useState<anyChatList[]>([]);
    let [chat, setChat] = useState<string|null>(''); //내가 치고 있는 채팅
    let [enterMembers, setEnterMemebers] = useState<string[]>([]); //방에 참여하고 있는 사람들의 닉네임

    //지금 내가 어떤 id를 가진 유저인지 확인
    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
    const myId:number = loginUser.id;
    const nickname:string = loginUser.nickname; //나의 닉네임
    const roomId  = String(params.roomId);


    const client = useRef({}); //useRef는 저장공간 또는 DOM요소에 접근하기 위해 사용되는 React Hook == like query selector
    


    ///////파일등록 관련 저장소///////
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [imgSrc, setImgSrc] = useState<ImgSendSplit>();
    const [imgSrcList, setImgSrcList] = useState<ImgSendSplit[]>([]);
    const [imageFile, setImageFile] : any = useState();

    // 방 생성할 때 생성되는 uuid임 -> 어디에서 가져와야하는지 설명 필요
    // const roomCode = `9e2d5fca-93e8-4c15-a2ab-7d03b9714ae8`;
    const roomCode = String(JSON.parse(sessionStorage.getItem("chatCode")));

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
            console.log(`reader = ${reader}`);

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

    // 스크롤 조절하기
    const scrollRef = useRef();//스크롤 조절
    const chatDiv = document.getElementsByClassName("totalChat");
    chatDiv.scrollTop = chat.scrollHeight;

    useEffect(() => {
    	// 현재 스크롤 위치 === scrollRef.current.scrollTop
        // 스크롤 길이 === scrollRef.current.scrollHeight
        if (scrollRef.current) {
            // 현재 스크롤 위치 === scrollRef.current.scrollTop
            // 스크롤 길이 === scrollRef.current.scrollHeight
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    });

    // 1. 서버와 소켓 연결 - jwt 토큰을 넣어야함
    function connect(){
        //SOCK JS 클라이언트를 만든다.
        const socket = new SockJS('http://localhost:8081/ws');

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

    //2. 채팅방 다대다 구독, 이미지 전송도 가능
    function subscribe(){
        console.log("현재 2 subscribe이다.");

        // publishInit(); //최초 한 번 init 요청을 보낸다.
        
        client.current.subscribe('/sub/roomChat/'+roomCode,(chatMessage)=>{
            const message = JSON.parse(chatMessage.body);

            console.log(message);

            let addData={
                nickname:message.nickName,
                chatContent : message.chatContent,
                image:null,
                badge:message.badge,
            }

            console.log(message)
            console.log(addData.nickname);
            console.log(addData.chatContent);
            console.log(addData.image)

            dispatch(pushAnyChatList(addData));

            console.log(`list ${state.anyChatList.chatContent}`);
            console.log(`list ${state.anyChatList.image}`);

            setChatList((_chatList)=>[
                ..._chatList, addData
            ]);

        });

        client.current.subscribe('/sub/roomChat/image/'+roomCode,(chatMessage)=>{
            const messageImg = JSON.parse(chatMessage.body);

            let addImgData={
                nickname:loginUser.nickname,
                chatContent : null,
                image:messageImg.image,
                badge:messageImg.badge,
            }

            console.log(messageImg)

            dispatch(pushAnyChatList(addImgData));

            setChatList((_chatList)=>[
                ..._chatList, addImgData
            ]);

        });


        //---------------------------------------


        //init 요청 -> 응답옴 -> 메세지를 받은 유저들 참여 유저 리스트 다시 받아오게 하기

        client.current.subscribe('/sub/roomChat/user/init/'+roomCode,(chatMessage)=>{
            const messageInit = JSON.parse(chatMessage.body);

            console.log(messageInit);

            // {userId: 1, nickName: '산하', badge: 'X', profileImage: 'https://howdobucket.s3.ap-northeast-2.amazonaws.com/DefaultProfile.png'}

            if(loginUser.id===messageInit.userId){
                publish(`${messageInit.nickName}님이 입장하셨습니다.`);
            }
            dispatch(action_live.peopleList({userId:myId, roomId: roomId}));
            

        });

        client.current.subscribe('/sub/roomChat/user/kick/'+roomCode,(chatMessage)=>{
            const messageKick = JSON.parse(chatMessage.body);

            console.log(messageKick);

            // userId : 1,
            // nickName : "하하하"

            publish(`${messageKick.nickName}님이 강퇴당하셨습니다.`);

            if(loginUser.id===messageKick.userId){
                dispatch(changeAreYouKick(true));
                disconnect();
            }

            //강퇴당한 후 리스트 재 업로드
            dispatch(action_live.peopleList({userId:myId, roomId: roomId}));
            

        });


        client.current.subscribe('/sub/roomChat/user/out/'+roomCode,(chatMessage)=>{
            const messageOut = JSON.parse(chatMessage.body);

            console.log(messageOut);

            // {
            //     userId : 1,
            //     nickName : "하하하",
            //     badge : "x",
            //     command : "master"
            // }

            //방이 폭파된 경우
            if(messageOut.command==="master"){
                console.log(`라이브 종료`);
                dispatch(changeLiveEndAlert(true)); //모든 유저에게 리스트 페이지로 가면 alert를 주세요.
                disconnect();
            }

            //시청자가 방을 나간 경우 브로드 캐스트 메세지
            else if(messageOut.command==="viewer"){
                
                //유저가 퇴장하면 시청자 재업로드
                dispatch(action_live.peopleList({userId:myId, roomId: roomId}));
                
                if(loginUser.id===messageOut.userId){
                    publish(`${messageOut.nickName}님이 퇴장하셨습니다.`);
                }

                //퇴장하는 사람 연결을 끊는다.
                if(loginUser.id===messageOut.userId){
                    dispatch(changeExitAlam(true));
                    disconnect();
                }
            }

        });



        //---------------------------------------

    }


    //3-1. 채팅방에 메세지를 보낸다. (사전 셋팅)
    function sendMessage(event, chat){
        event.preventDefault();//버튼 눌렀을 때 새로고침 방지
        
        if(chat.trim()!==""){//빈문자열 입력 방지
            console.log("현재 3-1 sendMessage이다.");
            publish(chat);
            setChat('');
        }

    }


    //3-2. 채팅방에 이미지를 보낸다. (사전 셋팅)
    function sendImgMessage(){
        
        if(chat!==""){//빈문자열 입력 방지
            publishImg(state.pickList);
        }
        else if(imgSrc!==null){
            console.log("이미지 사전 셋팅");
            publishImg(state.pickList);//이 때는 이미지 주소를 보낼 것임
        }
    }



    //4. 채팅방에 init 메세지를 보낸다.
    function publishInit(){

        if(!client.current.connected){
            console.log("현재 publishInit 연결되지 않았따!");
            return;
        }
        console.log("현재 publishInit 연결되었다!");
        // 일단 나는 유저 1로 고정됨 추후 유동적으로 바꿔야함
        client.current.publish({
            destination: '/pub/roomChat/user/init/'+roomCode,
            body: {},
            headers
        });
        console.log("현재 publishInit publish가 지났따.");
    }

    //4. 채팅방에 kick 메세지를 보낸다.
    function publishKick(){

        //userId, roomId

        if(!client.current.connected){
            console.log("현재 publishKick 연결되지 않았따!");
            return;
        }
        console.log("현재 publishKick 연결되었다!");
        // 일단 나는 유저 1로 고정됨 추후 유동적으로 바꿔야함
        client.current.publish({
            destination: '/pub/roomChat/user/kick/'+roomCode,
            body: JSON.stringify({
                userId:state.kickUser.userId,
                roomId:state.kickUser.roomId
            }),
            headers
        });
        console.log("현재 publishKick publish가 지났따.");
    }


    //4. 채팅방에 out 메세지를 보낸다. -> 방장
    function publishOut(){

        //redux -> liveEndRoomNo

        if(!client.current.connected){
            console.log("현재 publishOut 연결되지 않았따!");
            return;
        }
        console.log("현재 publishOut 연결되었다!");
        // 일단 나는 유저 1로 고정됨 추후 유동적으로 바꿔야함
        client.current.publish({
            destination: '/pub/roomChat/user/out/'+roomCode,
            body: JSON.stringify({
                roomId:state.liveEndRoomNo
            }),
            headers
        });
        console.log("현재 publishOut가 지났따.");
    }


    //4. 채팅방에 out 메세지를 보낸다. -> 일반 유저
    function publishOutUser(){

        //redux -> liveEndRoomNo

        if(!client.current.connected){
            console.log("현재 publishOut2 연결되지 않았따!");
            return;
        }
        console.log("현재 publishOut2 연결되었다!");
        // 일단 나는 유저 1로 고정됨 추후 유동적으로 바꿔야함
        client.current.publish({
            destination: '/pub/roomChat/user/out/'+roomCode,
            body: JSON.stringify({
                roomId:state.exitRoomNo
            }),
            headers
        });
        console.log("현재 publishOut2가 지났따.");
    }


    //4. 채팅방에 메세지를 보낸다. (서버전송)
    function publish(chat:string){

        if(!client.current.connected){
            console.log("현재 4 연결되지 않았따!");
            return;
        }
        console.log("현재 4 연결되었다!");
        // 일단 나는 유저 1로 고정됨 추후 유동적으로 바꿔야함
        client.current.publish({
            destination: '/pub/roomChat/'+roomCode,
            body: JSON.stringify({
                chatContent : chat,
                token : token,
                roomId : roomId,
            }),
            headers
        });
        console.log("현재 4 publish가 지났따.");
        console.log(`token ${token}`);

        setChat('');
    }

    //4. 채팅방에 이미지를 보낸다. (서버전송)
    function publishImg(chatImg:ImgSendSplit){
        if(!client.current.connected){
            console.log("연결이 안되서 실패한 거 같은데");

            return;
        }

        client.current.publish({
            destination: '/pub/roomChat/image/'+roomCode,
            body: JSON.stringify({
                image:chatImg,
                token:token,
                roomId:roomId
            }),
            headers
        });
        
        dispatch(sendPickListChat(false));//다시 사진 보낼 수 있게 수정
    }

    //5. 채팅 종료
    function disconnect() {
        client.current.disconnect();
    };

    //화면 들어올 시 init 요청을 보낸다.
    // useEffect(()=>{
        
    // },[])

    // 화면 들어올 시 초기화 단 1회
    useEffect(() => {

        connect();

        publishInit();

        return () => {

          disconnect();
        }
    }, []);

    
    // 텍스트는 아래 버튼을 통해 sendMessage로 간다.
    // 즉 이미지 전송 요청이 들어왔을 때 연결
    useEffect(() => {
        sendImgMessage();
    }, [state.sendImg]);

    //강퇴 유저가 발생했을 시 -> 강퇴 처리 -> Live 페이지에서 강퇴 유저 null처리 후 리스트 다시 불러옴
    useEffect(()=>{

        if(state.kickUser!==null){
            console.log(`state.kickUser: ${state.kickUser}`);
            publishKick();
        }

    },[state.kickUser])


    //방장이 라이브 종료했을 시 -> redux liveEndByHost=true
    //roomId를 보내면 됨, 토큰이 유저를 구분함
    useEffect(()=>{

        if(state.liveEndRoomNo!==null){
            console.log(`state.liveEndRoomNo: ${state.liveEndRoomNo}`);
            publishOut();
        }

    },[state.liveEndRoomNo])


    //방장이 아닌 유저가 라이브를 나갔을 때 -> redux exitLiveByUser=true
    //roomId를 보내면 됨, 토큰이 유저를 구분함
    console.log(state.exitRoomNo);
    useEffect(()=>{

        if(state.exitRoomNo!==null){
            console.log(`state.liveEndRoomNo: ${state.exitRoomNo}`);
            publishOutUser();
            console.log(`들어왓다!!!`);
        }

    },[state.exitRoomNo])


    // changeColor
    function changeColor(badge){
        console.log(badge);
        if(badge==="X"){
            return `${liveChatStyle.X}`;;
        }
        else if(badge==="LOVELY"){
            return `${liveChatStyle.lovelyBadge}`;
        }
        else if(badge==="NATURAL"){
            return `${liveChatStyle.naturalBadge}`;
        }
        else if(badge==="MODERN"){
            return `${liveChatStyle.modernBadge}`;
        }
        else if(badge==="SEXY"){
            return `${liveChatStyle.sexyBadge}`;
        }

    }

    // feed or cloth에 따른 사진 크기 css
    function clothorfeed(type){
        if(type==="CLOTHES"){
            return `${liveChatStyle.sendImgCLOTHES}`;
        }

        else if(type==="FEED"){
            return `${liveChatStyle.sendImgFEED}`;
        }
    }



    return(
        <div className={`${liveChatStyle.total}`}>
            {/* 해더 */}
            <div className={`${liveChatStyle.chatHeader}`}>CHAT</div>
            {/* 채팅 본문 */}
            <div className={`${liveChatStyle.chatArea} ${liveChatStyle.totalChat}`} ref={scrollRef}>
                {   
                    state.anyChatList?.map((one, index)=>{
                        console.log(one);
                        return(
                            <div>
                                <div key={index} className={`${liveChatStyle.mainChatArea}`}>
                                    <div className={`${changeColor(one.badge)}`}>{`${one?.nickname} `} </div>
                                    {one?.chatContent!==null?
                                        <div className={`${liveChatStyle.content}`}>{one.chatContent}</div>:null
                                    }
                                </div>
                                <div>
                                    <div className={liveChatStyle.sendImgWrapper}>
                                    {
                                        one?.image?.length>0?
                                        one?.image?.map((oneSrc, imgIndex)=>{
                                            return(
                                                <div className={`${clothorfeed(oneSrc.type)}`} key={imgIndex}>
                                                    <img src={`${oneSrc.photoLink}`}/>
                                                </div>
                                            );
                                        }):null
                                    }
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
                <div className={`${liveChatStyle.chatContent}`}>
                    <form className={`${liveChatStyle.sendArea}`} onSubmit={(event) => sendMessage(event, chat)}>
                        <input type="text" placeholder="메세지를 입력하세요." value={chat} onChange={(event)=>{setChat(event.target.value)}}/>
                        <button type={'submit'}>전송</button>
                    </form>
                </div>
        </div>
    );
    
}

export default LiveChat;