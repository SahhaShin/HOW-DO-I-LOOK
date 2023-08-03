import React from 'react';
import './App.css';

//라우터 선언
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

// redux
import { Provider } from "react-redux";
import { store } from "./store/Store";

//페이지 선언
import Closet from "./pages/user/closet/Closet";
import Login from "./pages/user/login/Login";
import Signin from "./pages/user/login/Signin";
import AuthSignin from "./pages/user/login/AuthSignin"


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/closet" element={<Closet/>}/>
          </Routes>
          <Routes>
            <Route path="/user/log-in" element={<Login/>}/>
          </Routes>
          <Routes>
            <Route path="/user/sign-up" element={<Signin/>}/>
          </Routes>
          <Routes>
            <Route path="auth2/sign-up" element={<AuthSignin/>}/>
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
