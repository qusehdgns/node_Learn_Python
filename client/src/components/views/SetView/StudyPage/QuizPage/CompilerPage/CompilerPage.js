import React, { useState, useEffect } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'react-bootstrap';

import { solveQuiz, checkQuiz } from '../../../../../../_actions/quiz_action'

function CompilerPage(props) {
    // redux 사용을 위한 변수 선언
    const dispatch = useDispatch();

    const userstate = useSelector(state => state.user)

    const [codeInput, setcodeInput] = useState("");

    const [resultSpan, setresultSpan] = useState(null);

    const codeInputTabHandler = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setcodeInput(codeInput + '\t');
        }
    }

    const codeInputHandler = (event) => {
        setcodeInput(event.currentTarget.value);
    }

    const submitQuiz = () => {
        if (codeInput.replace(/\s/gi, "") === "") {
            alert("Type for Checking Code");
            setcodeInput("");
            document.getElementById('quiz_textarea').focus();
        } else {
            let body = {
                user_id: "guest",
                answer: codeInput
            }

            if (userstate.userData.isAuth) {
                body.user_id = userstate.userData._id
            }

            dispatch(solveQuiz(props.quizId, body)).then(res => {
                if (res.payload.success) {
                    setresultSpan(<span className='mx-3' style={{ color: 'green' }}>정답입니다!</span>);
                } else {
                    setresultSpan(<span className='mx-3' style={{ color: 'red' }}>오답입니다!</span>);
                }
            })
        }
    }

    function checkingCode() {
        if (typeof userstate.userData.isAuth !== 'undefined') {
            if (userstate.userData.isAuth) {
                let body = {
                    user_id: userstate.userData._id,
                    quiz_id: props.quizId
                }

                dispatch(checkQuiz(body)).then(res => {
                    if (res.payload.success && res.payload.value !== null) {
                        setcodeInput(res.payload.value.answer);

                        if (res.payload.value.success) {
                            setresultSpan(<span className='mx-3' style={{ color: 'green' }}>정답입니다!</span>);
                        } else {
                            setresultSpan(<span className='mx-3' style={{ color: 'red' }}>오답입니다!</span>);
                        }

                        document.getElementById('quiz_textarea').focus();
                    }
                });
            }
        }
    }

    useEffect(() => {
        setcodeInput("");
        checkingCode();
    }, [props])

    return (
        <div className='col-12 px-4 my-2'>
            <textarea id='quiz_textarea' className='form-control mb-2' value={codeInput} onKeyDown={codeInputTabHandler} onChange={codeInputHandler} />
            <div className='text-right'>
                {resultSpan}
                <Button type='button' onClick={submitQuiz}>Solve</Button>
            </div>
        </div>
    )
}

export default withRouter(CompilerPage)
