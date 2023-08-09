import { useEffect, useState, useRef } from "react";
import {useNavigate, useParams} from 'react-router-dom';

//css
import chatRoomStyle from "./ChatRoom.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action} from "../../../store/ChatSlice";

//컴포넌트
import ChatHistory from "../../../components/chat/chatting/ChatHistory";
import Header from "../../../components/util/Header";
import Menu from "../../../components/util/Menu";
import Footer from "../../../components/util/Footer";


const ChatRoom = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.chat);
    let dispatch = useDispatch();

    const navigate = useNavigate();

    const params = useParams();
    // console.log(params);

    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

    useEffect(() => {
        // 과거 채팅했던 내역을 가져와서 저장해야함
        dispatch(action.enterChatRoom({myId:loginUser.id, otherId:params.otherId}));
      }, []);

    return(
        <div className={`${chatRoomStyle.total}`}>
            {/* 헤더 */}
            <div className={`${chatRoomStyle.header}`}><Header/></div>

            {/* 메인 */}
            <div className={`${chatRoomStyle.main}`}>
                {/* 좌측 메뉴 */}
                <div className={`${chatRoomStyle.menuArea}`}><div><Menu/></div></div>

                {/* 우측 채팅하는 ui */}
                <div className={`${chatRoomStyle.mid}`}>
                    <div className={`${chatRoomStyle.chatArea}`}>
                        <div>
                            <div className={`${chatRoomStyle.chatHeader}`}>
                                {/* 닉네임 안들어옴 */}
                                <div className={`${chatRoomStyle.nickname}`}>{state.chatHistory?.anotherNickName}</div>
                                <div onClick={()=>{navigate("/chatList")}} className={`${chatRoomStyle.exitWrapper}`}><button className={`${chatRoomStyle.exit}`}>나가기</button></div>
                            </div>
                            
                        </div>
                        <div className={`${chatRoomStyle.chatting}`}><ChatHistory/></div>

                    </div>
                </div>
            </div>

            {/* 푸터 */}
            <div className={`${chatRoomStyle.footer}`}><Footer/></div>
        </div>
    );
}


export default ChatRoom;