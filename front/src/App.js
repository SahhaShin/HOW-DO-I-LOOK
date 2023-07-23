import React from 'react';
import './App.css';

//라우터 선언
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//페이지 선언
import Closet from "./pages/user/closet/Closet";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/closet" element={<Closet/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
