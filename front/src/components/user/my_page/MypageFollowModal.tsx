import React, { useState } from 'react';

//css
import mypageFollowModalStyle from "./MypageFollowModal.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {changeFollowModalOpen} from "../../../store/MypageSlice";

const MypageFollowModal = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.mypage);
    let dispatch = useDispatch();

    interface Follow{
        profileImg?:string,
        nickname:string,
        id:string,
    }

    let [users, setUsers] = useState<Follow[]|null>([
        {
            nickname:"닉네임1",
            id:"nick1"
        },
        {
            nickname:"닉네임2",
            id:"nick2"
        },
    ]);

    // 현재 내 아이디
    let id:number = 1;

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
                    users?.map((one)=>{
                        return(
                            <div className={`${mypageFollowModalStyle.userInfo}`}>
                                {/* 프로필 이미지 */}
                                <div className={`${mypageFollowModalStyle.profileImg}`}></div>

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
                }
            </div>

        </div>
    );
}

export default MypageFollowModal;