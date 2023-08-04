import { useEffect, useState, useRef } from "react";
import {useNavigate} from 'react-router-dom';

//css
import chatRoomStyle from "./ChatRoom.module.css";

//컴포넌트
import ChatHistory from "../../../components/chat/chatting/ChatHistory";
import Header from "../../../components/util/Header";
import Menu from "../../../components/util/Menu";
import Footer from "../../../components/util/Footer";


const ChatRoom = () => {

    const navigate = useNavigate();

    const nickname:string = "user3";

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
                                <div className={`${chatRoomStyle.nickname}`}>{nickname}</div>
                                <div onClick={()=>{navigate(-1)}} className={`${chatRoomStyle.exitWrapper}`}><button className={`${chatRoomStyle.exit}`}>나가기</button></div>
                            </div>
                            
                        </div>
                        <div className={`${chatRoomStyle.chatting}`}><ChatHistory/></div>

                        {/* input과 전송 */}
                        {/* <div className={`${chatRoomStyle.sendArea}`}>
                            <input type="text" placeholder="메세지를 입력하세요."/>
                            <button>전송</button>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* 푸터 */}
            <div className={`${chatRoomStyle.footer}`}><Footer/></div>
        </div>
    );
}


export default ChatRoom;