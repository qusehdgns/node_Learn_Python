// 리엑트 사용 선언
import React, { useState, useEffect } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';
// redux 사용하기 위한 선언
import { useDispatch, useSelector } from 'react-redux';

//bootstrap
import { Container, Button } from 'react-bootstrap'

import './QandAPage.css'

import QandACPage from '../QandACPage/QandACPage'
import QandARUDPage from '../QandARUDPage/QandARUDPage'

import { readQandA } from '../../../_actions/qanda_action';

// 리엑트 NavBar 페이지 값 호출 함수
function QandAPage(props) {
    // Redux 사용 선언
    const dispatch = useDispatch();

    // 검색 input 값
    const [search, setsearch] = useState("");

    const [qandaList, setqandaList] = useState(null);

    // 화면 분할 시 보일 화면 값
    const [showPage, setshowPage] = useState(null);

    // 유동적 class 필요 항목 변수화
    const [showListClass, setshowListClass] = useState('px-0 py-3 col-12');
    const [searchInfoClass, setsearchInfoClass] = useState('my-3 mx-auto');
    const [showPageClass, setshowPageClass] = useState('d-none');

    // 로그인 유무에 따른 버튼 보이기
    let QandAWrite = null;

    // store에서 User 정보 호출
    const state = useSelector(state => state.user)

    // 검색 input 값 변경
    const onSearchHandler = (event) => {
        setsearch(event.currentTarget.value)
    }

    // Write 버튼 클릭 이벤트
    const showQandAWrite = () => {
        switchView();
        setshowPage(<QandACPage />);
    }

    // 로그인 상태 확인 후 Write 버튼 생성
    if (state.hasOwnProperty('userData')) {
        if (state.userData.isAuth) {
            QandAWrite = <Button variant='outline-success' className='m-2' onClick={showQandAWrite}>Write</Button>;
        }
    }

    const showQA = (data) => {
        switchView();
        setshowPage(<QandARUDPage data={data} />);
    }

    // 게시물 DB 통신 후 화면에 출력
    async function findList() {
        if (search.replace(/ /g, "") == "") {
            dispatch(readQandA()).then(res => {
                let html = null;
                if (!res.payload.status) {
                    html = <h3>Can not find Searching List</h3>
                } else {
                    let values = res.payload.value;

                    html = values.map((value, index) => {
                        let quiz_id = null;

                        if (value.quiz_id != null) {
                            quiz_id = <br>{value.quiz_id}</br>;
                        }

                        return <div className='qanda my-2' key={index} onClick={() => showQA(value)}>{value.title}<br />{value.user_id}<br />{quiz_id}{value.date}<br /></div>
                    });
                }
                setqandaList(html);
            })
        } else {

        }
    }

    // Search 버튼 액션
    const searching = () => {
        if (search == "") {
            findList();
        } else {
            findList();
        }
    }

    // 화면 분할 액션 시 수행
    function switchView() {
        setshowListClass('py-3 col-3');
        setsearchInfoClass('d-none');
        document.getElementById('qandalists').style.height = '95%';
        document.getElementById('showList').style.borderRight = '1px solid rgba(0, 0, 0, .25)';
        document.getElementById('indexButton').style.display = 'inline';
        setshowPageClass('px-0 col-9');
    }

    // 화면 복귀 액션 시 수행
    const switchReturn = () => {
        setshowListClass('px-0 py-3 col-12');
        setsearchInfoClass('my-3 mx-auto');
        document.getElementById('qandalists').style.height = '70%';
        document.getElementById('showList').style.borderRight = '0px';
        document.getElementById('indexButton').style.display = 'none';
        setshowPageClass('d-none');
        setshowPage(null);
    }

    // 페이지 로드 후 최초 1회 수행
    useEffect(() => {
        findList();
    }, [])

    return (
        <Container fluid className='m-0 p-0 row' style={{ height: '100%' }}>
            <div id='showList' className={showListClass} style={{ width: '100%', height: '100%' }}>
                <div id='searchInfo' className={searchInfoClass} style={{ width: '80%', height: '20%' }}>
                    <div className='mb-3 mx-auto' style={{ width: '90%', height: '50%' }}>
                        <label className="form-label" style={{ fontWeight: '600' }}>Search your Problem</label>
                        <div className='input-group'>
                            <input type='text' className='form-control text-center' value={search} onChange={onSearchHandler} id='searchValue'></input>
                            <button className='btn btn-outline-primary' style={{ width: '15%' }} type='button' onClick={searching}>Search</button>
                        </div>
                    </div>
                    <div className='text-center mx-auto' style={{ width: '90%', height: '35%', border: '1px solid rgba(0,0,0,.7)' }}>
                        <h1>Filtering Options</h1>
                    </div>
                </div>
                <div id='qandalists' className='text-center mx-auto' style={{ width: '80%', height: '70%', overflowY: 'auto' }}>
                    {qandaList}
                </div>
                <div className='nav justify-content-end'>
                    {QandAWrite}
                    <Button id='indexButton' variant='outline-warning' className='my-2' style={{ display: 'none' }} onClick={switchReturn}>=</Button>
                </div>
            </div>
            <div id='showPage' className={showPageClass}>
                {showPage}
            </div>
        </Container>
    )
}

export default withRouter(QandAPage)
