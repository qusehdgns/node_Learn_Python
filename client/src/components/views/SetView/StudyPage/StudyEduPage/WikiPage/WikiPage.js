import React, { useState, useEffect } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';

import WikiRUDPage from './WikiRUDPage/WikiRUDPage';

import WikiCPage from './WikiCPage/WikiCPage';

function WikiPage(props) {

    const [RUDPage, setRUDPage] = useState(null);
    const [CPage, setCPage] = useState(null);

    useEffect(() => {
        const userdata = props.userstate;
        if (typeof userdata.userData !== 'undefined') {
            if ([1, 2].includes(userdata.userData.role)) {
                setCPage(<WikiCPage SelectId={props.SelectId} userData={userdata.userData} setRUDPage={setRUDPage} />);
            }
        }
        setRUDPage(<WikiRUDPage SelectId={props.SelectId} userData={userdata.userData} />);
    }, [props])

    return (
        <div className='row mx-0 mb-2'>
            {RUDPage}
            {CPage}
        </div>
    )
}

export default withRouter(WikiPage)
