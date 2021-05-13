// 리엑트 사용 선언
import React, { useState } from 'react'

// 리엑트 NavBar 페이지 값 호출 함수
function StudyPage() {
    const [solvecode, setsolvecode] = useState("def test(item):\n\tresult = item\n\n\treturn result");

    const onSolvecodeHandler = (event) => {
        setsolvecode(event.currentTarget.value);
    }
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
            <div style={{ height: '100%', width: '300px', borderRight: '1px solid rgba(0,0,0,.3)', overflowY: 'auto' }}>
                <ol>
                    <li>Chapter01</li>
                    <ul>
                        <li>temp1</li>
                        <li>temp2</li>
                        <li>temp3</li>
                    </ul>
                    <li>Chapter02</li>
                    <ul>
                        <li>temp1</li>
                        <li>temp2</li>
                        <li>temp3</li>
                    </ul>
                    <li>Chapter03</li>
                    <ul>
                        <li>temp1</li>
                        <li>temp2</li>
                        <li>temp3</li>
                    </ul>
                    <li>Chapter04</li>
                    <ul>
                        <li>temp1</li>
                        <li>temp2</li>
                        <li>temp3</li>
                    </ul>
                    <li>Chapter05</li>
                    <ul>
                        <li>temp1</li>
                        <li>temp2</li>
                        <li>temp3</li>
                    </ul>
                    <li>Chapter06</li>
                    <ul>
                        <li>temp1</li>
                        <li>temp2</li>
                        <li>temp3</li>
                    </ul>
                    <li>Chapter07</li>
                    <ul>
                        <li>temp1</li>
                        <li>temp2</li>
                        <li>temp3</li>
                    </ul>
                </ol>
            </div>
            <div style={{
                height: '100%', width: 'calc(100% - 300px)', overflowY: 'auto'
            }}>
                <div style={{ width: '80%', height: '400px', margin: '2%', border: '1px solid rgba(0,0,0,.7)', justifyContent: 'center', display: 'flex', alignItems: 'center', margin: '15px auto' }}>
                    <h1>Select Chapter Educational material</h1>
                </div>
                <div style={{ width: '80%', height: '300px', margin: '2%', border: '1px solid rgba(0,0,0,.7)', justifyContent: 'center', display: 'flex', alignItems: 'center', margin: '15px auto' }}>
                    <h1>Quiz for User</h1>
                </div>
                <div style={{ width: '80%', height: '300px', margin: '2%', border: '1px solid rgba(0,0,0,.7)', justifyContent: 'center', display: 'flex', alignItems: 'center', margin: '15px auto', padding: '10px' }}>
                    <textarea style={{ width: '100%', height: '100%', border: '0 solid white', resize: 'none' }} value={solvecode} onChange={onSolvecodeHandler}>
                    </textarea>
                </div>
            </div>
        </div>
    )
}

export default StudyPage
