// 리엑트 기본 라이브러리 호출
import React from 'react'
// redux 사용하기 위한 선언
import { useDispatch } from 'react-redux';
// 로그아웃 액션을 지정해 놓은 파일 호출
import { logoutUser } from '../../../_actions/user_action';
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';

// 네비게이션 바 정보
function NavBar(props) {
    // redux 사용을 위한 변수 선언
    const dispatch = useDispatch();

    // 로그아웃 버튼 클릭 시 실행되는 함수
    const logoutHandler = () => {
        // redux를 사용하여 저장 값과 함께 로그인 수행 함수 호출
        dispatch(logoutUser()).then(res => {
            // 로그아웃 성공 리턴 시
            if (res.payload.success){
                // 로그인 페이지로 이동
                props.history.push("/login");
            }
            // 로그아웃 실패
            else {
                // 로그아웃 실패 메시지
                alert("Log Out Failed");
            }
        })
    }

    // 사용자에게 보여줄 기본 웹 형식
    return (
        <nav className="menu" style={{ position: 'fixed', zIndex: 5, height: '100%' }}>
            <div>
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </nav>
    )
}

// 라우터 돔에 로그인
export default withRouter(NavBar)
