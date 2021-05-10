import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { withRouter } from 'react-router-dom';
// 회원가입 액션을 지정해 놓은 파일 호출
import { createQandA } from '../../../_actions/qanda_action';

//bootstrap
import { Container, Form, Button } from 'react-bootstrap'


function QTestWritePage(props) {
    // redux 사용을 위한 변수 선언
    const dispatch = useDispatch();

    const [Title, setTitle] = useState("");
    const [Contents, setContents] = useState("");

    const state = useSelector(state => state.user);

    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value);
    }

    const onContentsHandler = (event) => {
        setContents(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        // 페이지를 다시 호출하지 않고 지금 상태를 사용하기 위한 선언
        event.preventDefault();

        if (Title === "") {
            alert("제목을 작성해주세요.");
            document.getElementById('title').focus();
        } else if (Contents === "") {
            alert("내용을 작성해주세요.");
            document.getElementById('contents').focus();
        } else {
            // 바로바로 저장되어있는 값을 사용하여 body 변수에 저장
            let body = {
                user_id: state.userData._id,
                title: Title,
                contents: Contents
            };

            // redux를 사용하여 저장 값과 함께 회원가입 수행 함수 호출
            dispatch(createQandA(body)).then(res => {
                // 회원가입 성공 시 리턴
                if (res.payload.success) {
                    // 로그인 페이지로 이동
                    props.history.push('/qanda');
                }
                // 회원가입 실패 시
                else {
                    // 회원가입 실패 메시지
                    alert('Fail to write QandA');
                }
            });
        }
    }

    return (
        <Container fluid style={{ height: '100%' }} className='p-3'>
            <Form style={{ height: '100%' }} onSubmit={onSubmitHandler} className='p-3'>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <input id='title' className='form-control' type="text" placeholder="Title" value={Title} onChange={onTitleHandler} />
                </Form.Group>

                <Form.Group style={{ height: '70%' }}>
                    <Form.Label>Contents</Form.Label>
                    <textarea id='contents' className='form-control' style={{ height: '95%', resize: 'none' }} placeholder='Contents' value={Contents} onChange={onContentsHandler}></textarea>
                </Form.Group>

                <div className='text-right'>
                    <Button variant="success" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </Container>
    )
}

export default withRouter(QTestWritePage)