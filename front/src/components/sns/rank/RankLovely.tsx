import styled from "styled-components";

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

    // // 로딩 컴포넌트 필요함
    // if (state.rankingList.length === 0) {
    //     return <div>Loading...</div>;
    // }

    // return(
    //     <div className={`${rankingStyle.contentArea}`}>

    //         {/* 1~3위 : 순위에 맞게 색깔이 바껴야함 */}
    //         <div className={`${rankingStyle.topRankerLovely}`}>
                
    //             {/* 2위 */}
    //             <div className={`${rankingStyle.rankSet}`}>
    //                 <div className={`${rankingStyle.notFirst}`}>
    //                     <img src={state.rankingList[1].profileImg}/>
    //                 </div>

    //                 <div className={`${rankingStyle.score}`}>{state.rankingList[1].score}</div>
    //                 <div className={`${rankingStyle.nickname}`}>{state.rankingList[1].nickname}</div>
    //             </div>
                
    //             {/* 1위 */}
    //             <div className={`${rankingStyle.rankSet}`}>
    //                 <div className={`${rankingStyle.first}`}>
    //                     <img src={state.rankingList[0].profileImg}/>
               
    //                 </div>
    //                 <div className={`${rankingStyle.score}`}>{state.rankingList[0].score}</div>
    //                 <div className={`${rankingStyle.nickname}`}>{state.rankingList[0].nickname}</div>
    //             </div>
                
    //             {/* 3위 */}
    //             <div className={`${rankingStyle.rankSet}`}>
    //                 <div className={`${rankingStyle.notFirst}`}>
    //                     <img src={state.rankingList[2].profileImg}/>
    //                 </div>

    //                 <div className={`${rankingStyle.score}`}>{state.rankingList[2].score}</div>
    //                 <div className={`${rankingStyle.nickname}`}>{state.rankingList[2].nickname}</div>
    //             </div>
                

    //         </div>


    //         {/* 그 이하 순위 */}
    //         <div className={`${rankingStyle.etcRanker}`}>
    //             {
    //                 state.rankingList?.slice(3).map((oneUser, idx)=>{
                        
    //                 return(
                        
    //                     <div key={idx} className={`${rankingStyle.userSlotLovely}`}>
    //                         {/* 순위 / 프로필 이미지 / 닉네임 / 점수 */}
    //                         <div>{idx+4}위</div>

    //                         <div className={`${rankingStyle.profileImg}`}>
    //                             <img src={oneUser.profileImg}/>
    //                         </div>

    //                         <div>{oneUser.nickname}</div>

    //                         <div>{oneUser.score}</div>
    //                     </div>
    //                 );   
    //                 })
    //             }
    //         </div>
    //     </div>
    // );




    ////


    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const total = 100;

    const numPages = total / limit;

    const type = "LOVELY";

    useEffect(() => {
        console.log(page)
        console.log(limit)
        dispatch(action_ranking.getPartRankingList({type, page, limit}));
    }, [page])

    console.log(state.partRankingList)

    return(
        <div>
            <div className={`${rankingStyle.contentArea}`}>

                {/* 1~3위 : 순위에 맞게 색깔이 바껴야함 */}
                <div className={`${rankingStyle.topRankerLovely}`}>
                    
                    {/* 2위 */}
                    <div className={`${rankingStyle.rankSet}`}>
                        <div className={`${rankingStyle.notFirst}`}>
                            {/* <img src={state.rankingList[1].profileImg}/> */}
                        </div>

                        <div className={`${rankingStyle.score}`}>score2</div>
                        <div className={`${rankingStyle.nickname}`}>nickname2</div>
                    </div>
                    
                    {/* 1위 */}
                    <div className={`${rankingStyle.rankSet}`}>
                        <div className={`${rankingStyle.first}`}>
                            {/* <img src={state.rankingList[0].profileImg}/> */}
                
                        </div>
                        <div className={`${rankingStyle.score}`}>score1</div>
                        <div className={`${rankingStyle.nickname}`}>nickname1</div>
                    </div>
                    
                    {/* 3위 */}
                    <div className={`${rankingStyle.rankSet}`}>
                        <div className={`${rankingStyle.notFirst}`}>
                            {/* <img src={state.rankingList[2].profileImg}/> */}
                        </div>

                        <div className={`${rankingStyle.score}`}>score3</div>
                        <div className={`${rankingStyle.nickname}`}>nickname3</div>
                    </div>
                    

                </div>


                {/* 그 이하 순위 */}
                <div className={`${rankingStyle.etcRanker}`}>
                    {
                        state.rankingList?.map((oneUser, idx)=>{
                            
                        return(
                            
                            <div key={idx} className={`${rankingStyle.userSlotLovely}`}>
                                {/* 순위 / 프로필 이미지 / 닉네임 / 점수 */}
                                <div>{idx+1}위</div>

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


            <Nav>
                <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    &lt;
                </Button>
                {Array(numPages)
                    .fill()
                    .map((_, i) => (
                        <Button
                            key={i + 1}
                            onClick={() => {dispatch(changePage(i+1));setPage(i + 1)}}
                            aria-current={page === i + 1 ? "page" : null}
                        >
                            {i + 1}
                        </Button>
                    ))}
                <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
                    &gt;
                </Button>
            </Nav>
        </div>
    );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  width : 40px;
  height : 40px;
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: #4570F5;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default RankingLovely;