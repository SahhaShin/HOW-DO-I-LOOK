import React, { useState } from "react";
import introStyle from "./IntroArea.module.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  action,
  setListType,
  setSearch,
  changePage,
} from "../../../store/LiveSlice";

const IntroArea = () => {
  //redux 관리
  let state = useSelector((state: any) => state.live);
  let dispatch = useDispatch();

  let loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
  const [searchInput, setSearchInput] = useState<string>("");
  const [type, setType] = useState("");

  function getList() {
    dispatch(setListType(type));
    dispatch(setSearch(searchInput));
    dispatch(changePage(0));

    dispatch(
      action.getLiveList({
        userId: state.userId,
        type: state.type,
        search: state.search,
        pageNum: state.page,
      })
    );
  }

  return (
    <div className={`${introStyle.total}`}>
      <div className={`${introStyle.firstArea}`}>
        <div className={`${introStyle.intro}`}>
          <div>
            {loginUser.nickname}님이 궁금한 오늘의 방송은 무엇인가요?
            <div className={`${introStyle.light}`}></div>
          </div>
        </div>
      </div>

      <div className={`${introStyle.search}`}>
        <input
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          placeholder="키워드를 입력하세요 "
          type="text"
        />
        <button
          onClick={() => {
            getList();
          }}
        >
          검색
        </button>
      </div>

      <div className={`${introStyle.tag}`}>
        <button
          onClick={(e) => {
            setType(`DATE`);
          }}
        >
          {type == "DATE" ? (
            <div style={{ color: "black" }}>#DATE</div>
          ) : (
            `#DATE`
          )}
        </button>
        <button
          onClick={(e) => {
            setType(`DAILY`);
          }}
        >
          {type == "DAILY" ? (
            <div style={{ color: "black" }}>#DAILY</div>
          ) : (
            `#DAILY`
          )}
        </button>
        <button
          onClick={(e) => {
            setType(`TRAVEL`);
          }}
        >
          {type == "TRAVEL" ? (
            <div style={{ color: "black" }}>#TRAVEL</div>
          ) : (
            `#TRAVEL`
          )}
        </button>
        <button
          onClick={(e) => {
            setType(`EXERCISE`);
          }}
        >
          {type == "EXERCISE" ? (
            <div style={{ color: "black" }}>#EXERCISE</div>
          ) : (
            `#EXERCISE`
          )}
        </button>
        <button
          onClick={(e) => {
            setType(`INTERVIEW`);
          }}
        >
          {type == "INTERVIEW" ? (
            <div style={{ color: "black" }}>#INTERVIEW</div>
          ) : (
            `#INTERVIEW`
          )}
        </button>
      </div>

      <div className={`${introStyle.hr}`}></div>
    </div>
  );
};

export default IntroArea;
