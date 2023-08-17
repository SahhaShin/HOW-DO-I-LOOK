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

    const loginUser = JSON.parse(window.sessionStorage.getItem("loginUser"));
    const { watchingUserId } = useParams();


    let usersBucket = null;

    const [followingData, setFollowingData] = useState({
        id: 0,
        targetId: 0,
        nickname: "",
        profileImg: "",
        gender: "",
        showBadgeType : ""
      });
    
      const changeFollowingData = (one) => {
        setFollowingData({
          id: loginUser.id,
          targetId: one.id,
          nickname: one.nickname,
          profileImg: one.profileImg,
          gender: "",
          showBadgeType : ""
        });
      };
    
      const [deleteFollowingData, setDeleteFollowingData] = useState({
        id: 0,
        targetId: 0,
        nickname: "",
        profileImg: "",
        gender: "",
        showBadgeType : ""
      });
    
      const changeDeleteFollowingData = (one) => {
        setDeleteFollowingData({
          id: loginUser.id,
          targetId: one.id,
          nickname: one.nickname,
          profileImg: one.profileImg,
          gender: one.gender,
          showBadgeType : one.showBadgeType
        });
      };
    
      const [deleteBlackListData, setDeleteBlackListData] = useState({
        id: 0,
        targetId: 0,
        nickname: "",
        profileImg: "",
        gender: "",
        showBadgeType : ""
      });
    
      const changeDeleteBlackListData = (one) => {
        setDeleteBlackListData({
          id: loginUser.id,
          targetId: one.targetUserId,
          nickname: one.nickname,
          profileImg: one.profileImg,
          gender: one.gender,
          showBadgeType : one.showBadgeType
        });
      };

    // Follow
    useEffect(() => {
        if(followingData.id === 0)
            return;

        dispatch(action_mypage.follow(followingData));
    }, [followingData])

    // UnFollow
    useEffect(() => {
        if(deleteFollowingData.id === 0)
            return;

        dispatch(action_mypage.unfollow(deleteFollowingData))
    }, [deleteFollowingData])

    // 블랙리스트 제거
    useEffect(() => {
        if(deleteBlackListData.id === 0)
            return;

        dispatch(action_mypage.deleteBlackList(deleteBlackListData))
    }, [deleteBlackListData])

    // followMode에 따라 map에 사용하는 state 다르게
    useEffect(() => {
        if(loginUser.id === Number(watchingUserId)) {
            if(state.followMode === 1) {
                usersBucket = state.myFollowerUsers;
            }
            else if(state.followMode === 2) {
                usersBucket = state.myFollowingUsers;
            }
            else if(state.followMode === 3) {
                usersBucket = state.blackListUsers;
            }
        } else {
            if(state.followMode === 1) {
                usersBucket = state.yourFollowerUsers;
            }
            else if(state.followMode === 2) {
                usersBucket = state.yourFollowingUsers;
            }
            else if(state.followMode === 3) {
                usersBucket = state.blackListUsers;
            }
        }
    }, [state.followMode])




    // 맞팔 여부 확인
    let checkPerfectFollow = ((one) => {
        if(state.perfectFollowUsers.length === 0) {
            return false;
        }

        for(let i=0; i<state.perfectFollowUsers.length; i++) {
            if((state.perfectFollowUsers[i].userIdA === Number(watchingUserId) && state.perfectFollowUsers[i].userIdB === one.id) 
            || (state.perfectFollowUsers[i].userIdA === one.id && state.perfectFollowUsers[i].userIdB === Number(watchingUserId))) {
                return true;
            }
        }

        return false;
    })

    const showList = () => {
        if(loginUser.id === Number(watchingUserId)) {
            if(state.followMode === 1) {
                usersBucket = state.myFollowerUsers;
            }
            else if(state.followMode === 2) {
                usersBucket = state.myFollowingUsers;
            }
            else if(state.followMode === 3) {
                usersBucket = state.blackListUsers;
            }
        } else {
            if(state.followMode === 1) {
                usersBucket = state.yourFollowerUsers;
            }
            else if(state.followMode === 2) {
                usersBucket = state.yourFollowingUsers;
            }
            else if(state.followMode === 3) {
                usersBucket = state.blackListUsers;
            }
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

                        {loginUser.id === Number(watchingUserId) ?
                            <div className={`${mypageFollowModalStyle.followBtn}`}>
                            
                            {(state.followMode === 1 && checkPerfectFollow(one)) || state.followMode === 2 ? 

                            <button onClick={ () => {
                                changeDeleteFollowingData(one)
                                dispatch(action_mypage.getPerfectFollowList());
                            }}> 끊기 </button> 

                            : 

                            state.followMode === 3 ? <button onClick={ () => {
                                changeDeleteBlackListData(one)
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