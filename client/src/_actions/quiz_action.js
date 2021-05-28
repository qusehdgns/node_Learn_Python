// ajax와 유사한 통신 라이브러리 선언
import Axios from 'axios';
// 액션 결과를 나타내는 타입값 선언
import {
    READ_QUIZ,
    SOLVE_QUIZ
} from './types';
// api 기본 게이트를 저장한 정보 호출
import { QUIZ_SERVER } from '../components/Config';

export function readQuiz(dataTosubmit) {

    const req = Axios.get(`${QUIZ_SERVER}`, {
        params: dataTosubmit
    }).then(res => res.data);

    return {
        type: READ_QUIZ,
        payload: req
    }
}

export function solveQuiz(quiz_id, dataTosubmit) {

    const req = Axios.post(`${QUIZ_SERVER}/${quiz_id}`, dataTosubmit)
        .then(res => res.data);

    return {
        type: READ_QUIZ,
        payload: req
    }
}