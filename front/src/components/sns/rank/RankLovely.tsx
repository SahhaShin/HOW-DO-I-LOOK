import { useEffect, useState } from "react";
import rankingStyle from "./RankingLovely.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action_ranking} from "../../../store/RankingSlice";



const RankingLovely = () => {

    //redux 관리
    let state = useSelector((state: any) => state.rank);
    let dispatch = useDispatch();

    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

    console.log(state.rankingList)
    console.log(state.rankingList[0])

    // 로딩 컴포넌트 필요함
    if (state.rankingList.length === 0) {
        return <div>Loading...</div>;
    }

    return(
        <div className={`${rankingStyle.contentArea}`}>

            {/* 1~3위 : 순위에 맞게 색깔이 바껴야함 */}
            <div className={`${rankingStyle.topRankerLovely}`}>
                
                {/* 2위 */}
                <div className={`${rankingStyle.rankSet}`}>
                    <div className={`${rankingStyle.notFirst}`}>
                        <img src={state.rankingList[1].profileImg}/>
                    </div>

                    <div className={`${rankingStyle.score}`}>{state.rankingList[1].score}</div>
                    <div className={`${rankingStyle.nickname}`}>{state.rankingList[1].nickname}</div>
                </div>
                
                {/* 1위 */}
                <div className={`${rankingStyle.rankSet}`}>
                    <div className={`${rankingStyle.first}`}>
                        <img src={state.rankingList[0].profileImg}/>
               
                    </div>
                    <div className={`${rankingStyle.score}`}>{state.rankingList[0].score}</div>
                    <div className={`${rankingStyle.nickname}`}>{state.rankingList[0].nickname}</div>
                </div>
                
                {/* 3위 */}
                <div className={`${rankingStyle.rankSet}`}>
                    <div className={`${rankingStyle.notFirst}`}>
                        <img src={state.rankingList[2].profileImg}/>
                    </div>

                    <div className={`${rankingStyle.score}`}>{state.rankingList[2].score}</div>
                    <div className={`${rankingStyle.nickname}`}>{state.rankingList[2].nickname}</div>
                </div>
                

            </div>


            {/* 그 이하 순위 */}
            <div className={`${rankingStyle.etcRanker}`}>
                {
                    state.rankingList?.slice(3).map((oneUser, idx)=>{
                        
                    return(
                        
                        <div key={idx} className={`${rankingStyle.userSlotLovely}`}>
                            {/* 순위 / 프로필 이미지 / 닉네임 / 점수 */}
                            <div>{idx+4}위</div>

                            <div className={`${rankingStyle.profileImg}`}>
                                <img src={oneUser.profileImg}/>
                            </div>

                            <div>{oneUser.nickname}</div>

                            <div>{oneUser.score}</div>
                        </div>
                    );   
                    })
                }
            </div>
        </div>
    );
}

export default RankingLovely;