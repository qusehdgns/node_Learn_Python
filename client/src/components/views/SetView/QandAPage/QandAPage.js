// 리엑트 사용 선언
import React, { useState, useEffect } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';
// redux 사용하기 위한 선언
import { useDispatch, useSelector } from 'react-redux';

//bootstrap
import { Container, Button, Form } from 'react-bootstrap'

import QandAListPage from './QandAListPage/QandAListPage'
import QandACPage from './QandACPage/QandACPage'
import QandARUDPage from './QandARUDPage/QandARUDPage'
import { checkChapterandIndex } from '../../../../_actions/chapterandindex_action';

// 리엑트 NavBar 페이지 값 호출 함수
function QandAPage(props) {
    // Redux 사용 선언
    const dispatch = useDispatch();

    // 검색 input 값
    const [search, setsearch] = useState("");
    const [Chapter, setChapter] = useState(0);
    const [Index, setIndex] = useState(0);
    const [selectChapterList, setselectChapterList] = useState(null);
    const [selectIndexList, setselectIndexList] = useState(null);

    const [selectQA, setselectQA] = useState(null);

    const [QAListH, setQAListH] = useState("auto")
    const [QAListmaxH, setQAListmaxH] = useState("65%")

    // 화면 분할 시 보일 화면 값
    const [showPage, setshowPage] = useState(null);
    const [showListPage, setshowListPage] = useState(null);

    // 유동적 class 필요 항목 변수화
    const [showListClass, setshowListClass] = useState('px-0 py-3 col-12');
    const [searchInfoClass, setsearchInfoClass] = useState('my-3 mx-auto');
    const [showPageClass, setshowPageClass] = useState('d-none');

    // 로그인 유무에 따른 버튼 보이기
    let QandAWrite = null;

    // store에서 User 정보 호출
    const userstate = useSelector(state => state.user);
    const chapterandindex = useSelector(state => state.chapterandindex.result);

    // 검색 input 값 변경
    const onSearchHandler = (event) => {
        setsearch(event.currentTarget.value);
    }

    // Write 버튼 클릭 이벤트
    const showQandAWrite = () => {
        switchView();
        setshowPage(<QandACPage />);
    }

    // 로그인 상태 확인 후 Write 버튼 생성
    if (userstate.hasOwnProperty('userData')) {
        if (userstate.userData.isAuth) {
            QandAWrite = <Button variant='outline-success' className='m-2' onClick={showQandAWrite}>Write</Button>;
        }
    }

    const showQA = (data) => {
        if (data != null) {
            switchView();
            setshowPage(<QandARUDPage data={data} />);
        }
    }

    const selectChapter = (event) => {
        const value = event.currentTarget.value;
        setChapter(value);
        setIndex(0);

        if (value > 0) {
            let indexArray = []

            for (let i = 1; i < chapterandindex[value - 1].count; i++) {
                indexArray.push(i);
            }

            let html = indexArray.map((value, index) => <option key={index} value={value}>{value}</option>);

            setselectIndexList(html);
            document.getElementById('SelectIndex').disabled = false;

        } else {
            document.getElementById('SelectIndex').disabled = true;
        }
    }

    const resetFilter = () => {
        setsearch("");
        setIndex("0");
        setChapter("0");
        document.getElementById('SelectIndex').disabled = true;
    }

    const selectIndex = (event) => {
        setIndex(event.currentTarget.value);
    }

    async function countChapterandIndex() {
        dispatch(checkChapterandIndex()).then(res => {
            let html = res.payload.map((chapter, index) => <option key={index} value={chapter._id}>{chapter._id}</option>)
            setselectChapterList(html);
        })
    }

    // 화면 분할 액션 시 수행
    function switchView() {
        setshowListClass('py-3 col-3');
        setsearchInfoClass('d-none');
        setQAListH('95%');
        setQAListmaxH('95%');
        document.getElementById('showList').style.borderRight = '1px solid rgba(0, 0, 0, .25)';
        document.getElementById('indexButton').style.display = 'inline';
        setshowPageClass('px-0 col-9');
    }

    // 화면 복귀 액션 시 수행
    const switchReturn = () => {
        setshowListClass('px-0 py-3 col-12');
        setsearchInfoClass('my-3 mx-auto');
        setQAListH('auto');
        setQAListmaxH('65%');
        document.getElementById('showList').style.borderRight = '0px';
        document.getElementById('indexButton').style.display = 'none';
        setshowPageClass('d-none');
        setshowPage(null);
    }

    // 페이지 로드 후 최초 1회 수행
    useEffect(() => {
        countChapterandIndex();
    }, [])

    useEffect(() => {
        setshowListPage(<QandAListPage Chapter={Chapter} Index={Index} search={search} height={QAListH} maxHeight={QAListmaxH} setselectQA={setselectQA}/>);
    }, [search, Chapter, Index, QAListH, QAListmaxH])

    useEffect(() => {
        showQA(selectQA);
    }, [selectQA])

    return (
        <Container fluid className='m-0 p-0 row' style={{ height: '100%' }}>
            <div id='showList' className={showListClass} style={{ width: '100%', height: '100%' }}>
                <div id='searchInfo' className={searchInfoClass} style={{ width: '80%' }}>
                    <div className='mb-3 mx-auto' style={{ width: '90%', height: '50%' }}>
                        <label className="form-label" style={{ fontWeight: '600' }}>Search your Problem</label>
                        <div className='input-group'>
                            <input type='text' className='form-control text-center' value={search} onChange={onSearchHandler} />
                        </div>
                    </div>
                    <div className='mx-auto row' style={{ width: '90%' }}>
                        <Form className='col-5'>
                            <Form.Group controlId="SelectChapter">
                                <Form.Label>Chapter</Form.Label>
                                <Form.Control as="select" value={Chapter} onChange={selectChapter}>
                                    <option value="0">Select Chapter</option>
                                    {selectChapterList}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                        <Form className='col-5'>
                            <Form.Group controlId="SelectIndex">
                                <Form.Label>Index</Form.Label>
                                <Form.Control as="select" value={Index} onChange={selectIndex} disabled>
                                    <option value="0">Select Index</option>
                                    {selectIndexList}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                        <div className='col-2 pt-3' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button type='button' style={{ width: '100%' }} onClick={resetFilter}>Reset</Button>
                        </div>
                    </div>
                </div>
                {showListPage}
                <div className='mx-auto text-right' style={{ width: '80%' }}>
                    {QandAWrite}
                    <Button id='indexButton' variant='outline-warning' className='mx-0 my-2' style={{ display: 'none' }} onClick={switchReturn}>=</Button>
                </div>
            </div>
            <div id='showPage' className={showPageClass} style={{ height: '100%', overflowY: 'auto' }}>
                {showPage}
            </div>
        </Container>
    )
}

export default withRouter(QandAPage)
