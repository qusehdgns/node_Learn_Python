// 리엑트 사용 선언
import React from 'react'

import {
    Switch,
    Route
} from "react-router-dom";

// 필터링 페이지
import { FILTER_PAGES } from '../../Config';

// 페이지 임포트
import StudyPage from './StudyPage/StudyPage';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import FindIDPage from './FindIDPage/FindIDPage';
import ResetPWPage from './ResetPWPage/ResetPWPage';
import QandAPage from './QandAPage/QandAPage';
import MyPage from './Mypage/Mypage';
import WikiPage from './WikiPage/WikiPage';

import test from '../Console/brythonPage/brythonPage'

import Auth from '../../../hoc/auth';

// 리엑트 NavBar 페이지 값 호출 함수
function SetView() {

    const contents_view = () => {
        let set_style = {};

        if(!(FILTER_PAGES.includes(window.location.pathname))) {
            set_style = { position: 'fixed', width: 'calc(100vw - 90px)', height: '85vh', right: 0, bottom: 0, zIndex: 0 };
        }

        return set_style;
    }

    const view_set = contents_view();

    return (
        <div style={view_set}>
            <Switch>

                <Route exact path="/" component={Auth(StudyPage, null)} />

                <Route exact path="/login" component={Auth(LoginPage, false)} />

                <Route exact path="/register" component={Auth(RegisterPage, false)} />

                <Route exact path="/findid" component={Auth(FindIDPage, false)} />

                <Route exact path="/resetpw" component={Auth(ResetPWPage, null)} />

                <Route exact path="/qanda" component={Auth(QandAPage, null)} />

                <Route exact path="/mypage" component={Auth(MyPage, true)} />

                <Route exact path="/wiki" component={Auth(WikiPage, true)} />

                <Route exact path='/test' component={test} />

            </Switch>
        </div>
    )
}

export default SetView
