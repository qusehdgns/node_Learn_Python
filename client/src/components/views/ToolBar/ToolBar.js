// 리엑트 사용 선언
import React, { useState, useEffect } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';

// 사이드 및 상단바 선언
import NavBar from './NavBar/NavBar';
import SideBar from './SideBar/SideBar';

// 필터링 페이지 리스트
import { FILTER_PAGES } from '../../Config'

// 리엑트 NavBar 페이지 값 호출 함수
function ToolBar(props) {

    const [toolbar, settoolbar] = useState(null);

    const [toggle, settoggle] = useState(true);

    useEffect(() => {
        if (FILTER_PAGES.includes(window.location.pathname)) {
            settoolbar(null);
            settoggle(true);
        } else {
            if (toggle) {
                settoolbar(<div>
                    <NavBar />
                    <SideBar />
                </div>);

                settoggle(false);
            }
        }
    }, [props])

    return toolbar;
}

export default withRouter(ToolBar)
