// ajax와 유사한 통신 라이브러리 선언
import Axios from 'axios';
// 액션 결과를 나타내는 타입값 선언
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    CHECK_USER,
    RESET_PW,
    MOVE_STUDY
} from './types';
// api 기본 게이트를 저장한 정보 호출
import { USER_SERVER } from '../components/Config';

// 로그인 버튼 클릭 시 수행되는 함수
export function loginUser(dataTosubmit) {
    // 백엔드 서버에게 Post 형식으로 요청을 보낸 후 결과값 리턴
    const req = Axios.post(`${USER_SERVER}/login`, dataTosubmit)
        .then(res => res.data);

    // 결과 값과 액션 결과를 리턴
    return {
        type: LOGIN_USER,
        payload: req
    }
}

// 회원가입 버튼 클릭 시 수행되는 함수
export function registerUser(dataTosubmit) {
    // 백엔드 서버에게 Post 형식으로 요청을 보낸 후 결과값 리턴
    const req = Axios.post(`${USER_SERVER}/register`, dataTosubmit)
        .then(res => res.data);

    // 결과 값과 액션 결과를 리턴
    return {
        type: REGISTER_USER,
        payload: req
    }
}

// 권한 확인 여부를 미들웨어에서 체크하는 함수
export function auth() {
    // 백엔드 서버에게 Get 형식으로 요청을 보낸 후 결과값 리턴
    const req = Axios.get(`${USER_SERVER}/auth`)
        .then(res => res.data);

    // 결과 값과 액션 결과를 리턴
    return {
        type: AUTH_USER,
        payload: req
    }
}

// 로그아웃 버튼 클릭 시 수행되는 함수
export function logoutUser() {
    // 백엔드 서버에게 GET 방식의 요청을 받은 후 결과값 니턴
    const req = Axios.get(`${USER_SERVER}/logout`)
        .then(res => res.data);

    // 결과 값과 액션 결과를 리턴
    return {
        type: LOGOUT_USER,
        payload: req
    }
}

// email 확인
export function checkEmail(dataToSubmit) {

    const req = Axios.get(`${USER_SERVER}/checkemail`, {
        params: dataToSubmit
    }).then(res => res.data);

    return {
        type: CHECK_USER,
        payload: req
    }
}

// 비밀번호 재설정
export function resetPassword(dataTosubmit) {
    const req = Axios.put(`${USER_SERVER}/resetpassword`, dataTosubmit)
        .then(res => res.data );

    return {
        type: RESET_PW,
        payload: req
    }
}

// 학습 인덱스 이동
export function moveStudy(dataTosubmit) {
    const req = Axios.put(`${USER_SERVER}/movestudy`, dataTosubmit)
        .then(res => res.data );

    return {
        type: MOVE_STUDY,
        payload: req
    }
}