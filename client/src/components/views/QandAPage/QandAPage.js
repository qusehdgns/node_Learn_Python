// 리엑트 사용 선언
import React, { useState } from 'react'

// 리엑트 NavBar 페이지 값 호출 함수
function QandAPage() {
    const [search, setsearch] = useState("")

    const onSearchHandler = (event) => {
        setsearch(event.currentTarget.value)
    }

    return (
        <div style={{
            width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
        }}>
            <div style={{ width: '80%', height: '20%', justifyContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ width: '90%', height: '30%', textAlign: 'center', padding: '2% auto'}}>
                    <input type='text' style={{width:'80%', height:'100%', textAlign: 'center'}} value={search} onChange={onSearchHandler}></input>
                    <button style={{width: '20%', height: '100%'}}>Search</button>
                </div>
                <div style={{ width: '90%', height: '30%', border: '1px solid rgba(0,0,0,.7)', textAlign: 'center', margin: '2% auto'}}>
                    <h1>Filtering Options</h1>
                </div>
            </div>
            <div style={{ width: '80%', height: '70%', overflowY: 'auto' }}>
                <div style={{ width: '85%', height: '35%', margin: '2% auto', border: '1px solid rgba(0,0,0,.7)', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                    <h1>Questions List</h1>
                </div>
                <div style={{ width: '85%', height: '35%', margin: '2% auto', border: '1px solid rgba(0,0,0,.7)', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                    <h1>Questions List</h1>
                </div>
                <div style={{ width: '85%', height: '35%', margin: '2% auto', border: '1px solid rgba(0,0,0,.7)', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                    <h1>Questions List</h1>
                </div>
            </div>
        </div>
    )
}

export default QandAPage
