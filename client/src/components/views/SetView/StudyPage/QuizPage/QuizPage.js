import React, { useState, useEffect } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';

function QuizPage(props) {
    

    useEffect(() => {
    }, [props])

    return (
        <div className='border rounded p-1 row'>
        </div>
    )
}

export default withRouter(QuizPage)
