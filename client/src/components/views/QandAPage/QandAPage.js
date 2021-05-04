// 리엑트 사용 선언
import React, { useState } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';
// redux 사용하기 위한 선언
import { useSelector } from 'react-redux';

//bootstrap
import { Button } from 'react-bootstrap'

// 리엑트 NavBar 페이지 값 호출 함수
function QandAPage(props) {
    const [search, setsearch] = useState("")

    const state = useSelector(state => state.user)

    const onSearchHandler = (event) => {
        setsearch(event.currentTarget.value)
    }

    const movetoQandAWrite = () => {
        props.history.push("/qandawrite");
    }

    let QandAWrite = null;

    if (state.hasOwnProperty('userData')) {
        if (state.userData.isAuth) {
            QandAWrite = <Button variant='outline-success' className='m-2' onClick={movetoQandAWrite}>Write</Button>;
        }
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
            <div>
                {QandAWrite}
            </div>
        </div>
    )
}

export default withRouter(QandAPage)
