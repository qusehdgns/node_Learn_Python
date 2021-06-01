import React, { useState, useEffect } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { readWiki, updateWiki, deleteWiki } from '../../../../../../../_actions/wiki_action';

function WikiRUDPage(props) {
    // redux 사용을 위한 변수 선언
    const dispatch = useDispatch();

    const [developmentTitle, setdevelopmentTitle] = useState(null);
    const [errorTitle, seterrorTitle] = useState(null);
    const [tipTitle, settipTitle] = useState(null);
    const [elseTitle, setelseTitle] = useState(null);

    const [developmentTag, setdevelopmentTag] = useState(null);
    const [errorTag, seterrorTag] = useState(null);
    const [tipTag, settipTag] = useState(null);
    const [elseTag, setelseTag] = useState(null);

    const updateHandler = (_id) => {
        document.getElementById(_id + "_ud").classList.add('d-none');
        document.getElementById(_id + "_sc").classList.remove('d-none');
        document.getElementById(_id + "_textarea").classList.remove('d-none');
        document.getElementById(_id + "_textarea").style.height = (document.getElementById(_id + "_textarea").scrollHeight + 2) + 'px';
        document.getElementById(_id + "_textarea").focus();
    }

    const deleteHandler = (_id) => {
        dispatch(deleteWiki(_id)).then(res => {
            if (res.payload.success) {
                findWikis(props.SelectId);
            } else {
                alert('Failed to Delete Wiki')
            }
        })
    }

    const submitHandler = (_id) => {

        const textarea = document.getElementById(_id + "_textarea");

        const wiki = textarea.value;

        if (wiki.replace(/\s/gi, "") === "") {
            alert("수정할 값을 입력해주세요.");
            textarea.value = document.getElementById(_id + "_wiki").innerText;
            textarea.style.height = (textarea.scrollHeight + 2) + "px";
            textarea.focus();
        } else {
            let body = {
                study_id: props.SelectId,
                user_id: props.userData._id,
                tag: Number(document.getElementById(_id + "_tag").value),
                explanation: wiki
            }

            dispatch(updateWiki(_id, body)).then(res => {
                if (res.payload.success) {
                    findWikis(props.SelectId);
                } else {
                    alert('Error at Update Wiki');
                }
            });
        }
    }

    const cancelHandler = (_id) => {
        document.getElementById(_id + "_ud").classList.remove('d-none');
        document.getElementById(_id + "_sc").classList.add('d-none');
        document.getElementById(_id + "_textarea").classList.add('d-none');
        document.getElementById(_id + "_textarea").value = document.getElementById(_id + "_wiki").innerText;
    }

    async function findWikis(study_id) {

        const Titlefuncs = [setdevelopmentTitle, seterrorTitle, settipTitle, setelseTitle];
        const Tagfuncs = [setdevelopmentTag, seterrorTag, settipTag, setelseTag];

        for (const i in Titlefuncs) {
            Titlefuncs[i](null);
            Tagfuncs[i](null);
        }

        await dispatch(readWiki(study_id)).then(async res => {
            const values = res.payload.value;

            const tagsTitle = ['Development', 'Error', 'Tip', 'Else'];

            await values.map(async (value, i) => {
                if (value.length) {
                    Titlefuncs[i](<h3>{tagsTitle[i]}</h3>);
                    Tagfuncs[i](await value.map((val, index) => {
                        if (props.userData.isAuth) {
                            if (props.userData.email === val.user_id.email) {
                                return <div key={index} className='row mx-0'>
                                    <div className='col-12 px-0'><pre id={val._id + "_wiki"}>{val.explanation}</pre></div>
                                    <input type="hidden" id={val._id + "_tag"} value={i + 1} />
                                    <textarea id={val._id + "_textarea"} className='showing form-control d-none' defaultValue={val.explanation} style={{ height: 'auto' }} />
                                    <div id={val._id + "_ud"} className='col-12 px-0 text-right' style={{ fontSize: '12px', fontWeight: 'lighter' }}>
                                        <span onClick={() => updateHandler(val._id)} style={{ textDecoration: 'underline', textDecorationColor: 'lightgray', cursor: 'pointer' }}>update</span>
                                        &nbsp;/&nbsp;
                                        <span onClick={() => deleteHandler(val._id)} style={{ textDecoration: 'underline', textDecorationColor: 'lightgray', cursor: 'pointer' }}>delete</span>
                                    </div>
                                    <div id={val._id + "_sc"} className='col-12 px-0 text-right d-none' style={{ fontSize: '12px', fontWeight: 'lighter' }}>
                                        <span onClick={() => submitHandler(val._id)} style={{ textDecoration: 'underline', textDecorationColor: 'lightgray', cursor: 'pointer' }}>submit</span>
                                        &nbsp;/&nbsp;
                                        <span onClick={() => cancelHandler(val._id)} style={{ textDecoration: 'underline', textDecorationColor: 'lightgray', cursor: 'pointer' }}>cancel</span>
                                    </div>
                                </div>;
                            } else if (props.userData.isAdmin) {
                                return <div key={index} className='row mx-0'>
                                    <div className='col-12 px-0'><pre>{val.explanation}</pre></div>
                                    <div className='col-12 px-0 text-right' style={{ fontSize: '12px', fontWeight: 'lighter' }}>
                                        <span className='col-12 px-0 text-right'>{val.user_id.email}</span>
                                        &nbsp;/&nbsp;
                                        <span onClick={() => deleteHandler(val._id)} style={{ textDecoration: 'underline', textDecorationColor: 'lightgray', cursor: 'pointer' }}>delete</span>
                                    </div>
                                </div>;
                            }
                        }
                        return <div key={index} className='row mx-0'>
                            <div className='col-12 px-0'><pre>{val.explanation}</pre></div>
                            <div className='col-12 px-0 text-right' style={{ fontSize: '12px', fontWeight: 'lighter' }}>{val.user_id.email}</div>
                        </div>;
                    }));
                }
            });
        });

        let divs = document.getElementsByClassName('showing');

        if (divs) {
            for (let div of divs) {
                div.style.height = (div.scrollHeight + 2) + "px";
            }
        }
    }

    useEffect(() => {
        findWikis(props.SelectId);
    }, [props])

    return (
        <div className='col-12 mb-2'>
            <div className='mb-1'>
                {developmentTitle}
                {developmentTag}
            </div>
            <div className='mb-1'>
                {errorTitle}
                {errorTag}
            </div>
            <div className='mb-1'>
                {tipTitle}
                {tipTag}
            </div>
            <div className='mb-1'>
                {elseTitle}
                {elseTag}
            </div>
        </div>
    )
}

export default withRouter(WikiRUDPage)
