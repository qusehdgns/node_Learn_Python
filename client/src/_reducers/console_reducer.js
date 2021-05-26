// 액션 결과를 나타내는 타입값 선언
import {
    CONSOLE
} from '../_actions/types';

function console_split_action(state = {}, action) {
    switch (action.type) {
        case CONSOLE:

            return { ...state, result: action.payload };

        default:
            // 함께 들어오는 state값 리턴
            return state;
    }
}

export default console_split_action;