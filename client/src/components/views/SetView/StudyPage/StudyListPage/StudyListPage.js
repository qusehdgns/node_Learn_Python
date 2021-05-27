import React, { useState, useEffect } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';
// redux 사용하기 위한 선언
import { useDispatch, useSelector } from 'react-redux';

import { readStudyList } from '../../../../../_actions/list_action';

import { moveStudy } from '../../../../../_actions/user_action';

import { Tabs, Tab } from 'react-bootstrap'

function StudyListPage(props) {
    // Redux 사용 선언
    const dispatch = useDispatch();

    const state = useSelector(state => state.user);

    const [StudyList, setStudyList] = useState(null);

    const [selectId, setselectId] = useState(props.SelectId);

    function findStudyList() {

        dispatch(readStudyList()).then(res => {
            if (res.payload.status) {

                const value = res.payload.value;

                let html = value.map((value, index) => {
                    if (value.index === 0) {
                        return <Tab key={index} title={`${value.chapter}.${value.title}`} tabClassName='bg-light' disabled></Tab>
                    } else {
                        return <Tab key={value._id} eventKey={value._id} title={`${value.chapter}-${value.index}.${value.title}`}></Tab>
                    }
                });

                setStudyList(html);
            } else {
                alert("Study List Error")
            }
        });
    }


    function moveStudyId(userData, study_id) {

        let body = {
            _id: userData._id,
            study_id: study_id
        }

        dispatch(moveStudy(body));
    }

    function setActivateIndex(SelectId) {
        setselectId(SelectId);

        if (state.hasOwnProperty('userData')) {
            if (state.userData.isAuth) {
                moveStudyId(state.userData, SelectId);
            }
        }

        props.setSelectId(SelectId)
    }

    useEffect(() => {
        findStudyList();

        return () => {
            setStudyList(null);
        }
    }, [])

    useEffect(() => {
        if (state.hasOwnProperty("userData")) {
            if (state.userData.isAuth) {
                setselectId(state.userData.study_id);
            }
        }
    }, [state])

    return (
        <div style={{ height: '100%', width: '300px', borderRight: '1px solid rgba(0,0,0,.3)', overflowY: 'auto' }}>
            <Tabs transition={false} activeKey={selectId} variant="pills" className="flex-column" onSelect={(key) => setActivateIndex(key)}>
                {StudyList}
            </Tabs>
        </div>
    )
}

export default withRouter(StudyListPage)
