// 기본 리엑트 및 이벤트 효과를 사용하기 위한 선언
import React, { useState } from 'react';
// redux 사용하기 위한 선언
import { useDispatch } from 'react-redux';
// 회원가입 액션을 지정해 놓은 파일 호출
import { checkEmail, registerUser } from '../../../../_actions/user_action';
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';

import { Button } from 'react-bootstrap';

/*
- 비밀번호 규칙(숫자5이상, 영어5이상, 10자이상 15자미만)
*/

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

    // html id 관리
    const id_lst = ["email", "name", "phone", "pwd", "confirm_pwd", "register_btn"];

    // 앞의 조건이 만족되지 않으면 뒤에서 입력이 되지 않도록 하는 함수
    const visible = (id, pass) => {
        // pass에 true가 들어오면 다음 진행이 가능하도록 disable을 변경
        var idx = pass ? id_lst.indexOf(id)+1 : id_lst.indexOf(id);
        for (var i=0; i<id_lst.length; i++) {
            if (i<=idx) { // disabled 해제
                document.getElementById(id_lst[i]).disabled = false;
            }
            else { // disabled 설정
                document.getElementById(id_lst[i]).disabled = true;
            }
        }
    }

    // 이메일 핸들러 수행시 실행되는 함수
    const onEmailHandler = (event) => {
        // 이벤트로 들어온 값을 setEmail 함수를 사용하여 적용
        setEmail(event.currentTarget.value);
    }

    const checkMyEmail = () => {
        // ID(email) 중복검사
        let data = {
            email: Email
        }

        dispatch(checkEmail(data)).then(res => {
            console.log(res)
            if (res.payload.checkSuccess) {
                setMessage("이미 존재하는 ID(Email) 입니다");
                visible("email", false)
                alert("사용불가");
            } else {
                setMessage("");
                visible("email", true)
                alert("사용가능");
            }
        });
    }

    // 이름 핸들러 수행시 실행되는 함수
    const onNameHandler = (event) => {
        // 이벤트로 들어온 값을 setName 함수를 사용하여 적용
        if (event.currentTarget.value.length != 0){
            visible("name", true);
        }
        else {
            visible("name", false);
        }
        setName(event.currentTarget.value);
    }

    // 연락처 핸들러 수행시 실행되는 함수
    const onPhoneHandler = (event) => {
        const regex = /^[0-9\b -]{0,13}$/;
        if (regex.test(event.currentTarget.value)) {

            // 문자열에서 '-'제거
            var event_string = event.currentTarget.value.split("-").join("")

            // 문자열 수가 4이상이면 '-' 하나 추가
            if (event_string.length >= 4) {
                event_string = event_string.substr(0, 3) + '-' + event_string.substr(3, event_string.length - 3)
            }
            // 문자열 수가 9이상이면 '-' 하나 더 추가
            if (event_string.length >= 9) {
                event_string = event_string.substr(0, 8) + '-' + event_string.substr(8, event_string.length - 8)
            }
            // 이벤트로 들어온 값을 setPhone 함수를 사용하여 적용
            setPhone(event_string);

            if (event_string.length === 13){
                visible("pwd", true)
            }
        }
    }

    // 비밀번호 핸들러 수행시 실행되는 함수
    const onPasswordHandler = (event) => {

        const regex = /^(?=.*[A-Za-z])(?=.*\d).{5,15}$/;

        let value = event.currentTarget.value;

        let passwordnotice = document.getElementById('passwordnotice');

        let check = false;

        if(value === ""){
            passwordnotice.innerHTML = '';
            visible("pwd", false);
        } else if(!regex.test(value)){
            passwordnotice.style.color = 'red';
            passwordnotice.innerHTML = '비밀번호 규칙에 맞추어주세요';
            visible("pwd", false);
        } else {
            passwordnotice.style.color = 'green';
            passwordnotice.innerHTML = '사용가능한 비밀번호입니다.';
            check = true;
            visible("pwd", true);
        }


        let confirmpasswordnotice = document.getElementById('confirmpasswordnotice');

        if(ConfirmPassword !== ""){
            if(value === ConfirmPassword){
                confirmpasswordnotice.style.color = 'green';
                confirmpasswordnotice.innerHTML = '입력한 비밀번호가 같습니다';
                if(check){
                    visible("confirm_pwd", true);
                }
            } else {
                confirmpasswordnotice.style.color = 'red';
                confirmpasswordnotice.innerHTML = '입력한 비밀번호와 다릅니다';
                visible("confirm_pwd", false);
            }
        }

        // 이벤트로 들어온 값을 setPassword 함수를 사용하여 적용
        setPassword(event.currentTarget.value);
    }

    // 비밀번호 재입력 핸들러 수행시 실행되는 함수
    const onConfirmPasswordHandler = (event) => {

        let value = event.currentTarget.value;

        let confirmpasswordnotice = document.getElementById('confirmpasswordnotice');

        if(value === ""){
            confirmpasswordnotice.innerHTML = '';
            visible("confirm_pwd", false);
        } else if(value !== Password){
            confirmpasswordnotice.style.color = 'red';
            confirmpasswordnotice.innerHTML = '입력한 비밀번호와 다릅니다';
            visible("confirm_pwd", false);
        } else {
            confirmpasswordnotice.style.color = 'green';
            confirmpasswordnotice.innerHTML = '입력한 비밀번호가 같습니다';
            visible("confirm_pwd", true);
        }
        
        // 이벤트로 들어온 값을 setPassword 함수를 사용하여 적용
        setConfirmPassword(event.currentTarget.value);
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
                    <h1 style={{ fontSize: '60px'}}>Learn Python</h1>
                </div>
                <p style={{color:'red'}} align='center'>{Message}</p>

                <label>Email</label>
                <input id="email" type="email" className='form-control mb-1' value={Email} onChange={onEmailHandler} />

                <Button type='button' variant='outline-primary' onClick={checkMyEmail}>Check my ID</Button>

                <label>Name</label>
                <input disabled id="name" className='form-control' type="text" value={Name} onChange={onNameHandler} />

                <label>Phone</label>
                <input disabled id="phone" className='form-control' type="tel" maxLength="13" value={Phone} onChange={onPhoneHandler} />

                <label>Password</label>
                <input disabled id="pwd" className='form-control' type="password" value={Password} onChange={onPasswordHandler} />
                <span id="passwordnotice" style={{display: 'block', textAlign: 'center'}}></span>

                <label>Confrim Password</label>
                <input disabled id="confirm_pwd" className='form-control' type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <span id="confirmpasswordnotice" style={{display: 'block', textAlign: 'center'}}></span>

                <br />
                <Button variant='outline-secondary' disabled id="register_btn" type="submit">
                    Register
                </Button>
            </form>
        </div>
    )
}

// 라우터 돔에 회원가입 페이지를 추가
export default withRouter(RegisterPage)
