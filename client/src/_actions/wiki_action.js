// ajax와 유사한 통신 라이브러리 선언
import Axios from 'axios';
// 액션 결과를 나타내는 타입값 선언
import {
    CREATE_WIKI,
    READ_WIKI,
    UPDATE_WIKI,
    DELETE_WIKI
} from './types';
// api 기본 게이트를 저장한 정보 호출
import { WIKI_SERVER } from '../components/Config';

export function createWiki(dataTosubmit) {

    const req = Axios.post(`${WIKI_SERVER}`, dataTosubmit)
        .then(res => res.data);

    return {
        type: CREATE_WIKI,
        payload: req
    }
}

export function readWiki(study_id) {

    const req = Axios.get(`${WIKI_SERVER}/${study_id}`)
        .then(res => res.data);

    return {
        type: READ_WIKI,
        payload: req
    }
}

export function updateWiki(_id, dataTosubmit) {
    // 백엔드 서버에게 Post 형식으로 요청을 보낸 후 결과값 리턴
    const req = Axios.put(`${WIKI_SERVER}/${_id}`, dataTosubmit)
        .then(res => res.data);

    // 결과 값과 액션 결과를 리턴
    return {
        type: UPDATE_WIKI,
        payload: req
    }
}

export function deleteWiki(_id) {

    const req = Axios.delete(`${WIKI_SERVER}/${_id}`)
        .then(res => res.data);

    return {
        type: DELETE_WIKI,
        payload: req
    }
}