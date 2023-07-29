import React, { useState } from 'react';
import feedStyle from "./Feed.module.css";

// 컴포넌트
import FeedSlot from '../../../components/sns/feed/FeedSlot';
import FollowSlot from "../../../components/util/FollowSlot";
import IntroArea from '../../../components/sns/feed/IntroArea';

const Feed = () => {

    let [feedList, setFeedList] = useState<any>([1,2,3,4,5,6,7,8,9,10]);

    return(
        <>
            <div className={`${feedStyle.total}`}>
                <div className={`${feedStyle.header}`}>header</div>
                
                <div>
                    {/* 문구 & 해시태그 */}
                    <IntroArea/>
                </div>


                <div className={`${feedStyle.main}`}>
                    
                    {/* main */}
                    
                    <div className={`${feedStyle.menuArea}`}>
                        {/* floating menu start */}
                        menu area
                    </div>

                    {/* 메인 컨텐츠 시작 */}
                    <div className={`${feedStyle.contentArea}`}>
                        
                        <div className={`${feedStyle.uploadBtn}`}>
                            {/* 업로드 버튼 */}
                            <button>업로드</button>
                        </div>

                        <div className={`${feedStyle.title}`}>
                            <div>Feed</div>
                            <div className={`${feedStyle.sortBtn}`}>
                                <button>ALL</button>
                                <button>FLOWING</button>
                            </div>
                        </div>

                        {/* 피드 리스트 */}
                        {
                            feedList.map(()=>{
                                return(
                                    <div className={`${feedStyle.list}`}>
                                        <FeedSlot/>
                                    </div>
                                );
                            })
                        }
                        

                    </div>

                    <div className={`${feedStyle.menuArea}`}>
                        {/* floating menu start */}
                        <div className={`${feedStyle.followArea}`}>
                            <div className={`${feedStyle.followAreaTitle}`}>Following</div>
                            <FollowSlot/>
                            <FollowSlot/>
                            <FollowSlot/>
                            <FollowSlot/>
                            <FollowSlot/>
                        </div>
                    </div>
                </div>

                <div className={`${feedStyle.footer}`}>footer</div>

                
            </div>
        </>
    );
}

export default Feed;