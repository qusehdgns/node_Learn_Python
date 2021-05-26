// 리엑트 사용 선언
import React, { useState } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';
// redux 사용하기 위한 선언
import { useSelector } from 'react-redux';


// ajax와 유사한 통신 라이브러리 선언
import Axios from 'axios';

// 리엑트 NavBar 페이지 값 호출 함수
function Console(props) {

    const state = useSelector(state => state.user);
    
    const [runResult, setrunResult] = useState(null);
    const [textcode, settextcode] = useState("def test(item):\n\tresult = item\n\n\treturn result");

    const runpython = () => {
        setrunResult(null);

        let body = {
            isAuth: state.userData.isAuth,
            user_id: "guestUser",
            code: textcode
        };

        if(state.userData.isAuth){
            body.user_id = state.userData._id;
        }

        Axios.post(`/api/console`, body).then(res => setrunResult(res.data.result));
    }

    const onTextcodeTabHandler = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            settextcode(textcode + '\t');
        }
    }

    const onTextcodeHandler = (event) => {
        settextcode(event.currentTarget.value);
    }

    return (
        <div id='console' style={{
            position: 'fixed', bottom: 0, right: 0, width: 'calc(100vw - 90px)', height: '85vh', display: 'none', zIndex: 5, backgroundColor: 'white'
            , flexDirection: 'row'
        }}>
            <div style={{ width: '50%', height: '100%', backgroundColor: 'black', padding: '10px' }}>
                <button onClick={runpython}>Test</button>
                <div><pre style={{ width: '100%',color: 'white', overflowY: 'auto', whiteSpace: 'pre-line', wordBreak: 'break-all'}}>{runResult}</pre></div>
            </div>
            <div style={{ width: '50%', height: '100%', padding: '10px' }}>
                <textarea id='console_input' style={{ width: '100%', height: '100%', border: '0 solid white', resize: 'none' }} value={textcode} onKeyDown={onTextcodeTabHandler} onChange={onTextcodeHandler}>
                </textarea>
            </div>
        </div>
    )
}

export default withRouter(Console)
