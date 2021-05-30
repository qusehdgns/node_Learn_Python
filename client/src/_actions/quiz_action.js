// ajax와 유사한 통신 라이브러리 선언
import Axios from 'axios';
// 액션 결과를 나타내는 타입값 선언
import {
    READ_QUIZ,
    SOLVE_QUIZ,
    CHECK_QUIZ,
    PROGRESS_QUIZ
} from './types';
// api 기본 게이트를 저장한 정보 호출
import { QUIZ_SERVER } from '../components/Config';

export function readQuiz(study_id) {

    const req = Axios.get(`${QUIZ_SERVER}/${study_id}`)
        .then(res => res.data);

    return {
        type: READ_QUIZ,
        payload: req
    }
}

export function solveQuiz(quiz_id, dataTosubmit) {

    const req = Axios.put(`${QUIZ_SERVER}/${quiz_id}`, dataTosubmit)
        .then(res => res.data);

    return {
        type: SOLVE_QUIZ,
        payload: req
    }
}

export function checkQuiz(dataTosubmit) {

    const req = Axios.get(`${QUIZ_SERVER}`, {
        params: dataTosubmit
    })
        .then(res => res.data);

    return {
        type: CHECK_QUIZ,
        payload: req
    }
}

export function checkQuizProgress(user_id) {

    const req = Axios.get(`${QUIZ_SERVER}/check/${user_id}`)
        .then(res => res.data);

    return {
        type: PROGRESS_QUIZ,
        payload: req
    }
}