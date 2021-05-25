import React, { useState, useEffect } from 'react'
// redux를 함께 사용하기 위해 라우터 돔에 파일을 올리기 위한 선언
import { withRouter } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { readWiki } from '../../../../../../../_actions/wiki_action';

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

    async function findWikis(study_id) {

        const Titlefuncs = [setdevelopmentTitle, seterrorTitle, settipTitle, setelseTitle];
        const Tagfuncs = [setdevelopmentTag, seterrorTag, settipTag, setelseTag];

        for(const i in Titlefuncs){
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
                        console.log(val, index);
                        return <div key={index} className='row mx-0'>
                            <div className='col-12 px-0'>{val.explanation}</div>
                            <div className='col-12 px-0 text-right' style={{ fontSize: '12px', fontWeight: 'lighter' }}>{val.user_id.email}</div>
                        </div>;
                    }));
                }
            });
        });
    }

    useEffect(() => {
        findWikis(props.SelectId);
    }, [props])

    return (
        <div className='col-12 mb-3'>
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
