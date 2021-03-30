// 기본 리엑트 및 이벤트 효과를 사용하기 위한 선언
import React, { useEffect } from 'react';
// redux 사용하기 위한 선언
import { useSelector, useDispatch } from 'react-redux';
// 권한 확인 액션을 지정해 놓은 파일 호출
import { auth } from '../_actions/user_action';

// 페이지 호출 시 미들웨어로 먼저 수행되는 함수
export default function (SpecificComponent, option, adminRoute = null) {

    // option : null, true, false
    // null : everyone
    // true : login user
    // false : not login user

    // 권환 확인 함수
    function AuthenticationCheck(props) {
        // user 변수에 함께 들어온 user 정보 저장
        let user = useSelector(state => state.user)
        // redux 사용을 위한 변수 선언
        const dispatch = useDispatch();

        // 함수 호출 시 수행될 함수
        useEffect(() => {
            // redux를 사용하여 저장 값과 함께 권한 확인 함수 호출
            dispatch(auth()).then(res => {

                // 권한 분기 처리( 로그인 유무 )
                if(!res.payload.isAuth) {
                    // 로그인 상태가 아닐 시
                    if(option) {
                        // 로그인 페이지로 이동
                        props.history.push('/login');
                    }
                }
                // 로그인 상태일 시
                else {
                    // 어드민 권한없는 유저
                    if(adminRoute && !res.payload.isAdmin) {
                        // 기본 페이지로 이동
                        props.history.push('/');
                    }
                    // 로그인 되어있지만 권한이 없는 경우를 제외한 나머지
                    else {
                        // 로그인 안한 사용자만 가능한 페이지일 경우
                        if(option === false){
                            // 기본 페이지로 이동
                            props.history.push('/')
                        }
                    }
                }
            });

        }, [])

        // 함께 들어온 컴포넌트를 수행
        return (
            <SpecificComponent {...props} user={user}/>
        )
    }

    // 권한 확인 리턴
    return AuthenticationCheck
}