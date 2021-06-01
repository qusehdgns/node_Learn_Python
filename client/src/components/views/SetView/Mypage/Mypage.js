// 리엑트 기본 라이브러리 호출
import React, { useState, useEffect } from 'react';
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
//bootstrap
import { Container, Row, Col, Button, ProgressBar } from 'react-bootstrap'

import { deleteUser } from '../../../../_actions/user_action';

import { checkQuizProgress } from '../../../../_actions/quiz_action';

import { checkChapterandIndex } from '../../../../_actions/list_action';

import MyQandAListPage from './MyQandALisgPage/MyQandAListPage';

import QandARUDPage from '../QandAPage/QandARUDPage/QandARUDPage';

// image
import beginnerImg from '../../../../utils/image/Beginner.png'
import juniorImg from '../../../../utils/image/Junior.png'
import seniorImg from '../../../../utils/image/Senior.png'
import masterImg from '../../../../utils/image/Master.png'



// 기본 url 호출 시 실행되는 페이지 정보
function MyPage(props) {

    const dispatch = useDispatch();

    const [showImage, setshowImage] = useState(beginnerImg);

    const [userName, setuserName] = useState(null);
    const [userEmail, setuserEmail] = useState(null);
    const [userPhone, setuserPhone] = useState(null);
    const [userRole, setuserRole] = useState(null);
    const [deleteBtn, setdeleteBtn] = useState(null);

    const [selectMyQA, setselectMyQA] = useState(null);
    const [showQA, setshowQA] = useState(null);

    const [display, setdisplay] = useState('d-none');

    const [correct, setcorrect] = useState(0);
    const [wrong, setwrong] = useState(0);

    const [MyQAList, setMyQAList] = useState(null);

    const state = useSelector(state => state.user);

    const deleteUserInfo = () => {
        dispatch(deleteUser(state.userData._id)).then(res => {
            props.history.push('/login');
        })
    }

    function checkQuizResult(user_id) {
        dispatch(checkQuizProgress(user_id)).then(res => {
            if (res.payload.success) {
                setcorrect(res.payload.correct);
                setwrong(res.payload.wrong);

                if (res.payload.correct > 99.9) {
                    setshowImage(masterImg);
                } else if (res.payload.correct > 66.6) {
                    setshowImage(seniorImg);
                } else if (res.payload.correct > 33.3) {
                    setshowImage(juniorImg);
                } else {
                    setshowImage(beginnerImg);
                }
            }
        });
    }

    const closeshowQA = () => {
        setselectMyQA(null);
    }

    async function countChapterandIndex() {
        dispatch(checkChapterandIndex());
    }

    // 페이지 로드 후 최초 1회 수행
    useEffect(() => {
        countChapterandIndex();
    }, [])

    useEffect(() => {
        if (typeof state.userData !== 'undefined') {
            if (state.userData.isAuth) {
                setuserName(<h5>{state.userData.name}</h5>);
                setuserEmail(<h5>{state.userData.email}</h5>);
                setuserPhone(<h5>{state.userData.phone}</h5>);

                if (state.userData.role === 1) {
                    setuserRole(<h5>Admin</h5>);
                } else if (state.userData.role === 2) {
                    setuserRole(<h5>WikiUser</h5>);
                } else {
                    setuserRole(<h5>User</h5>);
                }

                setdeleteBtn(<Button size='sm' variant='outline-danger' onClick={deleteUserInfo}>Delete User</Button>);

                checkQuizResult(state.userData._id);

                setMyQAList(<MyQandAListPage user_id={state.userData._id} setselectMyQA={setselectMyQA} />);
            }
        }

        return () => {
            setuserName(null);
            setuserEmail(null);
            setuserPhone(null);
            setuserRole(null);
        }
    }, [state])

    useEffect(() => {
        if (selectMyQA !== null) {
            setdisplay('d-flex');
            setshowQA(<QandARUDPage data={selectMyQA} />);
        } else {
            setdisplay('d-none');
            setshowQA(null);
        }
    }, [selectMyQA])

    // 사용자에게 보여줄 기본 웹 형식
    return (
        <Container fluid style={{ height: '100%' }} className='py-3'>
            <div className='mt-5 mx-auto p-2 border rounded' style={{ width: '70%', height: 'auto' }}>
                <Row className='align-items-center my-2'>
                    <Col xs={12} sm={6} className="text-center">
                        <img width={200} height={200} src={showImage} />
                    </Col>
                    <Col xs={12} sm={6}>
                        {userName}
                        {userEmail}
                        {userPhone}
                        {userRole}
                        {deleteBtn}
                    </Col>
                </Row>
            </div>
            <div className='my-3 mx-auto p-2 border rounded' style={{ width: '70%' }}>
                <h3>Progress</h3>
                <ProgressBar className='mt-3 mb-2'>
                    <ProgressBar variant="success" now={correct} label={`${correct}%`} key={1} />
                    <ProgressBar variant="danger" now={wrong} label={`${wrong}%`} key={2} />
                </ProgressBar>
            </div>
            <h3 className='mx-auto' style={{ width: '70%' }}>MyQandA</h3>
            <div className='mb-4 mx-auto p-2 border rounded' style={{ width: '70%', height: 'auto', maxHeight: '350px', overflowY: 'auto' }}>
                {MyQAList}
            </div>
            <div id='showQA_div' className={display + ' align-items-center justify-content-center'} style={{
                position: 'fixed', bottom: 0, right: 0, width: 'calc(100vw - 90px)', height: '85vh', zIndex: 3, backgroundColor: 'rgba(211,211,211,.2)'
            }}>
                <div style={{ backgroundColor: 'white', width: '60%', height: '80%' }} className='border rounded'>
                    <div style={{ width: '100%', height: '6%' }} className='px-2 text-right border p-1'>
                        <Button size='sm' variant='danger' onClick={closeshowQA}>X</Button>
                    </div>
                    <div style={{ width: '100%', height: '94%', overflowY: 'auto' }}>
                        {showQA}
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default withRouter(MyPage)
