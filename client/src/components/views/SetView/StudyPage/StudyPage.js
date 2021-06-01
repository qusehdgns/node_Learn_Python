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

    const [SelectId, setSelectId] = useState('60b627820bd2722517ba2a19');

    const [StudyEdu, setStudyEdu] = useState(null);
    const [Quiz, setQuiz] = useState(null);

    useEffect(() => {
        if (typeof state.userData !== 'undefined') {
            if (state.userData.isAuth) {
                setSelectId(state.userData.study_id);
            }
        }
    }, [state])

    useEffect(() => {
        setStudyEdu(<StudyEduPage SelectId={SelectId} userstate={state} />);
        setQuiz(<QuizPage SelectId={SelectId} userstate={state} />);
        
        return () => {
            setStudyEdu(null);
            setQuiz(null);
        }
    }, [SelectId])

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
            <StudyListPage setSelectId={setSelectId} SelectId={SelectId}/>
            <div style={{
                height: '100%', width: 'calc(100% - 300px)', overflowY: 'auto'
            }}>
                <Container fluid className='p-2'>
                    {StudyEdu}
                    {Quiz}
                </Container>
            </div>
        </div>
    )
}

export default withRouter(StudyPage)
