// 기본 리엑트 및 이벤트 효과를 사용하기 위한 선언
import React, { useState } from 'react';
// redux 사용하기 위한 선언
import { useDispatch } from 'react-redux';
// 회원가입 액션을 지정해 놓은 파일 호출
import { registerUser } from '../../../_actions/user_action';
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';

// 회원가입 페이지 호출 시 실행되는 페이지 정보
function RegisterPage(props) {
    // redux 사용을 위한 변수 선언
    const dispatch = useDispatch();

    // 페이지 변화에 따른 상태 저장 필요 요소 선언
    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    // 이메일 핸들러 수행시 실행되는 함수
    const onEmailHandler = (event) => {
        // 이벤트로 들어온 값을 setEmail 함수를 사용하여 적용
        setEmail(event.currentTarget.value);
    }

    // 이름 핸들러 수행시 실행되는 함수
    const onNameHandler = (event) => {
        // 이벤트로 들어온 값을 setName 함수를 사용하여 적용
        setName(event.currentTarget.value);
    }

    // 비밀번호 핸들러 수행시 실행되는 함수
    const onPasswordHandler = (event) => {
        // 이벤트로 들어온 값을 setPassword 함수를 사용하여 적용
        setPassword(event.currentTarget.value);
    }

    // 비밀번호 재입력 핸들러 수행시 실행되는 함수
    const onConfirmPasswordHandler = (event) => {
        // 이벤트로 들어온 값을 setConfirmPassword 함수를 사용하여 적용
        setConfirmPassword(event.currentTarget.value);
    }

    // 제출 버튼 클릭 시 실행되는 함수
    const onSubmitHandler = (event) => {
        // 페이지를 다시 호출하지 않고 지금 상태를 사용하기 위한 선언
        event.preventDefault();

        // 비밀번호와 비밀번호 재입력이 같지 않을 경우
        if (Password !== ConfirmPassword){
            // 비밀번호 입력이 같지 않다는 메시지 리턴
            return alert('Not Same Password and Confirm Password');
        }

        // 바로바로 저장되어있는 값을 사용하여 body 변수에 저장
        let body = {
            email: Email,
            name: Name,
            password: Password
        };

        // redux를 사용하여 저장 값과 함께 회원가입 수행 함수 호출
        dispatch(registerUser(body)).then(res => {
            // 회원가입 성공 시 리턴
            if (res.payload.success){
                // 로그인 페이지로 이동
                props.history.push('/login');
            }
            // 회원가입 실패 시
            else {
                // 회원가입 실패 메시지
                alert('Fail to sign up');
            }
        });
    }

    // 사용자에게 보여줄 기본 웹 형식
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            ,width: '100%', height: '100vh'
        }}>
            <form style={{display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Confrim Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

                <br />
                <button>
                    Register
                </button>
            </form>
        </div>
    )
}

// 라우터 돔에 회원가입 페이지를 추가
export default withRouter(RegisterPage)