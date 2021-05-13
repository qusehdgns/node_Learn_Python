import React, { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux';

import { withRouter } from 'react-router-dom';

import { createReply } from '../../../../../../../_actions/reply_action';

import { Form, Button } from 'react-bootstrap'

import ReplyRUDPage from '../ReplyRUDPage/ReplyRUDPage';

function ReplyCPage(props) {
    // redux 사용을 위한 변수 선언
    const dispatch = useDispatch();

    const [Reply, setReply] = useState("");

    const onReplyHandler = (event) => {
        setReply(event.currentTarget.value);
    }

    const onReplySubmitHandler = (event) => {
        event.preventDefault();

        if (Reply.replace(/\s/gi, "") === "") {
            alert("댓글을 입력해주세요");
            setReply("");
            document.getElementById('replyInput').focus();
        } else {
            let body = {
                qanda_id: props.qanda_id,
                user_id: props.userData._id,
                reply: Reply
            };

            dispatch(createReply(body)).then(res => {
                if (res.payload.success) {
                    props.setreplyList(<ReplyRUDPage qanda_id={props.qanda_id}  userData={props.userData}/>);
                    setReply("");
                    document.getElementById('replyInput').style.height='60px';
                } else {
                    alert("Error at comment");
                }
            })
        }
    }

    useEffect(() => {
        setReply("");
        document.getElementById('replyInput').style.height='60px';
    }, [props])

    return (
        <div className='col-12'>
            <Form className='border rounded mt-2 px-2 pb-2 row mx-1 mb-5' style={{ height: 'auto', fontWeight: '600' }} onSubmit={onReplySubmitHandler}>
                <Form.Label className='my-1 p-0'>Comment for Quistion</Form.Label>
                <div className='input-group' style={{ height: 'auto' }}>
                    <textarea id='replyInput' className='form-control' value={Reply} onChange={onReplyHandler} style={{ height: '60px' }} />
                    <Button variant="success" type='submit'>Reply</Button>
                </div>
            </Form>
        </div>
    )
}

export default withRouter(ReplyCPage)
