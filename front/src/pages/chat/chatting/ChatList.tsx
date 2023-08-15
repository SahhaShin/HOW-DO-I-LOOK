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
import ChatFollow from "../../../components/sns/feed/FeedFollow"

const ChatList = () => {

    const navigate = useNavigate();
    

    //redux 관리
    let state = useSelector((state:any)=>state.chat);
    let dispatch = useDispatch();

    // 페이지네이션
    const [len, setLen] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const offset = (page - 1) * limit;



    // 유저가 소통했던 채팅방 목록 보여주기
    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

    useEffect(() => {
        dispatch(action.getChatList({userId:loginUser.id, page:page}));
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
                        
                        
                        <div className={`${chatStyle.paginationContainer}`}>
                            <Pagination
                                total={state.chatList?.length}
                                limit={limit}
                                page={page}
                                setPage={setPage}
                            />
                        </div>
                        
                    </div>

                    <ChatFollow/>
                </div>

                <div className={`${chatStyle.footer}`}><Footer/></div>

                
            </div>
        </>
        
    );
}


export default ChatList;