import React, { useState, useEffect } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';
// redux 사용하기 위한 선언
import { useDispatch } from 'react-redux';

import { readStudy } from '../../../../../_actions/study_action';

function StudyEduPage(props) {
    // Redux 사용 선언
    const dispatch = useDispatch();

    const [studyTitle, setstudyTitle] = useState("");
    const [studyMaterial, setstudyMaterial] = useState("");
    const [studyCode, setstudyCode] = useState("");

    async function findStudy(study_id){
        const res = await dispatch(readStudy({ study_id: study_id })).then(res => res);

        const value = res.payload.value;

        setstudyTitle(value.title);
        setstudyMaterial(value.material);
        setstudyCode(value.code);
    }

    useEffect(() => {
        findStudy(props.SelectId);
    }, [props])

    return (
        <div className='border rounded p-1 row'>
            <span className='col-12 text-left px-5'>{studyTitle}</span>
            <div className='col-12 text-left px-5'>
                <h3>Explain</h3>
                {studyMaterial}
            </div>
            <div className='col-12 px-5'>
                <h3>Code</h3>
                <pre><code>{studyCode}</code></pre>
            </div>
        </div>
    )
}

export default withRouter(StudyEduPage)
