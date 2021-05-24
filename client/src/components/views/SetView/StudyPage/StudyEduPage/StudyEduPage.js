import React, { useState, useEffect } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';
// redux 사용하기 위한 선언
import { useDispatch } from 'react-redux';

import { readStudy } from '../../../../../_actions/study_action';

import WikiPage from './WikiPage/WikiPage';

import { Row } from 'react-bootstrap';

function StudyEduPage(props) {
    // Redux 사용 선언
    const dispatch = useDispatch();

    const [studyTitle, setstudyTitle] = useState("");
    const [studyMaterial, setstudyMaterial] = useState("");
    const [studyCode, setstudyCode] = useState("");

    const [showWiki, setshowWiki] = useState(null);

    async function findStudy(study_id) {
        const res = await dispatch(readStudy({ study_id: study_id })).then(res => res);

        const value = res.payload.value;

        setstudyTitle(value.title);
        setstudyMaterial(value.material);
        setstudyCode(value.code);
    }

    useEffect(() => {
        findStudy(props.SelectId);
        setshowWiki(<WikiPage SelectId={props.SelectId} userstate={props.userstate} />)
    }, [props])

    return (
        <div className='row mx-0 px-0'>
            <span className='col-12 text-left px-3'>{studyTitle}</span>
            <div className='col-12 text-left px-3'>
                <h3>Explain</h3>
                {studyMaterial}
            </div>
            <div className='col-12 px-3'>
                <h3>Code</h3>
                <pre><code>{studyCode}</code></pre>
            </div>
            <div className='col-12 px-0'>
                {showWiki}
            </div>
        </div>
    )
}

export default withRouter(StudyEduPage)
