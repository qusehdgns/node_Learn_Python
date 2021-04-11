// 리엑트 사용 선언
import React, { useState } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { Link, withRouter } from 'react-router-dom';
// api 기본 게이트를 저장한 정보 호출
import { USER_SERVER } from '../../Config';
// ajax와 유사한 통신 라이브러리 선언
import Axios from 'axios';

// 리엑트 NavBar 페이지 값 호출 함수
function FindIDPage(props) {

    // 페이지 변화에 따른 상태 저장 필요 요소 선언
    const [Name, setName] = useState("");
    const [Phone, setPhone] = useState("");

    // 이름 핸들러 수행시 실행되는 함수
    const onNameHandler = (event) => {
        // 이벤트로 들어온 값을 setEmail 함수를 사용하여 적용
        setName(event.currentTarget.value);
    }

    // 이메일 핸들러 수행시 실행되는 함수
    const onPhoneHandler = (event) => {
        // 이벤트로 들어온 값을 setEmail 함수를 사용하여 적용
        setPhone(event.currentTarget.value);
    }

    // 제출 버튼 클릭 시 실행되는 함수
    const onSubmitHandler = (event) => {
        // 페이지를 다시 호출하지 않고 지금 상태를 사용하기 위한 선언
        event.preventDefault();

        Axios.get(`${USER_SERVER}/findid`, {
            params: {
                name: Name,
                phone: Phone
            }
        }).then(res => {
            let data = res.data
            if(data.success){
                alert(data.email);
            } else {
                alert(data.message);
            }
        });

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
                    <h3>Find my Email</h3>
                </div>
                <label>name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <label>phone</label>
                <input type="text" value={Phone} onChange={onPhoneHandler} />
                <br />
                <button type='submit'>
                    Find my Email
                </button>
                <div style={{ textAlign: 'center' }}>
                    <Link to='/resetpw'>I dont know my Password</Link>
                    <br />
                    <Link to='/login'>Go to Login</Link>
                </div>
            </form>
        </div>
    )
}

export default withRouter(FindIDPage)
