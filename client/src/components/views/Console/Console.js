// 리엑트 사용 선언
import React, { useState } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';
// redux 사용하기 위한 선언
import { useSelector } from 'react-redux';

import { Container, Row, Button } from 'react-bootstrap';

import PythonshellPage from './PythonshellPage/PythonshellPage';

// 리엑트 NavBar 페이지 값 호출 함수
function Console(props) {

    const state = useSelector(state => state.user);

    const [showCompiler, setshowCompiler] = useState(null);
    const [choiceCompiler, setchoiceCompiler] = useState("brython")

    const selectBrython = () => {
        if (choiceCompiler === "python-shell") {
            setchoiceCompiler("brython")
            document.getElementById('brython_div').classList.remove('d-none');
            setshowCompiler(null);
            document.getElementById('brython_textarea').focus();
        }
    }

    const selectPythonShell = () => {
        if (choiceCompiler === "brython") {
            setchoiceCompiler("python-shell")
            document.getElementById('brython_div').classList.add('d-none');
            setshowCompiler(<PythonshellPage state={state} />);
        }
    }
    
    const onBrythonTabHandler = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();

            document.getElementById('brython_textarea').value = document.getElementById('brython_textarea').value + '\t';
        }
    }

    const clearBrythonHandler = () => {
        document.getElementById('brython_textarea').value = '>>> ';
        document.getElementById('brython_textarea').focus();
    }

    return (
        <div id='console' style={{
            position: 'fixed', bottom: 0, right: 0, width: 'calc(100vw - 90px)', height: '85vh', display: 'none', zIndex: 5, backgroundColor: 'white'
        }}>
            <Container fluid className='px-0' style={{ height: '100%' }}>
                <Row id='selectCompilter_btn' className='mx-0'>
                    <div className='col-12 py-1 border-bottom text-right'>
                        <Button type='button' variant='outline-danger' className='mr-1' onClick={selectBrython}>Interpreter</Button>
                        <Button type='button' variant='outline-dark' onClick={selectPythonShell}>Editer</Button>
                    </div>
                </Row>
                <Container fluid className='px-0' style={{ height: 'calc(100% - 47px)' }}>
                    <Container id='brython_div' fluid className='px-0' style={{ height: '100%' }}>
                        <textarea id='brython_textarea' style={{
                            backgroundColor: '#000', color: '#fff', fontSize: '18px', overflowY: 'auto', resize: 'none',
                            height: '100%', width: '100%'
                        }} onKeyDown={onBrythonTabHandler} />
                        <Button variant='primary' style={{ position: 'fixed', bottom: 15, right: 15, zIndex: 10}} onClick={clearBrythonHandler}>clear</Button>
                    </Container>
                    {showCompiler}
                </Container>
            </Container>
        </div>
    )
}

export default withRouter(Console)
