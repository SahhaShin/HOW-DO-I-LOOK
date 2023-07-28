import React from 'react';
import './App.css';

//라우터 선언
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

// redux
import { Provider } from "react-redux";
import { store } from "./store/Store";

//페이지 선언
import Closet from "./pages/user/closet/Closet";
import ChatList from "./pages/chat/chatting/ChatList";
import ChatRoom from "./pages/chat/chatting/ChatRoom";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/closet" element={<Closet/>}/>
            <Route path="/chatlist" element={<ChatList/>}/>
            <Route path="/chatroom/:otherId/:roomId" element={<ChatRoom/>}/>
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
