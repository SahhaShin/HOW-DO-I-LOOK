import React, { useState, useRef, useCallback } from 'react';

//css
import liveAdvisorStyle from "./LiveAdvisor.module.css";

const LiveAdvisor = () => {

    let [advisor, setAdvisor] = useState<number[]>([1,2,3,4]);
    return(
        <div className={`${liveAdvisorStyle.total}`}>
            {
                advisor.map(()=>{
                    return(
                        <div className={`${liveAdvisorStyle.onePeople}`}>
                            <div className={`${liveAdvisorStyle.profileImg}`}></div>
                            
                            <div className={`${liveAdvisorStyle.badge}`}></div>
                            <div className={`${liveAdvisorStyle.nickname}`}>
                                미팅만 50번
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default LiveAdvisor;