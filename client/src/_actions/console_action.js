// ajax와 유사한 통신 라이브러리 선언
import Axios from 'axios';
// 액션 결과를 나타내는 타입값 선언
import {
    RUN_CONSOLE,
    READ_CONSOLE,
    SAVE_CONSOLE,
    DELETE_CONSOLE
} from './types';
// api 기본 게이트를 저장한 정보 호출
import { CONSOLE_SERVER } from '../components/Config';

export function runConsole(dataTosubmit) {

    const req = Axios.post(`${CONSOLE_SERVER}`, dataTosubmit)
        .then(res => res.data);

    return {
        type: RUN_CONSOLE,
        payload: req
    }
}

export function readConsole(user_id) {

    const req = Axios.get(`${CONSOLE_SERVER}/${user_id}`)
        .then(res => res.data);

    return {
        type: READ_CONSOLE,
        payload: req
    }
}

export function saveConsole(dataTosubmit, user_id) {

    const req = Axios.put(`${CONSOLE_SERVER}/${user_id}`, dataTosubmit)
        .then(res => res.data);

    return {
        type: SAVE_CONSOLE,
        payload: req
    }
}

export function deleteConsole() {
    return {
        type: DELETE_CONSOLE,
        payload: null
    }
}