import styled from "styled-components";

import { useState, useEffect } from "react";
import rankingStyle from "./RankingLovely.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action_ranking} from "../../../store/RankingSlice";

const RankingNatural = () => {

    //redux 관리
    let state = useSelector((state: any) => state.rank);
    let dispatch = useDispatch();

    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const total = state.rankingList.length;

    const numPages = Math.ceil(total / limit); // 올림으로 페이지 수 계산

    const type = "NATURAL";

    useEffect(() => {
        dispatch(action_ranking.getTop3Rank(type));
    }, [])

    useEffect(() => {
        dispatch(action_ranking.getPartRankingList({type, page, limit}));
    }, [page])

    if (state.partRankingList.length === 0) {
        return <div>Loading...</div>;
      }

    if(state.rankingList.length === 0) {
        return <div>Loading...</div>
    }

    return(
        <div>
            <div className={`${rankingStyle.contentArea}`}>

                {/* 1~3위 : 순위에 맞게 색깔이 바껴야함 */}
                <div className={`${rankingStyle.topRankerNatural}`}>
                    
                    {/* 2위 */}
                    <div className={`${rankingStyle.rankSet}`}>
                        <div className={`${rankingStyle.notFirst}`}>
                            <img src={state.top3RankingList[1].profileImg}/>
                        </div>

                        <div className={`${rankingStyle.score} ${
                                state.top3RankingList[1].userId === loginUser.id ? rankingStyle.MyNaturalRank : null}`}>{state.top3RankingList[1].nickname}</div>
                        <div className={`${rankingStyle.nickname}`}>{state.top3RankingList[1].score}</div>
                    </div>
                    
                    {/* 1위 */}
                    <div className={`${rankingStyle.rankSet }`}>
                        <div className={`${rankingStyle.first}`}>
                            <img src={state.top3RankingList[0].profileImg}/>
                
                        </div>
                        <div className={`${rankingStyle.score} ${
                                state.top3RankingList[0].userId === loginUser.id ? rankingStyle.MyNaturalRank : null}`}>{state.top3RankingList[0].nickname}</div>
                        <div className={`${rankingStyle.nickname}`}>{state.top3RankingList[0].score}</div>
                    </div>
                    
                    {/* 3위 */}
                    <div className={`${rankingStyle.rankSet}`}>
                        <div className={`${rankingStyle.notFirst}`}>
                            <img src={state.top3RankingList[2].profileImg}/>
                        </div>

                        <div className={`${rankingStyle.score} ${
                                state.top3RankingList[2].userId === loginUser.id ? rankingStyle.MyNaturalRank : null}`}>{state.top3RankingList[2].nickname}</div>
                        <div className={`${rankingStyle.nickname}`}>{state.top3RankingList[2].score}</div>
                    </div>
                    

                </div>


                {/* 그 이하 순위 */}
                <div className={`${rankingStyle.etcRanker}`}>
                    {
                        state.partRankingList?.map((oneUser, idx)=>{
                            
                        return(
                            
                            <div key={idx} className={`${rankingStyle.userSlotNatural} ${
                                oneUser.userId === loginUser.id ? rankingStyle.MyNaturalRank : rankingStyle.whiteRank
                            } `}>
                                {/* 순위 / 프로필 이미지 / 닉네임 / 점수 */}
                                <div>{oneUser.rank}위</div>

                                <div className={`${rankingStyle.profileImg}`}>
                                    <img src={oneUser.profileImg}/>
                                </div>

                                <div className={`${oneUser.userId === loginUser.id ? rankingStyle.MyNaturalRank : rankingStyle.blackRank}`}>{oneUser.nickname}</div>

                                <div className={`${oneUser.userId === loginUser.id ? rankingStyle.MyNaturalRank : rankingStyle.blackRank}`}>{oneUser.score}</div>
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
                            onClick={() => {setPage(i + 1)}}
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

export default RankingNatural;