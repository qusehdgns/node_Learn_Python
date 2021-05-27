// 액션 결과를 나타내는 타입값 선언
import {
    RUN_CONSOLE,
    READ_CONSOLE,
    SAVE_CONSOLE,
    DELETE_CONSOLE
} from '../_actions/types';

function console_split_action(state = {}, action) {
    switch (action.type) {
        case RUN_CONSOLE:

            return { ...state, result: action.payload };

        case READ_CONSOLE:

            return { ...state, result: action.payload };

        case SAVE_CONSOLE:

            return { ...state, result: action.payload };

        case DELETE_CONSOLE:

            return { ...state, result: action.payload };

        default:
            // 함께 들어오는 state값 리턴
            return state;
    }
}

export default console_split_action;