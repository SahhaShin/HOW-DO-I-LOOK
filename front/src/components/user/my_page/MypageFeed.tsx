import React, { useEffect, useState } from 'react';

//css
import mypageFeedStyle from "./MypageFeed.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action_mypage,changeFollowModalOpen, changeFollowMode, changeMypageMode} from "../../../store/MypageSlice";

//컴포넌트
import MypageFeedMenu from "./MypageFeedMenu";
import Pagination from '../../util/Pagination';
import MyFeedSlot from "./MypageFeedSlot";


const MypageFeed = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.mypage);
    let dispatch = useDispatch();

    // 페이지네이션, 옷 관리
    const [clothes, setPosts] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    //피드 리스트
    let [feedList, setFeedList] = useState<number[]|null>([1,2,3,4,5,6]); 

    //로그인 유저
    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

    useEffect(()=>{
        dispatch(action_mypage.getFeedList(loginUser.id));
    },[])

    return(
        <div className={`${mypageFeedStyle.total}`}>
            {/* 타이틀 */}
            <div className={`${mypageFeedStyle.title}`}>Feed</div>

            {/* 두가지 버튼 : my reaction */}
            {state.mypageMode===1?<div className={`${mypageFeedStyle.btns}`}>
                <MypageFeedMenu/>
            </div>:null}

            {/* 피드 리스트 */}
            <div className={`${mypageFeedStyle.feeds}`}>
                {
                    state.feedList?.content.map((oneFeed)=>{
                        return(
                            <div>
                                <MyFeedSlot feedInfo={oneFeed}/>
                            </div>

                        );
                    })
                }
            </div>

            {/* 페이지네이션 */}
            <div className={`${mypageFeedStyle.pagenation}`}>
                <Pagination
                    total={20}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                />
            </div>
        </div>
    );
}

export default MypageFeed;