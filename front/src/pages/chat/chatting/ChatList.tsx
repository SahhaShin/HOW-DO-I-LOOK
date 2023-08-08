import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

//css
import chatStyle from "./ChatList.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action} from "../../../store/ChatSlice";

//컴포넌트
import ChatSlot from "../../../components/chat/chatting/ChatSlot";
import Pagination from "../../../components/util/Pagination";
import FollowSlot from "../../../components/util/FollowSlot";
import Header from "../../../components/util/Header";
import Menu from "../../../components/util/Menu";
import Footer from "../../../components/util/Footer";


const ChatList = () => {

    const navigate = useNavigate();
    

    //redux 관리
    let state = useSelector((state:any)=>state.chat);
    let dispatch = useDispatch();

    // 유저가 참여하고 있는 1:1 채팅방 모든 리스트 띄우기
    interface chatInfo{
        chatRoomCode:string,
    }
    // 아직 챗룸 코드는 고정적임 방 선택에 따라 유동적으로 바꿔야함
    let [chatRoomList, setChatRoomList] = useState<chatInfo[]>([{
        chatRoomCode:"1305594a-7131-43a3-b5b9-8179d8dd67e4",
    }]);

    // 페이지네이션
    const [len, setLen] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;


    // 유저가 소통했던 채팅방 목록 보여주기
    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

    useEffect(() => {
        dispatch(action.getChatList(loginUser.id));
        setLen(state.chatList.length);
    },[])


    return(
        <>
            <div className={`${chatStyle.total}`}>
                <div className={`${chatStyle.header}`}><Header/></div>
                
                <div className={`${chatStyle.main}`}>
                    
                    {/* 메인은 두 영역으로 나뉨 */}
                    
                    <div className={`${chatStyle.menuArea}`}>
                        {/* floating menu start */}
                        <div><Menu/></div>
                    </div>

                    {/* 메인 컨텐츠 시작 */}
                    <div className={`${chatStyle.contentsArea}`}>

                        <div className={`${chatStyle.title}`}>CHAT</div>

                        {/* 채팅 리스트 */}
                        <div className={`${chatStyle.list}`}>
                            {
                                state.chatList?.map((one, index)=>{
                                    return(
                                        <div key={index} className={`${chatStyle.onechat}`}><ChatSlot oneRoom={one} key={index}/></div>
                                    );
                                })
                            }
                        </div>
                        
                        
                        {/* 페이지네이션   20을 {clothes.length}로 바꿔야 함 */}
                        <div className={`${chatStyle.paginationContainer}`}>
                            <Pagination
                                total={20}
                                limit={limit}
                                page={page}
                                setPage={setPage}
                            />
                        </div>
                        
                    </div>

                    <div className={`${chatStyle.menuArea}`}>
                        {/* floating menu start */}
                        <div className={`${chatStyle.followArea}`}>
                            <div className={`${chatStyle.followAreaTitle}`}>Following</div>
                            <FollowSlot/>
                            <FollowSlot/>
                            <FollowSlot/>
                            <FollowSlot/>
                            <FollowSlot/>
                        </div>
                    </div>
                </div>

                <div className={`${chatStyle.footer}`}><Footer/></div>

                
            </div>
        </>
        
    );
}


export default ChatList;