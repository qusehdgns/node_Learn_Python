// 리엑트 사용 선언
import React, { useState } from 'react'
// redux 사용하기 위한 선언
import { useDispatch, useSelector } from 'react-redux';
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { Link, withRouter } from 'react-router-dom';
// 로그인 액션을 지정해 놓은 파일 호출
import { checkEmail, resetPassword } from '../../../_actions/user_action';

// 리엑트 NavBar 페이지 값 호출 함수
function ResetPWPage(props) {
    // redux 사용을 위한 변수 선언
    const dispatch = useDispatch();

    const state = useSelector(state => state.user)

    // 페이지 변화에 따른 상태 저장 필요 요소 선언
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [Certification, setCertification] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    // 이메일 핸들러 수행시 실행되는 함수
    const onEmailHandler = (event) => {
        // 이벤트로 들어온 값을 setEmail 함수를 사용하여 적용
        setEmail(event.currentTarget.value);
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
        }
    }

    const checkMyEmail = () => {

        let data = {
            email: Email,
            phone: Phone
        }

        dispatch(checkEmail(data)).then(res => {
            if (!res.payload.checkSuccess) {
                alert(res.payload.message);
            } else {
                document.getElementById('email').readOnly = true;
                document.getElementById('phone').readOnly = true;
                document.getElementById("checkEmail").style.display = 'none';

                document.getElementById('checkCertification').style.display = 'flex';
            }
        });
    }

    const onCertificationHandler = (event) => {
        const input = event.currentTarget.value.toString();
        if (input === '' || /^[0-9\b]+$/.test(input)) {
            setCertification(input);
        }
    }

    const resendingEmail = () => {
        let data = {
            email: Email,
            phone: Phone
        }

        dispatch(checkEmail(data)).then(res => {
            setCertification("");
            document.getElementById('inputCertification').focus();
        });
    }

    const checkInputCertification = () => {
        if (Certification != state.check.certification) {
            alert('올바르지 않은 인증번호입니다. 다시 입력해주세요.');
            document.getElementById('inputCertification').focus();
        } else {
            document.getElementById('checkCertification').style.display = 'none';

            document.getElementById('resetPasswor').style.display = 'flex';
        }
    }

    // 비밀번호 핸들러 수행시 실행되는 함수
    const onPasswordHandler = (event) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d).{5,15}$/;

        let value = event.currentTarget.value;

        let passwordnotice = document.getElementById('passwordnotice');

        if(value === ""){
            passwordnotice.innerHTML = '';
        } else if(!regex.test(value)){
            passwordnotice.style.color = 'red';
            passwordnotice.innerHTML = '비밀번호 규칙에 맞추어주세요';
        } else {
            passwordnotice.style.color = 'green';
            passwordnotice.innerHTML = '사용가능한 비밀번호입니다.';
        }


        let confirmpasswordnotice = document.getElementById('confirmpasswordnotice');

        if(ConfirmPassword !== ""){
            if(value === ConfirmPassword){
                confirmpasswordnotice.style.color = 'green';
                confirmpasswordnotice.innerHTML = '입력한 비밀번호가 같습니다';
            } else {
                confirmpasswordnotice.style.color = 'red';
                confirmpasswordnotice.innerHTML = '입력한 비밀번호와 다릅니다';
            }
        }

        // 이벤트로 들어온 값을 setPassword 함수를 사용하여 적용
        setPassword(event.currentTarget.value);
    }

    // 비밀번호 핸들러 수행시 실행되는 함수
    const onConfirmPasswordHandler = (event) => {

        let value = event.currentTarget.value;

        let confirmpasswordnotice = document.getElementById('confirmpasswordnotice');

        if(value === ""){
            confirmpasswordnotice.innerHTML = '';
        } else if(value !== Password){
            confirmpasswordnotice.style.color = 'red';
            confirmpasswordnotice.innerHTML = '입력한 비밀번호와 다릅니다';
        } else {
            confirmpasswordnotice.style.color = 'green';
            confirmpasswordnotice.innerHTML = '입력한 비밀번호가 같습니다';
        }
        
        // 이벤트로 들어온 값을 setPassword 함수를 사용하여 적용
        setConfirmPassword(event.currentTarget.value);
    }

    // 제출 버튼 클릭 시 실행되는 함수
    const onSubmitHandler = (event) => {
        // 페이지를 다시 호출하지 않고 지금 상태를 사용하기 위한 선언
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            alert("비밀번호가 같지 않습니다!");
        } else {
            // 바로바로 저장되어있는 값을 사용하여 body 변수에 저장
            let body = {
                email: Email,
                phone: Phone,
                password: Password
            };

            dispatch(resetPassword(body)).then(res => {
                if (res.payload.resetsuccess) {
                    alert("비밀번호 재설정 성공했습니다.");
                    props.history.push('/login');
                } else {
                    if (res.payload.hasOwnProperty('message')) {
                        alert(res.payload.message)
                    } else {
                        alert("비밀번호 재설정에 실패했습니다.");
                    }
                }
            })
        }
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}>
                <div style={{ textAlign: 'center' }}>
                    <h1>Learn Python</h1>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h3>Reset Password</h3>
                </div>
                <label>email</label>
                <input type="email" id='email' value={Email} onChange={onEmailHandler} />
                <label>phone</label>
                <input type="tel" id='phone' maxLength='13' value={Phone} onChange={onPhoneHandler} />
                <br />
                <div id="checkEmail" style={{ display: 'flex', flexDirection: 'column' }}>
                    <button type='button' onClick={checkMyEmail}>
                        Checking my Email
                    </button>
                </div>
                <div id="checkCertification" style={{ display: 'none', flexDirection: 'column' }}>
                    <label>Certification Number</label>
                    <input type="text" id="inputCertification" value={Certification} onChange={onCertificationHandler} maxLength="6" />
                    <a onClick={resendingEmail}>Resend Certification Email</a>
                    <button type="button" onClick={checkInputCertification}>
                        Check Number
                    </button>
                </div>
                <div id="resetPasswor" style={{ display: 'none', flexDirection: 'column' }}>
                    <label>Password</label>
                    <input type="password" value={Password} onChange={onPasswordHandler} />
                    <span id="passwordnotice" style={{display: 'block', textAlign: 'center'}}></span>
                    <label>Confrim Password</label>
                    <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                    <span id="confirmpasswordnotice" style={{display: 'block', textAlign: 'center'}}></span>

                    <br />

                    <button type="submit">
                        Reset Password
                    </button>
                </div>
                <br />
                <div style={{ textAlign: 'center', margin: 'auto' }}>
                    <Link to='/login'>Go to Login</Link>
                </div>
            </form>
        </div>
    )
}

export default withRouter(ResetPWPage)
