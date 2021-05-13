import React, { useState, useEffect } from 'react'

import { withRouter } from 'react-router-dom';

//bootstrap
import { Container } from 'react-bootstrap'

import ReplyCPage from './ReplyCPage/ReplyCPage';
import ReplyRUDPage from './ReplyRUDPage/ReplyRUDPage';

function ReplyPage(props) {

    const [replyC, setreplyC] = useState(null);

    const [replyList, setreplyList] = useState(null);

    useEffect(() => {
        setreplyList(<ReplyRUDPage qanda_id={props.qanda_id}  userData={props.userstate.userData} />);
        // 로그인 상태 확인 후 Write 버튼 생성
        if (props.userstate.hasOwnProperty('userData')) {
            if (props.userstate.userData.isAuth) {
                setreplyC(<ReplyCPage qanda_id={props.qanda_id} userData={props.userstate.userData} setreplyList={setreplyList} />)
            }
        }
    }, [props])

    return (
        <Container fluid className='row p-0 border-top mx-auto mb-3'>
            {replyList}
            {replyC}
        </Container>
    )
}

export default withRouter(ReplyPage)