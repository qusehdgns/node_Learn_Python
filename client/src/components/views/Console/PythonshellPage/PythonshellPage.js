// 리엑트 사용 선언
import React, { useState, useEffect } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';
// redux 사용하기 위한 선언
import { useDispatch } from 'react-redux';

import { Container, Row, Button } from 'react-bootstrap';

import { runConsole } from '../../../../_actions/console_action';


// 리엑트 NavBar 페이지 값 호출 함수
function PythonshellPage(props) {

    const dispatch = useDispatch();

    const [runResult, setrunResult] = useState(null);
    const [textcode, settextcode] = useState("");
    const [inputArea, setinputArea] = useState("");

    const onTextcodeTabHandler = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            settextcode(textcode + '\t');
        }
    }

    const onTextcodeHandler = (event) => {
        settextcode(event.currentTarget.value);
    }

    const cleartextCodeHandler = () => {
        settextcode("");
        document.getElementById('console_code').focus();
    }

    const runtextCodeHandler = () => {
        if(textcode.replace(/\s/gi, "") === ""){
            alert("Type for Runnig Code");
            settextcode("");
            document.getElementById('console_code').focus();
        } else {
            document.getElementById('consoleRun_btn').disabled = true;
            setrunResult(null);
    
            let body = {
                isAuth: props.state.userData.isAuth,
                user_id: "guestUser",
                code: textcode
            };
    
            if (props.state.userData.isAuth) {
                body.user_id = props.state.userData._id;
            }
    
            if(inputArea != ""){
                body.input_data = inputArea.split('\n');
            }
    
            dispatch(runConsole(body)).then(res => {
                setrunResult(res.payload.result);
                document.getElementById('consoleRun_btn').disabled = false;
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

    const clearInputAreaHandler = () => {
        setinputArea("");
        document.getElementById('console_input').focus();
    }

    useEffect(() => {
        settextcode("");
        setinputArea("");
        setrunResult(null);
        document.getElementById('console_code').focus();
    }, [])

    return (
        <Container fluid className='px-0' style={{ height: '100%' }}>
            <Row className='mx-0' style={{ height: '100%' }}>
                <div className='col-6 px-0' style={{ height: '100%' }}>
                    <textarea id='console_code' className='border rounded p-1'
                        style={{ width: '100%', height: 'calc(100% - 47px)', resize: 'none', overflowY: 'auto', backgroundColor: '#EAEAEA' }}
                        value={textcode} onKeyDown={onTextcodeTabHandler} onChange={onTextcodeHandler} />
                    <Row className='mx-0'>
                        <div className='col-6'>
                            <Button type='button' variant='outline-secondary' style={{ width: '100%' }} onClick={cleartextCodeHandler}>Clear</Button>
                        </div>
                        <div className='col-6'>
                            <Button id='consoleRun_btn' type='button' variant='primary' style={{ width: '100%' }} onClick={runtextCodeHandler}>Run</Button>
                        </div>
                    </Row>
                </div>
                <div className='col-6 px-0' style={{ height: '100%' }}>
                    <div style={{ height: '50%', width: '100%' }}>
                        <div className='p-1'>
                            <h3>Input Area</h3>
                        </div>
                        <div className='p-1' style={{ height: 'calc(100% - 95px)', width: '100%' }}>
                            <textarea id='console_input' className="border rounded p-1" style={{ width: '100%', height: '100%', resize: 'none', overflowY: 'auto' }}
                            value={inputArea} onKeyDown={onInputAreaTabHandler} onChange={onInputAreaHandler} />
                        </div>
                        <div className='text-right p-1'>
                            <Button type='button' variant='outline-warning' style={{ width: '50%' }} onClick={clearInputAreaHandler}>Input Clear</Button>
                        </div>
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