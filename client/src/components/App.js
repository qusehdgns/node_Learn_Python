import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// 페이지 임포트
import StudyPage from './views/StudyPage/StudyPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import FindIDPage from './views/FindIDPage/FindIDPage';
import ResetPWPage from './views/ResetPWPage/ResetPWPage';
import QandAPage from './views/QandAPage/QandAPage';
import MyPage from './views/Mypage/Mypage';
import WikiPage from './views/WikiPage/WikiPage';

import NavBar from './views/NavBar/NavBar'
import SideBar from './views/SideBar/SideBar';

import Auth from '../hoc/auth';


function App() {
  return (
    <Router>
      <div style={{ zIndex: 5 }}>
        <NavBar />
        <SideBar />
      </div>
      <div style={{ width: '100vw', height: '100vh'}}>
        <div style={{ position: 'fixed', width: 'calc(100vw - 80px)', height: '85vh', right: 0, bottom: 0 }}>
          <Switch>

            <Route exact path="/" component={Auth(StudyPage, null)} />

            <Route exact path="/login" component={Auth(LoginPage, false)} />

            <Route exact path="/register" component={Auth(RegisterPage, false)} />

            <Route exact path="/findid" component={Auth(FindIDPage, false)} />

            <Route exact path="/resetpw" component={Auth(ResetPWPage, null)} />

            <Route exact path="/qanda" component={Auth(QandAPage, null)} />

            <Route exact path="/mypage" component={Auth(MyPage, true)} />

            <Route exact path="/wiki" component={Auth(WikiPage, true)} />

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;