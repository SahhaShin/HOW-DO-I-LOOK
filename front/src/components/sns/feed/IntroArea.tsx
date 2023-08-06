import React, { useState } from 'react';
import introStyle from "./IntroArea.module.css";


const IntroArea = () => {
    return(
        <div className={`${introStyle.total}`}>
            <div className={`${introStyle.firstArea}`}>
                <div className={`${introStyle.intro}`}>
                    <div>
                        미팅만 50번님이 궁금한 오늘의 FEED는 무엇인가요?
                        <div className={`${introStyle.light}`}></div>
                    </div>
                </div>
            </div>
            <div className={`${introStyle.tag}`}>
                <button>#대학생</button>
                <button>#여름</button>
                <button>#원피스</button>
                <button>#데이트</button>
                <button>#운동</button>
            </div>

            <div className={`${introStyle.hr}`}></div>
        </div>
    );
}

export default IntroArea;