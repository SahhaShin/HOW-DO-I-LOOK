import React, { useState, useRef, useCallback } from 'react';

//css
import liveMenuStyle from "./LiveMenu.module.css";

//redux
import { useSelector, useDispatch} from "react-redux"; 
import {action, changePick} from "../../../store/ClosetSlice";
import {action_feed} from "../../../store/FeedSlice";



const LiveMenu = () => {

    //redux 관리
    let state_closet = useSelector((state:any)=>state.closet);
    let state_feed = useSelector((state:any)=>state.feed);
    let dispatch = useDispatch();

    const [selectedMenu, setSelectedMenu] = useState(null);
    const [searchInput, setSearchInput] = useState<string>("");

    const handleMenuClick = (menu) => {
      setSelectedMenu(menu);
    };

    // 로그인 유저
    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

    function searchHashtag(){
        // {hashtag, size, page}
        console.log(`1 ${searchInput}`);

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

        dispatch(action_feed.hashSearchImgList(info));
    }
  
    return (
      <div className={`${liveMenuStyle.sidebar}`}>
        <div>
            <button onClick={() => {dispatch(action.getClothesListByType({clothesType:"ALL", userId:loginUser.id, pageNum:10})); handleMenuClick("Menu 1")}}><img src={process.env.PUBLIC_URL + '/img/menuIcon/menu1_closet.png'}/></button>
            <button onClick={() => {dispatch(action_feed.hashSearchTotalList()); handleMenuClick("Menu 2")}}><img src={process.env.PUBLIC_URL + '/img/menuIcon/menu2_search.png'}/></button>
            <button onClick={() => {handleMenuClick("Menu 3")}}><img src={process.env.PUBLIC_URL + '/img/menuIcon/menu3_set.png'}/></button>
            <button onClick={() => {handleMenuClick("Menu 4")}}><img src={process.env.PUBLIC_URL + '/img/menuIcon/menu4_info.png'}/></button>
            <button onClick={() => {handleMenuClick("Menu 5")}}><img src={process.env.PUBLIC_URL + '/img/menuIcon/menu5_exit.png'}/></button>
        </div>
        {selectedMenu === "Menu 1" && <div className={`${liveMenuStyle.menuContent}`}>
            <div className={`${liveMenuStyle.contentHeader}`}>
                <div><p>HOST CLOSET</p></div>
                <img onClick={()=>{setSelectedMenu(null)}} src={process.env.PUBLIC_URL + '/img/menuIcon/closeBtn.png'}/>
            </div>  

            {/* 전체 옷 리스트 */}
            <div className={`${liveMenuStyle.closetList}`}>
                {
                    state_closet?.clothesAll.map((item)=>{
                        return(
                            <div className={`${liveMenuStyle.clothItem}`}>
                                <img style={item.pick===true?{border: "1px solid #4570F5"}:null} onClick={()=>dispatch(changePick(item.clothesId))} src={item.photoLink}/>
                                {item.pick?<div>PICK!</div>:null}
                            </div>
                        );
                    })
                }    
            </div>  
        </div>}


        {/* 옷 검색 */}
        {selectedMenu === "Menu 2" && <div className={`${liveMenuStyle.menuContent}`}>
            <div className={`${liveMenuStyle.contentHeader}`}>
                
                <div><p>SEARCH</p></div>
                <img onClick={()=>{setSelectedMenu(null)}} src={process.env.PUBLIC_URL + '/img/menuIcon/closeBtn.png'}/>
            </div> 
            <div className={`${liveMenuStyle.search}`}>
                <input type='text' placeholder='#흰반팔 #청바지'/>
                <button onClick={()=>{searchHashtag()}}>검색</button>
            </div>
            
            {/* 해시태그 검색 옷 리스트 */}
            <div className={`${liveMenuStyle.closetList}`}>
                {
                    state_feed.mypageFeedPic?.map((item)=>{
                        return(
                            <div className={`${liveMenuStyle.clothItem}`}>
                                <img style={item.pick===true?{border: "1px solid #4570F5"}:null} onClick={()=>dispatch(changePick(item.clothesId))} src={item.link}/>
                                {item.pick?<div>PICK!</div>:null}
                            </div>
                        );
                    })
                }    
            </div>
        </div>}
        {selectedMenu === "Menu 3" && <div className={`${liveMenuStyle.menuContent}`}>
            <div className={`${liveMenuStyle.contentHeader}`}>
                <div><p>SET</p></div>
                <img onClick={()=>{setSelectedMenu(null)}} src={process.env.PUBLIC_URL + '/img/menuIcon/closeBtn.png'}/>
            </div> 
        </div>}
        {selectedMenu === "Menu 4" && <div className={`${liveMenuStyle.menuContent}`}>
            <div className={`${liveMenuStyle.contentHeader}`}>
                <div><p>INFO</p></div>
                <img onClick={()=>{setSelectedMenu(null)}} src={process.env.PUBLIC_URL + '/img/menuIcon/closeBtn.png'}/>
            </div>    
        </div>}
      </div>
    );
    
}

export default LiveMenu;