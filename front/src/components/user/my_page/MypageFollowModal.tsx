import React, { useState } from 'react';

//css
import mypageFollowModalStyle from "./MypageFollowModal.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action, changeFollowModalOpen} from "../../../store/MypageSlice";

const MypageFollowModal = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.mypage);
    let dispatch = useDispatch();

    interface Follow{
        profileImg?:string,
        nickname:string,
        id:number,
    }

    // 현재 내 아이디
    let loginUserId:number = 1;
    let targetUserId:number = 1;

    const [deleteFollowingData, setDeleteFollowingData] = useState ({
        followerId : 0,
        followeeId : 0
    });

    const showList = () => {
        if(state.followMode === 1) {
            return (
                state.followMeUsers?.map((one, idx)=>{
                    return(
                        <div key = {idx} className={`${mypageFollowModalStyle.userInfo}`}>
                            {/* 프로필 이미지 */}
                            <div className={`${mypageFollowModalStyle.profileImg}`}><img src={one.profileImg}></img></div>

                            {/* 닉네임 */}
                            <div className={`${mypageFollowModalStyle.nickname}`}>{one.nickname}</div>

                            {/* 팔로우 버튼 */}
                            <div className={`${mypageFollowModalStyle.followBtn}`}>
                                
                                {state.followMode === 1 || state.followMode === 2 ? 

                                <button> 끊기 </button> 

                                : 

                                <button>해제</button>}
                                
                                {state.followMode === 1 ? <button onClick={ () => {
                                    
                                }}> 팔로우 </button> : null}

                            </div>
                        </div>
                    );
                })
            );
        }
        else if(state.followMode === 2) {
            return (
                state.followingUsers?.map((one, idx)=>{
                        return(
                            <div key = {idx} className={`${mypageFollowModalStyle.userInfo}`}>
                                {/* 프로필 이미지 */}
                                <div className={`${mypageFollowModalStyle.profileImg}`}><img src={one.profileImg}></img></div>

                                {/* 닉네임 */}
                                <div className={`${mypageFollowModalStyle.nickname}`}>{one.nickname}</div>

                                {/* 팔로우 버튼 */}
                                <div className={`${mypageFollowModalStyle.followBtn}`}>
                                    {state.followMode===1 || state.followMode===2?
                                    <button onClick={ () => {
                                        setDeleteFollowingData({
                                            followerId : targetUserId,
                                            followeeId : one.id
                                        })
                                        console.log("===")
                                        console.log(deleteFollowingData)
                                        console.log("===")
                                        dispatch(action.deleteFollowing(deleteFollowingData));
                                        dispatch(action.getFollowingList(targetUserId));
                                    }}>끊기</button>
                                    :
                                    <button>해제</button>}
                                    {state.followMode===1?<button>팔로우</button>:null}
                                </div>
                            </div>
                        );
                    })
            );
        }
        else if(state.followMode === 3) {
            return (
                state.blackListUsers?.map((one, idx)=>{
                        return(
                            <div key = {idx} className={`${mypageFollowModalStyle.userInfo}`}>
                                {/* 프로필 이미지 */}
                                <div className={`${mypageFollowModalStyle.profileImg}`}><img src={one.profileImg}></img></div>

                                {/* 닉네임 */}
                                <div className={`${mypageFollowModalStyle.nickname}`}>{one.nickname}</div>

                                {/* 팔로우 버튼 */}
                                <div className={`${mypageFollowModalStyle.followBtn}`}>
                                    {state.followMode===1 || state.followMode===2?<button>끊기</button>:<button>해제</button>}
                                    {state.followMode===1?<button>팔로우</button>:null}
                                </div>
                            </div>
                        );
                    })
            );
        }
    }

    return(
        <div className={`${mypageFollowModalStyle.modal}`}>
            {/* 헤더 */}
            <div className={`${mypageFollowModalStyle.header}`}>
                {state.followMode===1?<div>팔로워</div>:(state.followMode===2?<div>팔로잉</div>:<div>블랙리스트</div>)}
                <img onClick={()=>{dispatch(changeFollowModalOpen(false))}} src={process.env.PUBLIC_URL+`/img/mypage/closeBtn.png`}/>
            </div>

            {/* 메인 */}
            <div className={`${mypageFollowModalStyle.main}`}>
                {
                    showList()
                }
            </div>

        </div>
    );
}

export default MypageFollowModal;