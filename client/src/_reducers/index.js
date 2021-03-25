// redux를 사용하기 위해 선언
import { combineReducers } from 'redux';
// reducer설정 파일 선언
import user from './user_reducer';

// rootReducer에 사용한 reducer 추가
const rootReducer = combineReducers({
    user
});

// rootReducer를 기본값으로 사용한다 선언
export default rootReducer;