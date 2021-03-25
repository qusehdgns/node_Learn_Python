// 액션 결과를 받게 되면 해당 타입을 확인하기 위해 선언
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types';


// user_action에서 값이 리턴오게 되면 수행하는 함수
export default function (state = {}, action) {
    // 타입 값을 확인
    switch (action.type) {
        // 로그인 시 발생하는 타입
        case LOGIN_USER:
            // 각각의 리턴 값 정보를 리엑트 임시 저장공간에 부여
            return { ...state, login: action.payload };

        // 회원가입 시 발생하는 타입
        case REGISTER_USER:
            // 각각의 리턴 값 정보를 리엑트 임시 저장공간에 부여
            return {...state, register: action.payload };

        // 권환 확인 시 발생하는 타입
        case AUTH_USER:
            // 각각의 리턴 값 정보를 리엑트 임시 저장공간에 부여
            return {...state, userData: action.payload };
        
        // 액션 타입없이 요청이 들어올 경우
        default:
            // 함께 들어오는 state값 리턴
            return state;
    }
}