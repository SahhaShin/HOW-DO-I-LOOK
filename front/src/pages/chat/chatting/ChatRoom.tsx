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

    const nickname:string = "1"; //이걸 받아와야함

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
                                <div className={`${chatRoomStyle.nickname}`}>{params.otherId}</div>
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