import React, { useState, useEffect } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';
// redux 사용하기 위한 선언
import { useDispatch, useSelector } from 'react-redux';

import { readStudyList } from '../../../../../_actions/list_action';

import { moveStudy } from '../../../../../_actions/user_action';

function StudyListPage(props) {
    // Redux 사용 선언
    const dispatch = useDispatch();

    const state = useSelector(state => state.user);

    const [StudyList, setStudyList] = useState(null);

    async function findStudyList() {

        const res = await dispatch(readStudyList()).then(res => res);

        if (res.payload.status) {

            const value = res.payload.value;

            let html = value.map((value, index) => {
                if (value.index == 0) {
                    return <li className='list-group-item list-group-item-success' key={index}>{value.chapter}.{value.title}</li>
                } else {
                    if (props.SelectId == value._id) {
                        return <button id={value._id} type='button' className='list-group-item list-group-item-action active' key={index}>
                            {value.chapter}-{value.index}.{value.title}
                        </button>
                    } else {
                        return <button id={value._id} type='button' className='list-group-item list-group-item-action' key={index} onClick={() => setActivateIndex(value._id)}>
                            {value.chapter}-{value.index}.{value.title}
                        </button>
                    }
                }
            })

            setStudyList(html);

        } else {
            alert("Study List Error")
        }
    }


    async function moveStudyId(userData, study_id){
        
        let body = {
            _id: userData._id,
            study_id: study_id
        }

        await dispatch(moveStudy(body)).then(res => res);
    }

    async function setActivateIndex(SelectId) {

        if (state.hasOwnProperty('userData')) {
            if (state.userData.isAuth) {
                await moveStudyId(state.userData, SelectId);
            }
        }

        props.setSelectId(SelectId)
    }

    useEffect(async () => {
        await findStudyList();
    }, [props])

    return (
        <div style={{ height: '100%', width: '300px', borderRight: '1px solid rgba(0,0,0,.3)', overflowY: 'auto' }}>
            <ol className="list-group">
                {StudyList}
            </ol>
        </div >
    )
}

export default withRouter(StudyListPage)
