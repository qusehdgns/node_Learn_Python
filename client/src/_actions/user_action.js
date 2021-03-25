// ajax와 유사한 통신 라이브러리 선언
import Axios from 'axios';
// 액션 결과를 나타내는 타입값 선언
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

// 로그인 버튼 클릭 시 수행되는 함수
export function loginUser(dataTosubmit) {
    // 백엔드 서버에게 Post 형식으로 요청을 보낸 후 결과값 리턴
    const req = Axios.post('/api/users/login', dataTosubmit)
        .then(res => res.data );

        // 결과 값과 액션 결과를 리턴
        return {
            type: LOGIN_USER,
            payload: req
        }
}

// 회원가입 버튼 클릭 시 수행되는 함수
export function registerUser(dataTosubmit){
    // 백엔드 서버에게 Post 형식으로 요청을 보낸 후 결과값 리턴
    const req = Axios.post('/api/users/register', dataTosubmit)
        .then(res => res.data );

        // 결과 값과 액션 결과를 리턴
        return {
            type: REGISTER_USER,
            payload: req
        }
}

// 권한 확인 여부를 미들웨어에서 체크하는 함수
export function auth(){
    // 백엔드 서버에게 Get 형식으로 요청을 보낸 후 결과값 리턴
    const req = Axios.get('/api/users/auth')
        .then(res => res.data );

        // 결과 값과 액션 결과를 리턴
        return {
            type: AUTH_USER,
            payload: req
        }
}