import React, { useState, useEffect } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';
// redux 사용하기 위한 선언
import { useDispatch } from 'react-redux';

import { readQuiz } from '../../../../../_actions/quiz_action';

import CompilerPage from './CompilerPage/CompilerPage';

function QuizPage(props) {
    // Redux 사용 선언
    const dispatch = useDispatch();

    const [ReturnValue, setReturnValue] = useState(null);

    async function findQuiz(study_id) {
        const res = await dispatch(readQuiz({ study_id: study_id })).then(res => res);

        const value = res.payload.value;

        let input = null;

        if (value) {
            if (value.hasOwnProperty('input')) {
                input = <div className='col-12 px-5'>
                    <h3>Input</h3>
                    {value.input}
                </div>;
            }
            setReturnValue(<div className='border rounded p-1 row mx-0'>
                <div className='col-12 text-left px-5'>
                    <h3>Quiz</h3>
                    {value.quiz}
                </div>
                {input}
                <div className='col-12 px-5'>
                    <h3>Output</h3>
                    {value.output}
                </div>
                <CompilerPage />
            </div >)
        } else {
            setReturnValue(value);
        }
    }


    useEffect(() => {
        findQuiz(props.SelectId);
    }, [props])

    return ReturnValue
}

export default withRouter(QuizPage)
