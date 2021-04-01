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
import QandAPage from './views/QandAPage/QandAPage';
import MyPage from './views/Mypage/Mypage';
import WikiPage from './views/WikiPage/WikiPage';

import NavBar from './views/NavBar/NavBar';

import Auth from '../hoc/auth';


function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ paddingLeft: '70px' }}>
        <Switch>
          
          <Route exact path="/" component={Auth(StudyPage, null)} />

          <Route exact path="/wiki" component={Auth(WikiPage, true)} />

          <Route exact path="/login" component={Auth(LoginPage, false)} />

          <Route exact path="/register" component={Auth(RegisterPage, false)} />

          <Route exact path="/qanda" component={Auth(QandAPage, null)} />

          <Route exact path="/mypage" component={Auth(MyPage, true)} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;