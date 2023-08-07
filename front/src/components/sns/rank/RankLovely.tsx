import { useState } from "react";
import rankingStyle from "./RankingLovely.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action} from "../../../store/RankingSlice";



const RankingLovely = () => {

    interface userInfo{
        score: number,
        nickname : string,
    }
    const [rankingInfo, setRankingInfo] = useState<userInfo[]>([
        {
            score:400,
            nickname:"삼순이",
        },
        {
            score:300,
            nickname:"사순이",
        },
        {
            score:200,
            nickname:"오순이",
        }
    ]);

    return(
        <div className={`${rankingStyle.contentArea}`}>

            {/* 1~3위 : 순위에 맞게 색깔이 바껴야함 */}
            <div className={`${rankingStyle.topRankerLovely}`}>
                
                {/* 2위 */}
                <div className={`${rankingStyle.rankSet}`}>
                    <div className={`${rankingStyle.notFirst}`}>
                        <img src={`${process.env.PUBLIC_URL}/img/ranking/cuteRanking1.jpg`}/>
                    </div>

                    <div className={`${rankingStyle.score}`}>430점</div>
                    <div className={`${rankingStyle.nickname}`}>워뇽</div>
                </div>
                
                {/* 1위 */}
                <div className={`${rankingStyle.rankSet}`}>
                    <div className={`${rankingStyle.first}`}>
                        <img src={`${process.env.PUBLIC_URL}/img/ranking/cuteRanking2.jpg`}/>
                    </div>
                    <div className={`${rankingStyle.score}`}>450점</div>
                    <div className={`${rankingStyle.nickname}`}>winter</div>
                </div>
                
                {/* 3위 */}
                <div className={`${rankingStyle.rankSet}`}>
                    <div className={`${rankingStyle.notFirst}`}>
                        <img src={`${process.env.PUBLIC_URL}/img/ranking/cuteRanking3.jpg`}/>
                    </div>

                    <div className={`${rankingStyle.score}`}>410점</div>
                    <div className={`${rankingStyle.nickname}`}>하니</div>
                </div>
                

            </div>


            {/* 그 이하 순위 */}
            <div className={`${rankingStyle.etcRanker}`}>
                {
                    rankingInfo.map((oneUser, idx)=>{
                    return(
                        <div className={`${rankingStyle.userSlotLovely}`}>
                            {/* 순위 / 프로필 이미지 / 닉네임 / 점수 */}
                            <div>{idx+4}위</div>

                            <div className={`${rankingStyle.profileImg}`}>
                                <img src={`${process.env.PUBLIC_URL}/img/ranking/cuteRanking3.jpg`}/>
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