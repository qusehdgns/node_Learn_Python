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
    const [Message, setMessage] = useState("");
    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Phone, setPhone] = useState("");
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

    // 연락처 핸들러 수행시 실행되는 함수
    const onPhoneHandler = (event) => {
        // 문자열에서 '-'제거
        var event_string = event.currentTarget.value.split("-").join("")
        
        // 문자열 수가 4이상이면 '-' 하나 추가
        if (event_string.length >= 4){
            event_string = event_string.substr(0,3)+'-'+event_string.substr(3,event_string.length-3)
        }
        // 문자열 수가 9이상이면 '-' 하나 더 추가
        if (event_string.length >= 9){
            event_string = event_string.substr(0,8)+'-'+event_string.substr(8,event_string.length-3)
        }
        // 이벤트로 들어온 값을 setPhone 함수를 사용하여 적용
        setPhone(event_string);
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
        if (Password != event.currentTarget.value){
            // 비밀번호 입력이 같지 않다는 메시지 출력
            setMsg("Not same password");
        }
        else {
            // 비밀번호 입력이 같을시 메시지 제거
            setMsg("");
        }
    }

    // 제출 버튼 클릭 시 실행되는 함수
    const onSubmitHandler = (event) => {
        // 페이지를 다시 호출하지 않고 지금 상태를 사용하기 위한 선언
        event.preventDefault();


        // 바로바로 저장되어있는 값을 사용하여 body 변수에 저장
        let body = {
            message: Message,
            email: Email,
            name: Name,
            phone: Phone,
            password: Password,
            confirmpassword: ConfirmPassword
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
                onSubmit={onSubmitHandler}>

                <div style={{textAlign:'center'}}>
                    <h1>Learn Python</h1>
                </div>
                <p style={{color:'red'}} align='center'>{Message}</p>

                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />

                <button type='button'>Check my ID</button>

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>Phone</label>
                <input type="text" value={Phone} onChange={onPhoneHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Confrim Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

                <br />
                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    )
}

// 라우터 돔에 회원가입 페이지를 추가
export default withRouter(RegisterPage)
