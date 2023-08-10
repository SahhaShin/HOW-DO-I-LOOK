import React from "react";
import "./App.css";

//라우터 선언
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// redux
import { Provider } from "react-redux";
import { store } from "./store/Store";

//페이지 선언
import Closet from "./pages/user/closet/Closet";
import ChatList from "./pages/chat/chatting/ChatList";
import ChatRoom from "./pages/chat/chatting/ChatRoom";
import Feed from "./pages/sns/feed/Feed";
import Mypage from "./pages/user/my_page/Mypage";
import Live from "./pages/streaming/live/Live";
import Streaming from "./components/streaming/live/App";


import Login from "./pages/user/login/Login";
import Signin from "./pages/user/login/Signin";

import AuthSignin from "./pages/user/login/AuthSignin";
import Home from "./pages/home/Home";
import Header from "./components/util/Header";
import Ranking from "./pages/sns/rank/Ranking";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/closet" element={<Closet />} />
            <Route path="/chatlist" element={<ChatList />} />
            <Route
              path="/chatroom/:otherId/:roomId/:roomCode"
              element={<ChatRoom />}
            />
            <Route path="/feed" element={<Feed />} />
            <Route path="/mypage/:watchingUserId" element={<Mypage />} />
            <Route path="/live" element={<Live />} />
            <Route path="/streaming" element={<Streaming />} />

            {/* <Route path="/" element={<LogHin/>}/> */}

            <Route path="/" element={<Home />} />
            <Route path="/user/log-in" element={<Login />} />
            <Route path="/user/sign-up" element={<Signin />} />
            <Route path="/auth2/sign-up" element={<AuthSignin />} />
            <Route path="/Ranking" element={<Ranking />} />

            {/* <Route path="/"  element={<Header/>}/> */}
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
