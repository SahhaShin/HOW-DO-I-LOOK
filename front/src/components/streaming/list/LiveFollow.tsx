import React, { useState, useEffect } from "react";

import liveStyle from "../../../pages/streaming/list/LiveList.module.css";

import { useSelector, useDispatch } from "react-redux";
import { action_follow } from "../../../store/FollowSlice";

import FollowSlot from "../../util/FollowSlot";

const LiveFollow = () => {
  //redux 관리
  let state_follow = useSelector((state: any) => state.follow);
  let dispatch = useDispatch();

  const loginUser = JSON.parse(window.sessionStorage.getItem("loginUser"));

  useEffect(() => {
    dispatch(action_follow.getMyFollowingList(loginUser.id));
  }, []);

  return (
    <div className={`${liveStyle.menuArea}`}>
      {/* floating menu start */}
      <div className={`${liveStyle.followArea}`}>
        <div className={`${liveStyle.followAreaTitle}`}>Following</div>
        {state_follow.myFollowingUsers?.map((one, idx) => (
          <FollowSlot one={one} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default LiveFollow;
