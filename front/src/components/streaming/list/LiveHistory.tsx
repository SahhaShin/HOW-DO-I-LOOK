import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import * as StompJs from "@stomp/stompjs";

//css
import liveHistoryStyle from "./LiveHistory.module.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import { action, addChatHistory } from "../../../store/ChatSlice";

const LiveHistory = () => {
  return <div className={`${liveHistoryStyle.total}`}></div>;
};

export default LiveHistory;
