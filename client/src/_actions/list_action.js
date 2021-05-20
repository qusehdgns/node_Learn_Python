// ajax와 유사한 통신 라이브러리 선언
import Axios from 'axios';
// 액션 결과를 나타내는 타입값 선언
import {
    CHECK_CHAPTERANDINDEX,
    READ_STUDYLIST
} from './types';
// api 기본 게이트를 저장한 정보 호출
import { LIST_SERVER } from '../components/Config';

export function checkChapterandIndex() {

    const req = Axios.get(`${LIST_SERVER}/chapterandindex`)
        .then(res => res.data);

    return {
        type: CHECK_CHAPTERANDINDEX,
        payload: req
    }
}

export function readStudyList() {
    // 백엔드 서버에게 Post 형식으로 요청을 보낸 후 결과값 리턴
    const req = Axios.get(`${LIST_SERVER}`)
    .then(res => res.data);

    // 결과 값과 액션 결과를 리턴
    return {
        type: READ_STUDYLIST,
        payload: req
    }
}