import React from 'react';
import './App.css';

//라우터 선언
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

// redux
import { Provider } from "react-redux";
import { store } from "./store/store";

//페이지 선언
import Closet from "./pages/user/closet/Closet";
import CLOSETMenu from "./components/user/closet/CLOSETMenu";
import CLOSETRegist from "./components/user/closet/CLOSETRegist";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/closet" element={<Closet/>}/>
            <Route path="/CLOSETRegist" element={<CLOSETRegist/>}/>
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
