import { useSelector } from 'react-redux'

import React, { useState } from 'react'

function QTestPage(props) {

    const state = useSelector(state => state.user);

    const [search, setsearch] = useState("")

    const [toggle, settoggle] = useState(false);

    const onSearchHandler = (event) => {
        setsearch(event.currentTarget.value)
    }

    function checkConsole() {
        let console = document.getElementById('console');
        if (toggle === true) {
            settoggle(false);
            console.style.display = 'none';
        }
    }

    const movetoQTestWritePage = () => {
        checkConsole();
        props.history.push("/qtestwritepage");
    }

    let QTestWritepageButton = null;

    if (state.hasOwnProperty('userData')) {
        if (state.userData.isAuth) {

            QTestWritepageButton = <button style={{ margin: '5px 0' }} onClick={movetoQTestWritePage}>Write</button>;
        }
    }

    return (
        <div style={{
            width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
        }}>
            <div style={{ width: '80%', height: '20%', justifyContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ width: '90%', height: '30%', textAlign: 'center', padding: '2% auto'}}>
                    <input type='text' style={{width:'80%', height:'100%', textAlign: 'center'}} value={search} onChange={onSearchHandler}></input>
                    <button style={{width: '10%', height: '100%'}}>Search</button>
                    {QTestWritepageButton}
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

export default QTestPage