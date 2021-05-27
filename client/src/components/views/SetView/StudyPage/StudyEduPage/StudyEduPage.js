import React, { useState, useEffect } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';
// redux 사용하기 위한 선언
import { useDispatch } from 'react-redux';

import { readStudy } from '../../../../../_actions/study_action';

import WikiPage from './WikiPage/WikiPage';

function StudyEduPage(props) {
    // Redux 사용 선언
    const dispatch = useDispatch();

    const [studyTitle, setstudyTitle] = useState("");
    const [studyMaterial, setstudyMaterial] = useState("");
    const [studyCode, setstudyCode] = useState("");

    const [showWiki, setshowWiki] = useState(null);

    function findStudy(study_id) {
        dispatch(readStudy({ study_id: study_id })).then(res => {
            const value = res.payload.value;

            if (value != null) {
                setstudyTitle(value.title);
                setstudyMaterial(value.material);
                setstudyCode(value.code);
            }
        });
    }

    useEffect(() => {
        findStudy(props.SelectId);
        setshowWiki(<WikiPage SelectId={props.SelectId} userstate={props.userstate} />)
    }, [props])

    return (
        <div className='row mx-0 px-0'>
            <div className='col-12 text-left px-3'>
                <h1>{studyTitle}</h1>
            </div>
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
