// 리엑트 기본 라이브러리 호출
import React from 'react';
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언

// 기본 url 호출 시 실행되는 페이지 정보
function MyPage() {

    // 사용자에게 보여줄 기본 웹 형식
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            ,width: '100%', height: '100%', flexDirection: 'column'
        }}>
            <div style={{width: '80%', height: '35%', margin: '2%', border: '1px solid rgba(0,0,0,.7)', justifyContent:'center', display: 'flex', alignItems: 'center'}}>
                <h1>User info</h1>
            </div>
            <div style={{ width:'100%', height: '35%', display: 'flex', flexDirection:'row', justifyContent:'center', alignItems: 'center' }}>
                <div style={{ border: '1px solid rgba(0,0,0,.7)' , width: '38%', height: '100%', margin : '0 2%', justifyContent:'center', display: 'flex', alignItems: 'center'}}>
                    <h2>Classes and User Rank</h2>
                </div>
                <div style={{ border: '1px solid rgba(0,0,0,.7)', width: '38%', height: '100%', margin : '0 2%', justifyContent:'center', display: 'flex', alignItems: 'center'}}>
                    <h2>User Rating about Quiz</h2>
                </div>
            </div>
        </div>
    )
}

export default MyPage
