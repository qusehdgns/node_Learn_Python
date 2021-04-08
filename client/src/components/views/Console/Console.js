// 리엑트 사용 선언
import React, { useState } from 'react'

// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';

// 리엑트 NavBar 페이지 값 호출 함수
function Console(props) {
    const [textcode, settextcode] = useState("def test(item):\n\tresult = item\n\n\treturn result");

    const onTextcodeHandler = (event) => {
        settextcode(event.currentTarget.value);
    }
    return (
        <div id='console' style={{
            position: 'fixed', bottom: 0, right: 0, width: 'calc(100vw - 80px)', height: '85vh', display: 'none', zIndex: 5, backgroundColor: 'white'
            , flexDirection: 'row'
        }}>
            <div style={{ width: '50%', height: '100%', backgroundColor: 'black', padding: '10px' }}>
                <h1 style={{ color: 'white' }}>Terminal</h1>
                <h6></h6>
            </div>
            <div style={{ width: '50%', height: '100%', padding: '10px' }}>
                <textarea id='console_input' style={{ width: '100%', height: '100%', border: '0 solid white', resize: 'none' }} value={textcode} onChange={onTextcodeHandler}>
                </textarea>
            </div>
        </div>
    )
}

export default withRouter(Console)
