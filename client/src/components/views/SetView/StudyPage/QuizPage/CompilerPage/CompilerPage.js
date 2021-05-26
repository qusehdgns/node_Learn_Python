import React, { useState, useEffect } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { Button } from 'react-bootstrap';

function CompilerPage(props) {
    // redux 사용을 위한 변수 선언
    const dispatch = useDispatch();

    const [codeInput, setcodeInput] = useState("");

    const codeInputTabHandler = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setcodeInput(codeInput + '\t');
        }
    }

    const codeInputHandler = (event) => {
        setcodeInput(event.currentTarget.value);
    }

    return (
        <div className='col-12 px-4 my-2'>
            <textarea className='form-control mb-2' value={codeInput} onKeyDown={codeInputTabHandler} onChange={codeInputHandler} />
            <div className='text-right'>
                <Button>test</Button>
            </div>
        </div>
    )
}

export default withRouter(CompilerPage)
