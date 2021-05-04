import { useSelector } from 'react-redux'

import React, { useState } from 'react'

import { useDispatch } from 'react-redux';

import { writeQandA } from '../../../_actions/user_action';

import { withRouter } from 'react-router-dom';

function QTestWritePage(props) {

    const [Title, setTitle] = useState("");
    const [Contents, setContents] = useState("");
    const dispatch = useDispatch();

    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value);
    }

    const onContentsHandler = (event) => {
        setContents(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        // 페이지를 다시 호출하지 않고 지금 상태를 사용하기 위한 선언
        event.preventDefault();


        // 바로바로 저장되어있는 값을 사용하여 body 변수에 저장
        let body = {
            Title: Title,
            Contents: Contents
        };

        // redux를 사용하여 저장 값과 함께 회원가입 수행 함수 호출
        dispatch(writeQandA(body)).then(res => {
            // 회원가입 성공 시 리턴
            if (res.payload.success){
                // 로그인 페이지로 이동
                props.history.push('/qtestpage');
            }
            // 회원가입 실패 시
            else {
                // 회원가입 실패 메시지
                alert('Fail to write');
            }
        });
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            ,width: '100%', height: '100vh'
        }}>
            <form style={{display: 'flex', flexDirection: 'column'}}>
                <div>
                    <input type="text" value={Title} onChange={onTitleHandler}></input>
                </div>

                <div>
                <textarea cols="50" rows="10" value={Contents} onChange={onContentsHandler}></textarea>
                </div>

                <button type='submit' >
                    submit
                </button>
            </form>
        </div>
        
        
    )
}

export default QTestWritePage