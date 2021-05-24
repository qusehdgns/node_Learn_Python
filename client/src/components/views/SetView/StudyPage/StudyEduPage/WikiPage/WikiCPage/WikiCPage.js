import React, { useState, useEffect } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { Form, Button } from 'react-bootstrap';

import { createWiki } from '../../../../../../../_actions/wiki_action';

import WikiRUDPage from '../WikiRUDPage/WikiRUDPage';

function WikiCPage(props) {
    // redux 사용을 위한 변수 선언
    const dispatch = useDispatch();

    const [selectTag, setselectTag] = useState(0);
    const [textareaWiki, settextareaWiki] = useState("");

    const selectTageHandler = (event) => {
        setselectTag(event.currentTarget.value);
    }

    const textareaWikiHandler = (event) => {
        settextareaWiki(event.currentTarget.value);
    }

    const onWikiSubmitHandler = (event) => {
        event.preventDefault();

        if (props.userData.role === 0) {
            alert("You don't have Permission to Add Wiki");
            window.location.reload();
        } else {
            if (selectTag === 0) {
                alert("Choose Tag for Submit");
                document.getElementById('SelectTag').focus();
            } else {
                if (textareaWiki.replace(/\s/gi, "") === "") {
                    alert("Write Wiki for Submit");
                    settextareaWiki("");
                    document.getElementById('wikiInput').focus();
                } else {
                    let body = {
                        study_id: props.SelectId,
                        user_id: props.userData._id,
                        tag: selectTag,
                        explanation: textareaWiki
                    };

                    dispatch(createWiki(body)).then(res => {
                        if (res.payload.success) {
                            props.setRUDPage(<WikiRUDPage SelectId={props.SelectId} userData={props.userData} />);
                            document.getElementById('wikiInput').style.height = '40px';
                            settextareaWiki("");
                            setselectTag(0);
                        } else {
                            alert("Error at Adding Wiki");
                        }
                    })
                }
            }
        }
    }

    useEffect(() => {
        document.getElementById('wikiInput').style.height = '40px';
        settextareaWiki("");
        setselectTag(0);
    }, [props])

    return (
        <div className='border rounded col-12'>
            <Form className='row py-2' onSubmit={onWikiSubmitHandler}>
                <Form.Label className='col-7 my-1' style={{ fontWeight: '600', fontSize: '20px' }}>Add Wiki</Form.Label>
                <Form.Group controlId="SelectTag" className='col-5 my-1'>
                    <Form.Control as="select" value={selectTag} onChange={selectTageHandler}>
                        <option value="0">Select Tag</option>
                        <option value="1">Development</option>
                        <option value="2">Error</option>
                        <option value="3">Tip</option>
                        <option value="4">Else</option>
                    </Form.Control>
                </Form.Group>
                <div className='input-group col-12 my-1'>
                    <textarea id='wikiInput' className='form-control' value={textareaWiki} onChange={textareaWikiHandler} style={{ minHeight: '40px', height: '40px' }} />
                    <Button variant="success" type='submit'>Submit</Button>
                </div>
            </Form>
        </div>
    )
}

export default withRouter(WikiCPage)
