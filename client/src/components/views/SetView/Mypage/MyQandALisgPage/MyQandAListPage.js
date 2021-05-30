import React, { useState, useEffect } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';
// redux 사용하기 위한 선언
import { useDispatch } from 'react-redux';

import { readMyQandA } from '../../../../../_actions/qanda_action';

function MyQandAListPage(props) {
    // Redux 사용 선언
    const dispatch = useDispatch();

    const [qandaList, setqandaList] = useState(null);

    // 게시물 DB 통신 후 화면에 출력
    async function findList() {
        let html = null;

        dispatch(readMyQandA(props.user_id)).then(res => {
            if (!res.payload.status) {
                html = <h4 className='text-center'>QandAList is Empty</h4>;
            } else {
                let values = res.payload.value;

                html = values.map((value, index) => <div className='border rounded my-2 mx-3 text-center' style={{ cursor: 'pointer'}} key={index} onClick={() => props.setselectMyQA(value)}>{value.title}<br />{value.user_id.email}<br />{value.date}<br /></div>);
            }
            setqandaList(html);
        });
    }

    useEffect(() => {
        findList();
    }, [props])

    return qandaList
}

export default withRouter(MyQandAListPage)
