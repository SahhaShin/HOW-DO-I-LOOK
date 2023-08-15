import React, { useState } from 'react';
import introStyle from "./IntroArea.module.css";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import {action_feed} from "../../../store/FeedSlice";



const IntroArea = () => {

    //redux 관리
    let state = useSelector((state:any)=>state.feed);
    let dispatch = useDispatch();

    let loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
    const [searchInput, setSearchInput] = useState<string>("");

    function sendHash(){
        // {hashtag, size, page}

        // let hashremove = searchInput.replace("#","");
        const hashList = searchInput.split(" ");
        
        //해시태그 리스트 빈칸 없애고, 앞에 hashtag=??? 이런 줄줄이 글 만들기
        //?hashtag=신발&hashtag=조던
        let count = 0;
        let hashquery = "";
        for(let i=hashList.length;i>=0;i--){
            if(hashList[i]===" " || hashList[i]===""|| hashList[i]===undefined){
                continue;
            }
            else{
                let target = hashList[i].replace("#","hashtag=")

                if(count===0){
                    hashquery = target;
                    count++;
                    console.log(`3 ${hashquery}`);
                }
                else {
                    hashquery = hashquery+"&"+target;
                    count++;
                    console.log(`4 ${hashquery}`);
                }
             }
        }

        console.log(hashquery);


        let info = {
            hashtag:hashquery,
            size:10,
            page:1,
        }

        dispatch(action_feed.searchHash(info));
        
    }

    return(
        <div className={`${introStyle.total}`}>
            <div className={`${introStyle.firstArea}`}>
                <div className={`${introStyle.intro}`}>
                    <div>
                        {loginUser.nickname}님이 궁금한 오늘의 FEED는 무엇인가요?
                        <div className={`${introStyle.light}`}></div>
                    </div>
                </div>
            </div>

            <div className={`${introStyle.search}`}>
                <input value={searchInput} onChange={(e)=>{setSearchInput(e.target.value)}} placeholder="#대학생 #여름 #원피스" type='text'/>
                <button onClick={()=>{sendHash()}}>검색</button>
            </div>
            
            <div className={`${introStyle.tag}`}>
                <button onClick={(e)=>{setSearchInput(searchInput+` #대학생`)}}>#대학생</button>
                <button onClick={(e)=>{setSearchInput(searchInput+` #여름`)}}>#여름</button>
                <button onClick={(e)=>{setSearchInput(searchInput+` #원피스`)}}>#원피스</button>
                <button onClick={(e)=>{setSearchInput(searchInput+` #데이트`)}}>#데이트</button>
                <button onClick={(e)=>{setSearchInput(searchInput+` #운동`)}}>#운동</button>
            </div>

            <div className={`${introStyle.hr}`}></div>
        </div>
    );
}

export default IntroArea;