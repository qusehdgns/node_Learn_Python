// 리엑트 기본 라이브러리 호출
import React from 'react';
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';

// 기본 url 호출 시 실행되는 페이지 정보
function LandingPage(props) {

    // 로그아웃 선택 시 실행되는 함수
    const onClickHandler = () => {
        alert("Button Test");
    }

    // 사용자에게 보여줄 기본 웹 형식
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            ,width: '100%', height: '100%', flexDirection: 'column'
        }}>
            <div style={{backgroundColor: 'yellow', width: '80%', height: '35%', margin: '2%'}}>

            </div>
            <div style={{ width:'100%', height: '35%', display: 'flex', flexDirection:'row', justifyContent:'center', alignItems: 'center' }}>
                <div style={{ backgroundColor: 'yellow', width: '38%', height: '90%', margin : '0 2%'}}>

                </div>
                <div style={{ backgroundColor: 'yellow', width: '38%', height: '90%', margin : '0 2%'}}>

                </div>
            </div>
        </div>
    )
}

// 라우터 돔에 기본 페이지를 추가
export default withRouter(LandingPage)
