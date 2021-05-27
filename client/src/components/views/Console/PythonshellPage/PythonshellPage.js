// 리엑트 사용 선언
import React, { useState, useEffect } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';
// redux 사용하기 위한 선언
import { useDispatch, useSelector } from 'react-redux';

import { Container, Row, Button } from 'react-bootstrap';

import { runConsole, readConsole, saveConsole, deleteConsole } from '../../../../_actions/console_action';

import { FILTER_PAGES } from '../../../Config';


// 리엑트 NavBar 페이지 값 호출 함수
function PythonshellPage(props) {

    const dispatch = useDispatch();

    const consolestate = useSelector(state => state.console);

    const [runResult, setrunResult] = useState(null);
    const [textcode, settextcode] = useState("");
    const [inputArea, setinputArea] = useState("");

    const [loadBtnDisabled, setloadBtnDisabled] = useState(true);
    const [saveBtnDisabled, setsaveBtnDisabled] = useState(true);
    const [runBtnDisabled, setrunBtnDisabled] = useState(false);

    const onTextcodeTabHandler = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            settextcode(textcode + '\t');
        }
    }

    const onTextcodeHandler = (event) => {
        settextcode(event.currentTarget.value);
    }

    const loadHandler = () => {
        const value = consolestate.result.value;

        settextcode(value.code);
        setinputArea(value.input);
        setrunResult(null);
    }

    const savetextCodeHandler = () => {
        if (textcode.replace(/\s/gi, "") === "") {
            alert("Type for Saving Code");
            settextcode("");
            document.getElementById('console_code').focus();
        } else {
            let body = {
                code: textcode,
                input: inputArea
            };

            dispatch(saveConsole(body, props.state.userData._id)).then(res => {
                if (res.payload.success) {
                    readtextCodeHandler(props.state.userData._id);
                    alert("Complete Saving");
                } else {
                    alert("Fail to Save");

                    document.getElementById('console_code').focus();
                }
            });
        }
    }

    const onInputAreaTabHandler = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setinputArea(inputArea + '\t');
        }
    }

    const onInputAreaHandler = (event) => {
        setinputArea(event.currentTarget.value);
    }

    const runtextCodeHandler = () => {
        if (textcode.replace(/\s/gi, "") === "") {
            alert("Type for Runnig Code");
            settextcode("");
            document.getElementById('console_code').focus();
        } else {
            setrunBtnDisabled(true);
            setrunResult(null);

            let body = {
                isAuth: props.state.userData.isAuth,
                user_id: "guestUser",
                code: textcode
            };

            if (props.state.userData.isAuth) {
                body.user_id = props.state.userData._id;
            }

            if (inputArea != "") {
                body.input_data = inputArea.split('\n');
            }

            dispatch(runConsole(body)).then(res => {
                setrunResult(res.payload.result);
                setrunBtnDisabled(false);
            });
        }
    }

    const clearHandler = () => {
        settextcode("");
        setinputArea("");
        setrunResult(null);
        document.getElementById('console_code').focus();
    }

    function readtextCodeHandler(user_id) {
        dispatch(readConsole(user_id)).then(res => {
            if (res.payload.success) {
                if (res.payload.value != null) {
                    setloadBtnDisabled(false);
                }
            }
        });
    }

    useEffect(() => {
        document.getElementById('console_code').focus();
    }, [])

    useEffect(() => {
        setloadBtnDisabled(true);

        if (props.state.userData.isAuth) {
            setsaveBtnDisabled(false);
            readtextCodeHandler(props.state.userData._id);
        } else {
            setsaveBtnDisabled(true);
        }

        return () => {
            if (FILTER_PAGES.includes(window.location.pathname)) {
                setrunResult(null);
                settextcode("");
                setinputArea("");
                dispatch(deleteConsole());
            }
        }
    }, [props])

    return (
        <Container fluid className='px-0' style={{ height: '100%' }}>
            <Row className='mx-0' style={{ height: '100%' }}>
                <div className='col-6 px-0' style={{ height: '100%' }}>
                    <textarea id='console_code' className='border rounded p-1'
                        style={{ width: '100%', height: 'calc(100% - 47px)', resize: 'none', overflowY: 'auto', backgroundColor: '#EAEAEA' }}
                        value={textcode} onKeyDown={onTextcodeTabHandler} onChange={onTextcodeHandler} />
                    <Row className='mx-0'>
                        <div className='col-6'>
                            <Button type='button' variant='secondary' style={{ width: '100%' }} onClick={loadHandler} disabled={loadBtnDisabled} >Load</Button>
                        </div>
                        <div className='col-6'>
                            <Button type='button' variant='success' style={{ width: '100%' }} onClick={savetextCodeHandler} disabled={saveBtnDisabled}>Save</Button>
                        </div>
                    </Row>
                </div>
                <div className='col-6 px-0' style={{ height: '100%' }}>
                    <div style={{ height: '50%', width: '100%' }}>
                        <div className='p-1'>
                            <h3>Input Area</h3>
                        </div>
                        <div className='p-1' style={{ height: 'calc(100% - 95px)', width: '100%' }}>
                            <textarea className="border rounded p-1" style={{ width: '100%', height: '100%', resize: 'none', overflowY: 'auto' }}
                                value={inputArea} onKeyDown={onInputAreaTabHandler} onChange={onInputAreaHandler} />
                        </div>
                        <Row className='mx-0'>
                            <div className='col-6'>
                                <Button type='button' variant='primary' style={{ width: '100%' }} onClick={runtextCodeHandler} disabled={runBtnDisabled}>Run</Button>
                            </div>
                            <div className='col-6'>
                                <Button type='button' variant='outline-warning' style={{ width: '100%' }} onClick={clearHandler}>Clear All</Button>
                            </div>
                        </Row>
                    </div>
                    <div className='rounded p-1' style={{ height: '50%', width: '100%', overflowY: 'auto', backgroundColor: 'black' }}>
                        <pre style={{ whiteSpace: 'pre-line', wordBreak: 'break-all', color: 'white', fontSize: '18px' }}>
                            {runResult}
                        </pre>
                    </div>
                </div>
            </Row>
        </Container>
    )
}

export default withRouter(PythonshellPage)