// 기본 리엑트 및 이벤트 효과를 사용하기 위한 선언
import React, { useState } from 'react';
// redux 사용하기 위한 선언
import { useDispatch } from 'react-redux';
// 로그인 액션을 지정해 놓은 파일 호출
import { loginUser } from '../../../_actions/user_action';
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { Link, withRouter } from 'react-router-dom';

// 로그인 페이지 호출 시 실행되는 페이지 정보
function LoginPage(props) {
    // redux 사용을 위한 변수 선언
    const dispatch = useDispatch();

    // 페이지 변화에 따른 상태 저장 필요 요소 선언
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    // 이메일 핸들러 수행시 실행되는 함수
    const onEmailHandler = (event) => {
        // 이벤트로 들어온 값을 setEmail 함수를 사용하여 적용
        setEmail(event.currentTarget.value);
    }

    // 비밀번호 핸들러 수행시 실행되는 함수
    const onPasswordHandler = (event) => {
        // 이벤트로 들어온 값을 setPassword 함수를 사용하여 적용
        setPassword(event.currentTarget.value);
    }

    const movetoRegister = () => {
        props.history.push('/register');
    }

    // 제출 버튼 클릭 시 실행되는 함수
    const onSubmitHandler = (event) => {
        // 페이지를 다시 호출하지 않고 지금 상태를 사용하기 위한 선언
        event.preventDefault();

        // 바로바로 저장되어있는 값을 사용하여 body 변수에 저장
        let body = {
            email: Email,
            password: Password
        };

        // redux를 사용하여 저장 값과 함께 로그인 수행 함수 호출
        dispatch(loginUser(body)).then(res => {
            // 로그인 성공 리턴 시
            if (res.payload.loginSuccess){
                // 기본 url 페이지로 이동
                props.history.push('/');
            }
            // 로그인 실패
            else {
                // 로그인 실패 메시지
                alert('Email, Password를 확인해주세요.');
            }
        });
    }

    const LogoHandler = () => {
        props.history.push('/');
    }

    // 사용자에게 보여줄 기본 웹 형식
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            ,width: '100%', height: '100vh'
        }}>
            <form style={{display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}> 
                <div style={{textAlign:'center'}}>
                    <h1 onClick={LogoHandler} style={{cursor: 'pointer'}}>Learn Python</h1>
                </div>
                <br/>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button type='submit'>
                    Login
                </button>
                <button type='button' onClick={movetoRegister}>
                    Register
                </button>
                <div style={{textAlign:'center'}}>
                    <Link to='/findid'>Find your ID or Reset Password</Link>  
                </div>
            </form>
        </div>
    )
}

// 라우터 돔에 로그인 페이지를 추가
export default withRouter(LoginPage)
