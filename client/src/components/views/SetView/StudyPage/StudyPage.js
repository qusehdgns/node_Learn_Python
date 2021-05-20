// 리엑트 사용 선언
import React, { useState, useEffect } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';
// redux 사용하기 위한 선언
import { useSelector } from 'react-redux';

import StudyListPage from './StudyListPage/StudyListPage'

import StudyEduPage from './StudyEduPage/StudyEduPage'

import QuizPage from './QuizPage/QuizPage'

//bootstrap
import { Container } from 'react-bootstrap'

// 리엑트 NavBar 페이지 값 호출 함수
function StudyPage(props) {

    const state = useSelector(state => state.user);

    const [SelectId, setSelectId] = useState('609b29ada6c08a3296ec0b83');

    const [StudyList, setStudyList] = useState(<StudyListPage setSelectId={setSelectId} SelectId={SelectId} />);
    const [StudyEdu, setStudyEdu] = useState(<StudyEduPage SelectId={SelectId} />);
    const [Quiz, setQuiz] = useState(<QuizPage SelectId={SelectId} />);

    useEffect(() => {
        if (state.hasOwnProperty('userData')) {
            if (state.userData.isAuth) {
                setSelectId(state.userData.study_id);
            }
        }
    }, [state])

    useEffect(() => {
        setStudyList(<StudyListPage setSelectId={setSelectId} SelectId={SelectId} />);
        setStudyEdu(<StudyEduPage SelectId={SelectId} />);
        setQuiz(<QuizPage SelectId={SelectId} />);
    }, [SelectId])

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
            {StudyList}
            <div style={{
                height: '100%', width: 'calc(100% - 300px)', overflowY: 'auto'
            }}>
                <Container fluid className='p-2'>
                    {StudyEdu}
                    {Quiz}
                    <div style={{ width: '80%', height: '300px', margin: '2%', border: '1px solid rgba(0,0,0,.7)', justifyContent: 'center', display: 'flex', alignItems: 'center', margin: '15px auto', padding: '10px' }}>
                        <textarea style={{ width: '100%', height: '100%', border: '0 solid white', resize: 'none' }}>
                        </textarea>
                    </div></Container>
            </div>
        </div>
    )
}

export default withRouter(StudyPage)
