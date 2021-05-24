import React, { useState, useEffect } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';

import { useDispatch } from 'react-redux';

function WikiRUDPage(props) {
    // redux 사용을 위한 변수 선언
    const dispatch = useDispatch();

    useEffect(() => {

    }, [props])

    return (
        <div className='col-12'>
            <h1>RUD</h1>
        </div>
    )
}

export default withRouter(WikiRUDPage)
