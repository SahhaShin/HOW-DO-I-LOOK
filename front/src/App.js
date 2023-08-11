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
import List from "./pages/streaming//list/LiveList";
import Live from "./pages/streaming/live/Live";


import Login from "./pages/user/login/LoginPage";
import Signin from "./pages/user/login/Signin";

import AuthSignin from "./pages/user/login/AuthSignin";
import Home from "./pages/home/Home";
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
            <Route path="/live/:roomId" element={<Live />} />
            

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
