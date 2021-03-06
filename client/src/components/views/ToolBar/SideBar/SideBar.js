// 리엑트 기본 라이브러리 호출
import React, { useState, useEffect } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';
// redux 사용하기 위한 선언
import { useSelector } from 'react-redux';

//bootstrap
import { Button } from 'react-bootstrap'

// 네비게이션 바 정보
function SideBar(props) {

    const [toggle, settoggle] = useState(false);

    const state = useSelector(state => state.user);

    function checkConsole() {
        let console = document.getElementById('console');
        if (toggle === true) {
            settoggle(false);
            console.style.display = 'none';
        }
    }

    const movetoStudy = () => {
        checkConsole();
        // 학습 페이지로 이동
        props.history.push("/");
    }

    const movetoQandA = () => {
        checkConsole();
        // 학습 페이지로 이동
        props.history.push("/qanda");
    }

    const movetoMyPage = () => {
        checkConsole();
        // 학습 페이지로 이동
        props.history.push("/mypage");
    }


    const switchCompiler = () => {
        let console = document.getElementById('console');
        if (toggle === true) {
            settoggle(false);
            console.style.display = 'none';
        } else {
            settoggle(true);
            console.style.removeProperty('display');
            // document.getElementById('console_input').focus();
        }
    }

    let MypageButton = null;

    if (typeof state.userData !== 'undefined') {
        if (state.userData.isAuth) {
            MypageButton = <Button variant="outline-info" size="sm" style={{ margin: '5px 0', position: 'fixed', bottom: 0 }} onClick={movetoMyPage}>MyPage</Button>;
        }
    }

    useEffect(() => {
        return () => {
            checkConsole()
        }
    }, [toggle])

    // 사용자에게 보여줄 기본 웹 형식
    return (
        <nav className="menu" style={{
            position: 'fixed', bottom: 0, width: '90px', height: '85vh'
            , borderRight: '1px solid rgba(0, 0, 0, .25)', display: 'flex', justifyContent: 'center'
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button variant='outline-primary' size='sm' style={{ margin: '5px 0' }} onClick={movetoStudy}>Study</Button>
                <Button variant='outline-secondary' size='sm' style={{ margin: '5px 0' }} onClick={switchCompiler}>Compiler</Button>
                <Button variant="outline-success" size="sm" style={{ margin: '5px 0' }} onClick={movetoQandA}>QandA</Button>
                {MypageButton}                
            </div>
        </nav>
    )
}

// 라우터 돔에 로그인
export default withRouter(SideBar)