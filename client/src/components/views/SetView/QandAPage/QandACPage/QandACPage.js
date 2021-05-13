import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { withRouter } from 'react-router-dom';
// 회원가입 액션을 지정해 놓은 파일 호출
import { createQandA } from '../../../../../_actions/qanda_action';

//bootstrap
import { Container, Form, Button } from 'react-bootstrap'


function QTestWritePage(props) {
    // redux 사용을 위한 변수 선언
    const dispatch = useDispatch();

    const [Title, setTitle] = useState("");
    const [writeChapter, setwriteChapter] = useState(0);
    const [writeIndex, setwriteIndex] = useState(0);
    const [Contents, setContents] = useState("");

    const [writeChapterList, setwriteChapterList] = useState(null);
    const [writeIndexList, setwriteIndexList] = useState(null);

    const userstate = useSelector(state => state.user);
    const chapterandindex = useSelector(state => state.chapterandindex.result);
    

    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value);
    }

    const onContentsHandler = (event) => {
        setContents(event.currentTarget.value);
    }

    const selectWriteChapter = (event) => {
        const value = event.currentTarget.value;
        setwriteChapter(value);
        setwriteIndex(0);

        if (value > 0) {
            let indexArray = []

            for (let i = 1; i < chapterandindex[value - 1].count; i++) {
                indexArray.push(i);
            }

            let html = indexArray.map((value, index) => <option key={index} value={value}>{value}</option>);

            setwriteIndexList(html);
            document.getElementById('SelectwriteIndex').disabled = false;

        } else {
            document.getElementById('SelectwriteIndex').disabled = true;
        }
    }

    const selectWriteIndex = (event) => {
        setwriteIndex(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        // 페이지를 다시 호출하지 않고 지금 상태를 사용하기 위한 선언
        event.preventDefault();

        if (Title.replace(/\s/gi, "") === "") {
            alert("제목을 작성해주세요.");
            document.getElementById('title').focus();
        } else if (Contents.replace(/\s/gi, "") === "") {
            alert("내용을 작성해주세요.");
            document.getElementById('contents').focus();
        } else {
            // 바로바로 저장되어있는 값을 사용하여 body 변수에 저장
            let body = {
                user_id: userstate.userData._id,
                title: Title,
                contents: Contents,
                chapter: writeChapter,
                index: writeIndex
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

    function ChapterListing(){
        let html = chapterandindex.map((chapter, index) => <option key={index} value={chapter._id}>{chapter._id}</option>)
        setwriteChapterList(html);
    }

    // 페이지 로드 후 최초 1회 수행
    useEffect(() => {
        ChapterListing();
    }, [])

    return (
        <Container fluid style={{ height: '100%' }} className='p-3 overflow-auto'>
            <Form style={{ height: '100%' }} onSubmit={onSubmitHandler} className='row px-3'>
                <Form.Group className='col-12 mb-0'>
                    <Form.Label>Title</Form.Label>
                    <input id='title' className='form-control' type="text" placeholder="Title" value={Title} onChange={onTitleHandler} maxLength='80' />
                </Form.Group>

                <Form.Group controlId="SelectwriteChapter" className='col-6 mb-0'>
                    <Form.Label>Chapter</Form.Label>
                    <Form.Control as="select" value={writeChapter} onChange={selectWriteChapter}>
                        <option value="0">Select Chapter</option>
                        {writeChapterList}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="SelectwriteIndex" className='col-6 mb-0'>
                    <Form.Label>Index</Form.Label>
                    <Form.Control as="select" value={writeIndex} onChange={selectWriteIndex} disabled>
                        <option value="0">Select Index</option>
                        {writeIndexList}
                    </Form.Control>
                </Form.Group>

                <Form.Group style={{ height: '60%' }} className='col-12 mb-0'>
                    <Form.Label>Contents</Form.Label>
                    <textarea id='contents' className='form-control' style={{ height: '95%', resize: 'none' }} placeholder='Contents' value={Contents} onChange={onContentsHandler}></textarea>
                </Form.Group>

                <div className='text-right col-12 mb-0'>
                    <Button variant="success" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </Container>
    )
}

export default withRouter(QTestWritePage)