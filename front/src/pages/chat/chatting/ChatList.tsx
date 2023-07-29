import React, { useEffect, useState } from "react";

//css
import chatStyle from "./ChatList.module.css";

//redux
// import { useSelector, useDispatch } from "react-redux"; 
// import {changeModalOpen,changeMode} from "../../../store/ClosetSlice";

//컴포넌트
import ChatSlot from "../../../components/chat/chatting/ChatSlot";
import Pagination from "../../../components/util/Pagination";
import FollowSlot from "../../../components/util/FollowSlot";

const ChatList = () => {

    //redux 관리
    // let state = useSelector((state:any)=>state.closet);
    // let dispatch = useDispatch();

    // 페이지네이션, 옷 관리
    const [clothes, setPosts] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;


    return(
        <>
            <div className={`${chatStyle.total}`}>
                <div className={`${chatStyle.header}`}>header</div>
                
                <div className={`${chatStyle.main}`}>
                    
                    {/* 메인은 두 영역으로 나뉨 */}
                    
                    <div className={`${chatStyle.menuArea}`}>
                        {/* floating menu start */}
                        menu area
                    </div>

                    {/* 메인 컨텐츠 시작 */}
                    <div className={`${chatStyle.contentsArea}`}>

                        <div className={`${chatStyle.title}`}>CHAT</div>

                        {/* 채팅 리스트 */}
                        <div className={`${chatStyle.list}`}>
                            <div className={`${chatStyle.onechat}`}><ChatSlot/></div>
                            <div className={`${chatStyle.onechat}`}><ChatSlot/></div>
                            <div className={`${chatStyle.onechat}`}><ChatSlot/></div>
                            <div className={`${chatStyle.onechat}`}><ChatSlot/></div>
                            <div className={`${chatStyle.onechat}`}><ChatSlot/></div>
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

                <div className={`${chatStyle.footer}`}>footer</div>

                
            </div>
        </>
        
    );
}


export default ChatList;