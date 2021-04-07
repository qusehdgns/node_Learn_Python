// 리엑트 사용 선언
import React, { useState } from 'react'
// redux 사용하기 위한 선언
import { useDispatch } from 'react-redux';
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';

// 리엑트 NavBar 페이지 값 호출 함수
function ResetPWPage(props) {
    // redux 사용을 위한 변수 선언
    const dispatch = useDispatch();

    // 페이지 변화에 따른 상태 저장 필요 요소 선언
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");

    // 이메일 핸들러 수행시 실행되는 함수
    const onEmailHandler = (event) => {
        // 이벤트로 들어온 값을 setEmail 함수를 사용하여 적용
        setEmail(event.currentTarget.value);
    }

    // 연락처 핸들러 수행시 실행되는 함수
    const onPhoneHandler = (event) => {
        // 이벤트로 들어온 값을 setEmail 함수를 사용하여 적용
        setPhone(event.currentTarget.value);
    }

    // 제출 버튼 클릭 시 실행되는 함수
    const onSubmitHandler = (event) => {
        // 페이지를 다시 호출하지 않고 지금 상태를 사용하기 위한 선언
        event.preventDefault();

        // 바로바로 저장되어있는 값을 사용하여 body 변수에 저장
        let body = {
            email: Email,
            phone: Phone
        };

        // redux를 사용하여 저장 값과 함께 로그인 수행 함수 호출
        
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            ,width: '100%', height: '100vh'
        }}>
            <form style={{display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}> 
                <div style={{textAlign:'center'}}>
                    <h1>Learn Python</h1>
                </div>
                <div style={{textAlign:'center'}}>
                    <h3>Reset Password</h3>
                </div>
                <label>email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>phone</label>
                <input type="text" value={Phone} onChange={onPhoneHandler} />
                <br />
                <button type='button'>
                    Checking my Email
                </button>
                <div style={{textAlign:'center'}}>
                    <a href='/login'>Go to Login</a>
                </div>
            </form>
        </div>
    )
}

export default withRouter(ResetPWPage)
