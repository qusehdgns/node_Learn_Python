import React, { useState, useEffect } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';
// redux 사용하기 위한 선언
import { useDispatch } from 'react-redux';


import { readQandA } from '../../../../../_actions/qanda_action';

function QandAListPage(props) {
    // Redux 사용 선언
    const dispatch = useDispatch();

    const [qandaList, setqandaList] = useState(null);

    const [maxH, setmaxH] = useState(props.maxHeight)
    const [H, setH] = useState(props.height)

    // 게시물 DB 통신 후 화면에 출력
    async function findList() {
        let html = null;

        let body = {};

        if (props.Chapter != 0) {
            body.chapter = props.Chapter;
        }

        if (props.Index != 0) {
            body.index = props.Index;
        }

        if (props.search.replace(/ /g, "") != "") {
            body.search = props.search;
        }

        const res = await dispatch(readQandA(body)).then(res => res);

        if (!res.payload.status) {
            html = <h3>Can not find Searching List</h3>
        } else {
            let values = res.payload.value;

            html = values.map((value, index) => <div className='border rounded my-2' style={{ cursor: 'pointer' }} key={index} onClick={() => props.setselectQA(value)}>{value.title}<br />{value.user_id.email}<br />{value.date}<br /></div>);
        }
        setqandaList(html);
    }

    useEffect(() => {
        findList();
        setH(props.height);
        setmaxH(props.maxHeight);
    }, [props])

    return (
        <div className='text-center mx-auto' style={{ width: '80%', height: H, maxHeight: maxH, overflowY: 'auto' }}>
            {qandaList}
        </div>
    )
}

export default withRouter(QandAListPage)
