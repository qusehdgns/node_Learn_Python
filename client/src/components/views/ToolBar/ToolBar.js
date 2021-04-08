// 리엑트 사용 선언
import React from 'react'

// 사이드 및 상단바 선언
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';

// 필터링 페이지 리스트
import { FILTER_PAGES } from '../../Config'

// 리엑트 NavBar 페이지 값 호출 함수
function ToolBar() {
    if (FILTER_PAGES.includes(window.location.pathname)) {
        return null;
    }
    return (
        <div>
            <NavBar />
            <SideBar />
        </div>
    );
}

export default ToolBar
