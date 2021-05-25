// 액션 결과를 나타내는 타입값 선언
import {
    CREATE_WIKI,
    READ_WIKI,
    UPDATE_WIKI,
    DELETE_WIKI
} from '../_actions/types';

function wiki_split_action(state = {}, action) {
    switch (action.type) {
        case CREATE_WIKI:

            return { ...state, result: action.payload };

        case READ_WIKI:

            return { ...state, result: action.payload };

        case UPDATE_WIKI:

            return { ...state, result: action.payload };

        case DELETE_WIKI:

            return { ...state, result: action.payload };

        default:
            // 함께 들어오는 state값 리턴
            return state;
    }
}

export default wiki_split_action;