import { useState, useEffect, useMemo } from "react";
import rankingStyle from "./Ranking.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action_ranking, changeRankMode} from "../../../store/RankingSlice";


// 컴포넌트
import Header from "../../../components/util/Header";
import Menu from "../../../components/util/Menu";
import Footer from "../../../components/util/Footer";
import Pagination from "../../../components/util/Pagination";
import MyRank from "../../../components/sns/rank/MyRank";
import RankingLovely from "../../../components/sns/rank/RankLovely";
import RankingNatural from "../../../components/sns/rank/RankNatural";
import RankingModern from "../../../components/sns/rank/RankModern";
import RankingSexy from "../../../components/sns/rank/RankSexy";


const Ranking = () => {

    //redux 관리
    let state = useSelector((state: any) => state.rank);
    let dispatch = useDispatch();



    useEffect(() => {
        dispatch(action_ranking.getRankingList("LOVELY"));
        dispatch(action_ranking.getRankingList("SEXY"))
        dispatch(action_ranking.getRankingList("NATURAL"))
        dispatch(action_ranking.getRankingList("MODERN"))
    }, [])

    //select 값 유지
    const [likeSelect, setLikeSelect] = useState<string>("lovely");

    // 페이지네이션
    const [len, setLen] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    function changeLikeMode(e){
        setLikeSelect(e.target.value);
        if(e.target.value==="lovely"){
            dispatch(changeRankMode("lovely"));
        }else if(e.target.value==="natural"){
            dispatch(changeRankMode("natural"));
        }else if(e.target.value==="modern"){
            dispatch(changeRankMode("modern"));
        }else if(e.target.value==="sexy"){
            dispatch(changeRankMode("sexy"));
        }
    }

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    return(
        <div>
            <div className={`${rankingStyle.total}`}>
                <div className={`${rankingStyle.header}`}><Header/></div>
            </div>

            <div className={`${rankingStyle.main}`}>
                    
                {/* main */}
                    
                <div className={`${rankingStyle.menuArea}`}>
                    {/* floating menu start */}
                    <div><Menu/></div>
                </div>


                {/* 메인 컨텐츠 시작 */}
                
                <div className={`${rankingStyle.contentArea}`}>
                    <div className={`${rankingStyle.titleSelectWrapper}`}>
                    <div className={`${rankingStyle.titleSelect}`}>
                        <div>RANKING</div>
                        <select name="likes" className="select" value={likeSelect} onChange={(e)=>{changeLikeMode(e)}}>
                            <option value="lovely">Lovely</option>
                            <option value="natural">Natural</option>
                            <option value="modern">Modern</option>
                            <option value="sexy">Sexy</option>
                        </select>
                    </div>
                    <div>{year}/{month}/{day} {hours}:{minutes}:{seconds}</div> 
                </div>


                    {state.rankMode==="lovely"?<RankingLovely/>:(
                        state.rankMode==="natural"?<RankingNatural/>:(
                            state.rankMode==="modern"?<RankingModern/>:(
                                state.rankMode==="sexy"?<RankingSexy/>:null
                            )
                        )
                    )}

                   
                    {/* 페이지네이션   20을 {clothes.length}로 바꿔야 함 */}
                    {/* <div className={`${rankingStyle.paginationContainer}`}>
                        <Pagination
                            total={20}
                            limit={limit}
                            page={page}
                            setPage={setPage}
                        />
                    </div> */}
                </div>
            </div>

            <div className={`${rankingStyle.footer}`}><Footer/></div>

        </div>
    );
}

export default Ranking;