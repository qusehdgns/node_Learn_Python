// 액션 결과를 나타내는 타입값 선언
import {
    CREATE_QA,
    READ_QA,
    UPDATE_QA,
    DELETE_QA,
    READ_MYQA
} from '../_actions/types';

function qa_split_action(state = {}, action) {
    switch (action.type) {
        case CREATE_QA:

            return { ...state, result: action.payload };

        case READ_QA:

            return { ...state, result: action.payload };

        case UPDATE_QA:

            return { ...state, result: action.payload };

        case DELETE_QA:

            return { ...state, result: action.payload };

        case READ_MYQA:

            return { ...state, result: action.payload };

        default:
            // 함께 들어오는 state값 리턴
            return state;
    }
}

export default qa_split_action;