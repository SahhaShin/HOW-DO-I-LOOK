import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

//css
import liveStyle from "./LiveList.module.css";


// alert창
import Swal from "sweetalert2";

//redux

import { useDispatch } from "react-redux";

import { action_follow } from "../../../store/FollowSlice";

// 컴포넌트
import IntroArea from "../../../components/streaming/list/IntroArea";
import Header from "../../../components/util/Header";
import Footer from "../../../components/util/Footer";
import Menu from "../../../components/util/Menu";
import LiveFollow from "../../../components/sns/feed/FeedFollow";
import LiveSlot from "../../../components/streaming/list/LiveSlot";

import { useSelector } from "react-redux";
import {
  action,
  changeModalOpen,
  isCreate,
  setUserId,
  setType,
  setSearch,
} from "../../../store/LiveSlice"; // todo


import {changeLiveEndAlert,changeLiveEndRoomNo,changeLiveEndByHost
} from "../../../store/StreamingSlice";

//컴포넌트
import Pagination from "../../../components/util/Pagination";

import LiveCreate from "../../../components/streaming/list/LiveCreate";
import { login } from "../../../store/UserSlice";

const LiveList = () => {
  const navigate = useNavigate();

  //redux 관리
  let state = useSelector((state: any) => state.live);
  let dispatch = useDispatch();

  let state_streaming = useSelector((state: any) => state.streaming);

  // 페이지네이션
  const [len, setLen] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const offset = (page - 1) * limit;

  // 유저정보 가져오기
  const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

  useEffect(() => {
    //리스트 가져오기
    console.log("list useEffect")
    setPage(state.page)
    dispatch(
      action.getLiveList({
        following: (state.userId == "") ?false : true,
        userId: loginUser.id,
        type: state.type,
        search: state.search,
        pageNum: state.page,
      })
    );


    console.log("render")
    //회원 follow목록 가져오기
  }, [state.page]);


  function upload() {
    console.log("upload");
    window.sessionStorage.setItem(
      "liveRoom",
      JSON.stringify({
        hostId: "",
        hostNickname: "",
        maxAge: "",
        minAge: "",
        title: "",
        type: "",
      })
    );
    dispatch(isCreate(true));
    dispatch(changeModalOpen(true));
  }

  function sortChange(flow: boolean, type, keyword) {
    var id = "";
    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
    if (flow) {

      id = loginUser.id;
    }
    console.log("id : " + id);
    dispatch(setUserId(id));
    dispatch(
      action.getLiveList({
        following:flow,
        userId: loginUser.id,
        type: state.type,
        search: state.search,
        pageNum: page,
      })
    );

    console.log("id : " + state.userId);
    // listUpdate();
  }

  //호스트가 라이브 종료 시 리스트로 이동
  //호스트가 라이브 종료 시 라이브 리스트 다시 부르고, 알럴트 띄워주기
  console.log(`현재 리스트 ${state_streaming.liveEndAlert}`);
  useEffect(()=>{

    if(state_streaming.liveEndAlert){

      dispatch(
        action.getLiveList({
          userId: loginUser.id,
          type: state.type,
          search: state.search,
          pageNum: page,
        })
      );


      // 초기화
      dispatch(changeLiveEndByHost(false));
      dispatch(changeLiveEndRoomNo(false));
      dispatch(changeLiveEndAlert(false));


      Swal.fire({
        icon: 'info',
        title: '라이브 종료',
        text: '방장이 라이브를 종료하였습니다 :)',
        confirmButtonColor: '#4570F5',
      })
    }

  },[state_streaming.liveEndAlert])

  return (
    <>
      {
        // 업로드 모달
        state.ModalOpen ? (
          <div className={`${liveStyle.createModal}`}>
            <LiveCreate />
          </div>
        ) : null
      }
      <div className={`${liveStyle.total}`}>
        <div className={`${liveStyle.header}`}>
          <Header />
        </div>
        <div>
          {/* 문구 & 해시태그 */}
          <IntroArea  />
        </div>

        <div className={`${liveStyle.main}`}>
          {/* 메인은 두 영역으로 나뉨 */}

          <div className={`${liveStyle.menuArea}`}>
            {/* floating menu start */}
            <div>
              <Menu />
            </div>
          </div>

          {/* 메인 컨텐츠 시작 */}
          <div className={`${liveStyle.contentsArea}`}>
            <div className={`${liveStyle.uploadBtn}`}>
              {/* 업로드 버튼 */}
              <button
                onClick={() => {
                  upload();
                }}
              >
                새로운 방 만들기
              </button>
            </div>

            <div className={`${liveStyle.title}`}>
              <div>LIVE</div>
              <div className={`${liveStyle.sortBtn}`}>
                <button
                  onClick={async () => {
                    sortChange(false, "", "");
                  }}
                  style={
                    state.userId == ""
                      ? { backgroundColor: "#4570F5", color: "white" }
                      : null
                  }
                >
                  ALL
                </button>
                <button
                  onClick={async () => {
                    sortChange(true, "", "");
                  }}
                  style={
                    state.userId != ""
                      ? { backgroundColor: "#4570F5", color: "white" }
                      : null
                  }
                >
                  FLOWING
                </button>
              </div>
            </div>

            {/* 방송 리스트 */}
            <div className={`${liveStyle.list}`}>
              {state.liveList?.map((one, index) => {
                return (
                  <div key={index} className={`${liveStyle.onelive}`}>
                    <LiveSlot oneRoom={one} key={index} />
                  </div>
                );
              })}
            </div>

            <div className={`${liveStyle.paginationContainer}`}>
                            <Pagination
                                total={state.pageAll}
                                limit={limit}
                                page={page}
                                setPage={setPage}
                            />
                        </div>
          </div>

          <LiveFollow />
        </div>

        <div className={`${liveStyle.footer}`}>
          <Footer />
        </div>
                    {/* 피드블러 */}
                    <div onClick={async()=>{dispatch(changeModalOpen(false));dispatch(changeModalOpen(false));}} style={((state.ModalOpen))?{position:"absolute",zIndex:"9",width:"100%", height:"10000px", backgroundColor:"black", opacity:"0.6", marginTop:"-10000px"}:null}></div>
        
      </div>
    </>
  );
};

export default LiveList;
