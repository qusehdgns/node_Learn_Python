import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { withRouter } from 'react-router-dom';
// 회원가입 액션을 지정해 놓은 파일 호출
import { updateQandA, deleteQandA } from '../../../_actions/qanda_action';

//bootstrap
import { Container, Form, Button } from 'react-bootstrap'


function QTestWritePage(props) {
    // redux 사용을 위한 변수 선언
    const dispatch = useDispatch();

    const state = useSelector(state => state.user);

    const [Title, setTitle] = useState("");
    const [Contents, setContents] = useState("");

    const [UpdateButton, setUpdateButton] = useState('d-none');
    const [DefaultButton, setDefaultButton] = useState('d-inline');

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
            dispatch(updateQandA(props.data._id, body)).then(res => {
                // 회원가입 성공 시 리턴
                if (res.payload.success) {
                    // 로그인 페이지로 이동
                    props.history.push('/qanda');
                }
                // 회원가입 실패 시
                else {
                    // 회원가입 실패 메시지
                    alert('Fail to Update QandA');
                }
            });

            console.log(body);
        }
    }

    // Update 버튼 액션
    const cancelQA = () => {
        setTitle(props.data.title);
        setContents(props.data.contents);
        document.getElementById('title').readOnly = true;
        document.getElementById('contents').readOnly = true;
        setDefaultButton('d-inline');
        setUpdateButton('d-none');
    }

    // Update 버튼 액션
    const updateQA = () => {
        document.getElementById('title').readOnly = false;
        document.getElementById('contents').readOnly = false;
        setDefaultButton('d-none');
        setUpdateButton('d-inline');
    }

    // Update 버튼 액션
    const deleteQA = () => {
        if (window.confirm("해당 게시물을 삭제하시겠습니까?")) {
            dispatch(deleteQandA(props.data._id)).then(res => {
                if(res.payload.success){
                    props.history.push('/qanda');
                } else {
                    alert('Failed to Delete');
                }
            })
        }
    }

    let CRUDButton = null;

    // 로그인 상태 확인 후 Write 버튼 생성
    if (state.hasOwnProperty('userData')) {
        if (state.userData.isAuth && state.userData.email === props.data.user_id) {
            CRUDButton = <div className='text-right'>
                <div className={UpdateButton}>
                    <Button variant="success" type="submit" className='mr-2'>
                        Submit
                </Button>
                    <Button variant="light" type="button" onClick={cancelQA}>
                        Cancel
                </Button>
                </div>
                <div className={DefaultButton}>
                    <Button variant="info" type="button" className='mr-2' onClick={updateQA}>
                        Update
                </Button>
                    <Button variant="danger" type="button" onClick={deleteQA}>
                        Delete
                </Button>
                </div>
            </div>
        }
    }

    useEffect(() => {
        setTitle(props.data.title);
        setContents(props.data.contents);
    }, [props.data])

    return (
        <Container fluid style={{ height: '100%' }} className='p-3'>
            <Form style={{ height: '100%' }} onSubmit={onSubmitHandler} className='p-3'>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <input id='title' className='form-control bg-white' type="text" placeholder="Title" value={Title} onChange={onTitleHandler} readOnly />
                </Form.Group>

                <Form.Group style={{ height: '70%' }}>
                    <Form.Label>Contents</Form.Label>
                    <textarea id='contents' className='form-control bg-white' style={{ height: '95%', resize: 'none' }} placeholder='Contents' value={Contents} onChange={onContentsHandler} readOnly></textarea>
                </Form.Group>
                {CRUDButton}
            </Form>
        </Container>
    )
}

export default withRouter(QTestWritePage)