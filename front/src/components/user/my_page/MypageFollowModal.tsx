import React, { useState, useEffect } from 'react';

//css
import mypageFollowModalStyle from "./MypageFollowModal.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action_mypage, changeFollowModalOpen} from "../../../store/MypageSlice";
import {useParams} from 'react-router-dom'

const MypageFollowModal = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.mypage);
    let dispatch = useDispatch();

    interface Follow{
        profileImg?:string,
        nickname:string,
        id:number,
    }

    // 일단 로그인한 유저의 아이디
    const loginUser = JSON.parse(window.sessionStorage.getItem("loginUser"));
  // 내가 보고있는 유저의 아이디
  const { targetUserId } = useParams();

    
    const [followingData, setFollowingData] = useState({
        followerId : 0, 
        followeeId : 0
    })

    const changeFollowingData = ((one) => {
        setFollowingData({
            followerId : Number(targetUserId),
            followeeId : one.id
        })
    })

    const [deleteFollowingData, setDeleteFollowingData] = useState ({
        followerId : 0,
        followeeId : 0
    });

    const changeDeleteFollowingData = ((one) => {
        setDeleteFollowingData({
            followerId : Number(targetUserId),
            followeeId : one.id
        })
        
    })

    const [blackListDeleteData, setBlackListDeleteData] = useState ({
        userId : 0,
        targetUserId : 0
    })

    const changeBlackListDeleteData = ((one) => {
        setBlackListDeleteData({
            userId : Number(targetUserId),
            targetUserId : one.targetUserId 
        })
    })

    let usersBucket = state.followMeUsers;

    // followMode에 따라 map에 사용하는 state 다르게
    useEffect(() => {
        if(state.followMode === 1) {
            usersBucket = state.followMeUsers;
        }
        else if(state.followMode === 2) {
            usersBucket = state.followingUsers;
        }
        else if(state.followMode === 3) {
            usersBucket = state.blackListUsers;
        }
    }, [state.followMode])


    // 팔로우
    useEffect(() => {
        if(followingData.followerId === 0 || followingData.followeeId === 0)
            return;

        dispatch(action_mypage.getUserById(followingData.followeeId));
        dispatch(action_mypage.following(followingData));
    }, [followingData])

    // 팔로우 끊기
    useEffect(() => {
        if(deleteFollowingData.followeeId === 0 || deleteFollowingData.followerId === 0)
            return;

        dispatch(action_mypage.deleteFollowing(deleteFollowingData));
    }, [deleteFollowingData])

    // 블랙리스트 해제
    useEffect(() => {
        if(blackListDeleteData.userId === 0 || blackListDeleteData.targetUserId === 0)
            return;

        dispatch(action_mypage.deleteBlackList(blackListDeleteData));
    }, [blackListDeleteData])

    useEffect(() => {
        dispatch(action_mypage.getPerfectFollowList());
    }, [])

    // 맞팔 여부 확인
    let checkPerfectFollow = ((one) => {
        if(state.perfectFollowUsers.length === 0) {
            return false;
        }

        for(let i=0; i<state.perfectFollowUsers.length; i++) {
            if((state.perfectFollowUsers[i].userIdA === Number(targetUserId) && state.perfectFollowUsers[i].userIdB === one.id) 
            || (state.perfectFollowUsers[i].userIdA === one.id && state.perfectFollowUsers[i].userIdB === Number(targetUserId))) {
                return true;
            }
        }

        return false;
    })

    const showList = () => {
        if(state.followMode === 1) {
            usersBucket = state.followMeUsers;
        }
        else if(state.followMode === 2) {
            usersBucket = state.followingUsers;
        }
        else if(state.followMode === 3) {
            usersBucket = state.blackListUsers;
        }

        return (
            usersBucket?.map((one, idx)=>{
                return(
                    <div key = {idx} className={`${mypageFollowModalStyle.userInfo}`}>
                        {/* 프로필 이미지 */}
                        <div className={`${mypageFollowModalStyle.profileImg}`}><img src={one.profileImg}></img></div>

                        {/* 닉네임 */}
                        <div className={`${mypageFollowModalStyle.nickname}`}>{one.nickname}</div>

                        {/* 팔로우 버튼 */}

                        {loginUser.id === Number(targetUserId) ?
                            <div className={`${mypageFollowModalStyle.followBtn}`}>
                            
                            {(state.followMode === 1 && checkPerfectFollow(one)) || state.followMode === 2 ? 

                            <button onClick={ () => {
                                changeDeleteFollowingData(one)
                                dispatch(action_mypage.getPerfectFollowList());
                            }}> 끊기 </button> 

                            : 

                            state.followMode === 3 ? <button onClick={ () => {
                                changeBlackListDeleteData(one)
                            }}>해제</button> : null}
                            
                            {state.followMode === 1 && !checkPerfectFollow(one) ? <button onClick={ () => {
                                changeFollowingData(one);
                                dispatch(action_mypage.getPerfectFollowList());
                            }}> 팔로우 </button> : null}

                        </div>
                        :
                        null}
                    </div>
                );
            })
        );
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