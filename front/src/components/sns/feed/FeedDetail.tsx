import React, { useState } from 'react';

//css
import FeedDetailStyle from "./FeedDetail.module.css";

//컴포넌트
import FeedSlot from "./FeedSlot";

const FeedDetail = () => {
    return(
        <div>
            {/* 왼쪽 페이지 */}
            <div>
                <FeedSlot/>
            </div>

            {/* 오른쪽 페이지 */}
            <div></div>

        </div>
    );
}

export default FeedDetail;