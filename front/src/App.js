import React from 'react';
import './App.css';

//라우터 선언
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//페이지 선언
import OOTDWeather from './components/user/closet/OOTDWeather.tsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Weather" element={<OOTDWeather/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
