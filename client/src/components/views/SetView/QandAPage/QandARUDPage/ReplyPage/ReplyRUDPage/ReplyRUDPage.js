import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { withRouter } from 'react-router-dom';

import { readReply, updateReply, deleteReply } from '../../../../../../../_actions/reply_action';

//bootstrap
import { Button } from 'react-bootstrap'

function ReplyRUDPage(props) {
    // redux 사용을 위한 변수 선언
    const dispatch = useDispatch();

    const userstate = useSelector(state => state.user);

    const [replyLists, setreplyLists] = useState(null);

    const submitCommend = (_id) => {

        const textarea = document.getElementById(_id + "_textarea");

        const Reply = textarea.value;

        if (Reply.replace(/\s/gi, "") === "") {
            alert("댓글을 입력해주세요");
            textarea.value = document.getElementById(_id + "_reply").value;
            textarea.style.height = 'auto';
            textarea.style.height = (textarea.scrollHeight + 2) + "px";
            textarea.focus();
        } else {
            let body = {
                qanda_id: props.qanda_id,
                user_id: props.userData._id,
                reply: Reply
            };

            dispatch(updateReply(_id, body)).then(res => {
                if (res.payload.success) {
                    findReplies(props.qanda_id);
                } else {
                    alert("Error at comment");
                }
            })
        }
    }

    const cancelCommend = (_id) => {
        const textarea = document.getElementById(_id + "_textarea");

        document.getElementById(_id + "_ud").className = 'row';
        textarea.value = document.getElementById(_id + "_reply").value;
        textarea.style.resize = 'none';
        textarea.readOnly = true;
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight + 2) + "px";
        document.getElementById(_id + "_sc").className = 'd-none';
    }

    const updateCommend = (_id) => {
        document.getElementById(_id + "_ud").className = 'd-none';
        document.getElementById(_id + "_textarea").style.resize = 'vertical';
        document.getElementById(_id + "_textarea").readOnly = false;
        document.getElementById(_id + "_sc").className = 'row';
    }

    const deleteCommend = (_id) => {
        dispatch(deleteReply(_id)).then(res => {
            if (res.payload.success) {
                findReplies(props.qanda_id);
            } else {
                alert('Failed to Delete')
            }
        })
    }

    async function findReplies(qanda_id) {
        setreplyLists(null);

        await dispatch(readReply(qanda_id)).then(async res => {
            let html = null;
            if (!res.payload.status) {
                html = <h3>Error at Reading Replies</h3>
            } else {
                let values = res.payload.value;

                html = await values.map((value, index) => {
                    let reply = <div className='border rounded mt-2 p-2 row mx-1' key={index}>
                        <div className='col-12'>
                            {value.user_id.email}<br />
                            <textarea id={value._id + "_textarea"} className='form-control px-1 bg-white' defaultValue={value.reply} style={{ resize: 'none', height: 'auto' }} readOnly />
                            {value.date}
                        </div>
                    </div>;

                    if (userstate.hasOwnProperty('userData')) {
                        if (userstate.userData.isAuth && userstate.userData.email === value.user_id.email) {
                            reply = <div className='border rounded mt-2 p-2 row mx-1' key={index}>
                                <div className='col-10'>
                                    {value.user_id.email}<br />
                                    <input type='hidden' id={value._id + "_reply"} value={value.reply} />
                                    <textarea id={value._id + "_textarea"} className='showing form-control px-1 bg-white' defaultValue={value.reply} style={{ resize: 'none', height: 'auto' }} readOnly />
                                    {value.date}
                                </div>
                                <div className='col-2 mb-4' style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                                    <div id={value._id + "_sc"} className='d-none'>
                                        <div className='col-12 mb-1 text-center'>
                                            <Button variant='outline-success' type='button' size="sm" style={{ width: '60px' }} onClick={() => submitCommend(value._id)}>submit</Button>
                                        </div>
                                        <div className='col-12 text-center'>
                                            <Button variant='outline-dark' type='button' size="sm" style={{ width: '60px' }} onClick={() => cancelCommend(value._id)}>cancel</Button>
                                        </div>
                                    </div>
                                    <div id={value._id + "_ud"} className='row'>
                                        <div className='col-12 mb-1 text-center'>
                                            <Button variant='outline-info' type='button' size="sm" style={{ width: '60px' }} onClick={() => updateCommend(value._id)}>update</Button>
                                        </div>
                                        <div className='col-12 text-center'>
                                            <Button variant='outline-danger' type='button' size="sm" style={{ width: '60px' }} onClick={() => deleteCommend(value._id)}>delete</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>;
                        }
                    }

                    return reply
                });
            }
            setreplyLists(html);
        });

        let divs = document.getElementsByClassName('showing');

        if (divs) {
            for (let div of divs) {
                div.style.height = (div.scrollHeight + 2) + "px";
            }
        }
    }

    useEffect(() => {
        findReplies(props.qanda_id);
    }, [props])

    return (
        <div className='col-12'>
            {replyLists}
        </div>
    )
}

export default withRouter(ReplyRUDPage)
