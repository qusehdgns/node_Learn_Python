import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { withRouter } from 'react-router-dom';
// 회원가입 액션을 지정해 놓은 파일 호출
import { updateQandA, deleteQandA } from '../../../_actions/qanda_action';

import { readReply, createReply } from '../../../_actions/reply_action';

//bootstrap
import { Container, Form, Button } from 'react-bootstrap'


function QTestWritePage(props) {
    // redux 사용을 위한 변수 선언
    const dispatch = useDispatch();

    const userstate = useSelector(state => state.user);
    const chapterandindex = useSelector(state => state.chapterandindex.result);

    const [Title, setTitle] = useState("");
    const [showChapter, setshowChapter] = useState(0);
    const [showIndex, setshowIndex] = useState(0);
    const [Contents, setContents] = useState("");

    const [showChapterList, setshowChapterList] = useState(null);
    const [showIndexList, setshowIndexList] = useState(null);
    const [replyLists, setreplyLists] = useState(null);

    const [Reply, setReply] = useState("");

    const [UpdateButton, setUpdateButton] = useState('d-none');
    const [DefaultButton, setDefaultButton] = useState('text-right col-12 mb-0 d-inline');

    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value);
    }

    const onContentsHandler = (event) => {
        setContents(event.currentTarget.value);
    }

    const onReplyHandler = (event) => {
        setReply(event.currentTarget.value);
    }

    function setIndexListing(value) {
        let indexArray = []

        for (let i = 1; i < chapterandindex[value - 1].count; i++) {
            indexArray.push(i);
        }

        let html = indexArray.map((value, index) => <option key={index} value={value}>{value}</option>);

        setshowIndexList(html);
    }

    const selectshowChapter = (event) => {
        const value = event.currentTarget.value;
        setshowChapter(value);
        setshowIndex(0);

        if (value > 0) {
            setIndexListing(value);
            document.getElementById('SelectshowIndex').disabled = false;
        } else {
            document.getElementById('SelectshowIndex').disabled = true;
        }
    }

    const selectshowIndex = (event) => {
        setshowIndex(event.currentTarget.value);
    }

    const onUpdateHandler = (event) => {
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
                user_id: userstate.userData._id,
                title: Title,
                contents: Contents,
                chapter: showChapter,
                index: showIndex
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
        }
    }

    const onReplySubmitHandler = (event) => {
        event.preventDefault();

        if (Reply == "") {
            alert("댓글을 입력해주세요");
            document.getElementById('replyInput').focus();
        } else {
            let body = {
                qanda_id: props.data._id,
                user_id: userstate.userData._id,
                reply: Reply
            };

            dispatch(createReply(body)).then(res => {

                if (res.payload.success) {
                    findReplies(props.data._id);
                    setReply("");
                } else {
                    alert("Error at comment");
                }
            })
        }
    }

    // Update 버튼 액션
    const cancelQA = () => {
        setTitle(props.data.title);
        setContents(props.data.contents);
        setChapterandIndex(props.data.study_id);
        document.getElementById('title').readOnly = true;
        document.getElementById('contents').readOnly = true;
        setDefaultButton('text-right col-12 mb-0 d-inline');
        setUpdateButton('d-none');
        document.getElementById('SelectshowChapter').disabled = true;
        document.getElementById('SelectshowIndex').disabled = true;
    }

    // Update 버튼 액션
    const updateQA = () => {
        document.getElementById('title').readOnly = false;
        document.getElementById('contents').readOnly = false;
        setDefaultButton('d-none');
        setUpdateButton('text-right col-12 mb-0 d-inline');
        document.getElementById('SelectshowChapter').disabled = false;
        if (showChapter > 0) {
            document.getElementById('SelectshowIndex').disabled = false;
        }
    }

    // Update 버튼 액션
    const deleteQA = () => {
        if (window.confirm("해당 게시물을 삭제하시겠습니까?")) {
            dispatch(deleteQandA(props.data._id)).then(res => {
                if (res.payload.success) {
                    props.history.push('/qanda');
                } else {
                    alert('Failed to Delete');
                }
            })
        }
    }

    let UDButton = null;
    let SCButton = null;
    let replyDiv = null;

    // 로그인 상태 확인 후 Write 버튼 생성
    if (userstate.hasOwnProperty('userData')) {
        if (userstate.userData.isAuth && userstate.userData.email === props.data.user_id.email) {
            UDButton = <div className={UpdateButton}>
                <Button variant="success" type="submit" className='mr-2'>
                    Submit
                    </Button>
                <Button variant="light" type="button" onClick={cancelQA}>
                    Cancel
                    </Button>
            </div>;
            SCButton = <div className={DefaultButton}>
                <Button variant="info" type="button" className='mr-2' onClick={updateQA}>
                    Update
                    </Button>
                <Button variant="danger" type="button" onClick={deleteQA}>
                    Delete
                    </Button>
            </div>;
        }
        replyDiv = <div className='col-12'>
            <Form className='border rounded mt-2 px-2 pb-2' style={{ height: '100px', fontWeight: '600' }} onSubmit={onReplySubmitHandler}>
                <Form.Label className='my-1 p-0'>Comment for Quistion</Form.Label>
                <div className='input-group' style={{ height: '65%' }}>
                    <input id='replyInput' type='text' className='form-control' value={Reply} onChange={onReplyHandler} style={{ height: '100%' }} />
                    <Button variant="success" type='submit'>Reply</Button>
                </div>
            </Form>
        </div>;
    }

    async function findReplies(quiz_id) {
        let html = null;
        await dispatch(readReply(quiz_id)).then(res => {
            if (!res.payload.status) {
                html = <h3>Error at Reading Replies</h3>
            } else {
                let values = res.payload.value;

                html = values.map((value, index) =>
                    <div className='border rounded mt-2 p-2' key={index}>
                        {value.user_id.email}<br />
                        {value.reply}<br />
                        {value.date}
                    </div>)
            }
        });

        setreplyLists(html);
    }

    function ChapterListing() {
        let html = chapterandindex.map((chapter, index) => <option key={index} value={chapter._id}>{chapter._id}</option>)
        setshowChapterList(html);
    }

    function setChapterandIndex(study_id) {
        if (study_id) {
            setshowChapter(study_id.chapter);
            setIndexListing(study_id.chapter);
            setshowIndex(study_id.index);
        } else {
            setshowChapter(0);
            setshowIndex(0);
        }
    }

    useEffect(() => {
        ChapterListing();
    }, [])

    useEffect(() => {
        cancelQA();
        setChapterandIndex(props.data.study_id);
        findReplies(props.data._id);
        setReply("");
    }, [props.data])

    return (
        <Container fluid style={{ height: 'auto' }} className='p-3'>
            <Form style={{ height: 'auto' }} onSubmit={onUpdateHandler} className='row p-3'>
                <Form.Group className='col-12 mb-0'>
                    <Form.Label>Title</Form.Label>
                    <input id='title' className='form-control bg-white' type="text" placeholder="Title" value={Title} onChange={onTitleHandler} readOnly />
                </Form.Group>

                <Form.Group controlId="SelectshowChapter" className='col-6 mb-0'>
                    <Form.Label>Chapter</Form.Label>
                    <Form.Control as="select" value={showChapter} onChange={selectshowChapter} disabled>
                        <option value="0">Select Chapter</option>
                        {showChapterList}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="SelectshowIndex" className='col-6 mb-0'>
                    <Form.Label>Index</Form.Label>
                    <Form.Control as="select" value={showIndex} onChange={selectshowIndex} disabled>
                        <option value="0">Select Index</option>
                        {showIndexList}
                    </Form.Control>
                </Form.Group>
                <Form.Group style={{ height: '50vh' }} className='col-12 mb-0'>
                    <Form.Label>Contents</Form.Label>
                    <textarea id='contents' className='form-control bg-white' style={{ height: '90%', resize: 'none' }} placeholder='Contents' value={Contents} onChange={onContentsHandler} readOnly></textarea>
                </Form.Group>
                {UDButton}
                {SCButton}
            </Form>

            <Container fluid className='row p-0 border-top mx-auto mb-3'>
                <div className='col-12'>
                    {replyLists}
                </div>
                {replyDiv}
            </Container>
        </Container>
    )
}

export default withRouter(QTestWritePage)